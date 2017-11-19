using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;

using System.Data;
using MySql.Data.MySqlClient;
using System.Configuration;

using System.Text;
using System.Net.Mail;
using System.Net;

using System.Security.Cryptography;
using System.Net.Mime;
using System.Web.Configuration;


using DAO;
using System.IO;
using System.ComponentModel;
using System.Web.Hosting;
using System.Drawing;


namespace unilocker_app
{
    /// <summary>
    /// Descripción breve de wsUnilocker
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // Para permitir que se llame a este servicio web desde un script, usando ASP.NET AJAX, quite la marca de comentario de la línea siguiente. 
    [System.Web.Script.Services.ScriptService]

    public class wsUnilocker : System.Web.Services.WebService
    {
        private static SenderMail SR = new SenderMail(WebConfigurationManager.AppSettings["SMTP"],
                                                        int.Parse(WebConfigurationManager.AppSettings["SMTP_PORT"]),
                                                        WebConfigurationManager.AppSettings["EMAIL"],
                                                        WebConfigurationManager.AppSettings["PWD"],
                                                        bool.Parse(WebConfigurationManager.AppSettings["SSL"]));

        private static string EMAIL_ADMIN = WebConfigurationManager.AppSettings["EMAIL_ADMIN"];
        private static string PORTAL_ADMIN = WebConfigurationManager.AppSettings["PORTAL_ADMIN"];

        public MySqlConnection CONN = new MySqlConnection();
        #region --------------------------------------- CONECCION BD ------------------------------------

        private MySqlConnection ConnectTo_STR(String DataBase)
        {
            CONN = new MySqlConnection(ConfigurationManager.AppSettings["CENTRAL_NEW"].ToString());
            return CONN;
        }

        private void OpenCONN()
        {
            CONN.Open();
        }

        private void CloseCONN()
        {
            CONN.Close();
        }

        #endregion

        [WebMethod]
        public void EnviaEmail_New(String tcAdressTo, string nameTo)
        {
            string tcAsunto = "¡Bienvenido!";
            
            using (var client = new SmtpClient(SR.Smtp, SR.SmtpPort))
            using (var message = new MailMessage())
            {
                message.From = new MailAddress(SR.MailFrom);
                message.Subject = tcAsunto;
                message.IsBodyHtml = true;
                client.EnableSsl = SR.SSL;
                client.Credentials = new NetworkCredential(SR.MailFrom, SR.Pass);

                foreach (var address in EMAIL_ADMIN.Split(new[] { ";" }, StringSplitOptions.RemoveEmptyEntries))
                {//HACE EL SPLIT DE LOS CORREOS.
                    message.Bcc.Add(address.Trim());
                }

                foreach (var address in tcAdressTo.Split(new[] { ";" }, StringSplitOptions.RemoveEmptyEntries))
                {//HACE EL SPLIT DE LOS CORREOS.
                    message.To.Add(address.Trim());
                }

               string htmlBody ="<link href='https://fonts.googleapis.com/css?family=Montserrat:400,500,700' rel='stylesheet'>" +
                                "<div style='background-color:#f0eff4; font-family:\"Montserrat\",sans-serif;padding:10%;'>" +
                                    "<div style='background-color:#fff;padding:2%;'>" +
                                        "<div style='margin-top:5%; padding:5%;text-align:center;'>" +
                                            "<img src='https://drive.google.com/uc?export=view&id=0B3cBei8Bg7hCZDRFTG9OOUQ0M1E' style='width: 80%; margin: 0 auto; text-align:center;'>" +
                                        "</div>" +
                                        "<div style='margin: 0 auto; width: inherit;text-align:center;'>" +
                                            "<h2 style='text-transform: uppercase;font-size:'>BIENVENIDO " + nameTo + "</h2>" +
                                            "<p>Gracias por unirte a UNILOCKER. Hemos verificado tu cuenta, sólo te queda un paso más para comenzar a rentar tu locker. </p>" +
                                            "<a href='"+ PORTAL_ADMIN + "verificar.html?correo="+ tcAdressTo + "' target='_blank' style='text-decoration:none;display: inline-block;line-height: 1.42857143;"+
                                            "text-align: center;background-color: #4e4caa; border-radius: 25px;border: 1px solid transparent;font-family:\"Montserrat\",sans-serif;"+
                                            "font-size: 3vh;color: #fff; padding: 6px 23px; margin-top: 5%;cursor: pointer;'>Iniciar Sesión</a>" +
                                        "</div>" +
                                    "</div>" +
                                "</div>";
                AlternateView avHtml = AlternateView.CreateAlternateViewFromString
                    (htmlBody, null, MediaTypeNames.Text.Html);

                message.AlternateViews.Add(avHtml);


                try
                {
                    client.Send(message);
                }
                catch (Exception ex)
                {
                    int a = 0;
                }
            }
        }

        [WebMethod]
        public string MD5Hash(string texto)
        {
            StringBuilder hash = new StringBuilder();
            MD5CryptoServiceProvider md5provider = new MD5CryptoServiceProvider();
            byte[] bytes = md5provider.ComputeHash(new UTF8Encoding().GetBytes(texto));

            for (int i = 0; i < bytes.Length; i++)
            {
                hash.Append(bytes[i].ToString("x2"));
            }
            return hash.ToString();
        }

        #region -------------------------------- USUARIOS ------------------------------------
        [WebMethod]
        public List<Usuario> s_login(string Correo, string Contra)
        {

            List<Usuario> L_User = new List<Usuario>();
            try
            {
                MySqlCommand cmd = new MySqlCommand();
                cmd.CommandText = "CALL s_login (@corr, @pass);";

                cmd.Parameters.AddWithValue("@corr", Correo);
                cmd.Parameters.AddWithValue("@pass", Contra);

                cmd.CommandType = CommandType.Text;
                cmd.Connection = ConnectTo_STR("CENTRAL8ENEW");

                OpenCONN();

                MySqlDataReader rd = cmd.ExecuteReader();
                if (rd.HasRows)
                {
                    while (rd.Read())
                    {
                        Usuario rv = new Usuario(
                            rd.GetInt32(0),
                            rd.GetString(1),
                            rd.GetString(2),
                            rd.GetString(3),
                            rd.GetString(4),
                            rd.GetInt32(5),
                            rd.GetString(6),
                            rd.GetString(7),
                            rd.GetString(8),
                            rd.GetInt32(9)
                            );                       

                        L_User.Add(rv);
                    }
                }

                CloseCONN();
            }

            catch (Exception ex)
            {
                throw new Exception("Error al CONSULTAR", ex);
            }

            return L_User;
        }

        [WebMethod]
        public void u_VerificarUser(string Correo)
        {
            try
            {
                MySqlCommand cmd = new MySqlCommand();
                cmd.CommandText = "CALL u_VerificarUser (@corr);";

                cmd.Parameters.AddWithValue("@corr", Correo);

                cmd.CommandType = CommandType.Text;
                cmd.Connection = ConnectTo_STR("CENTRAL8ENEW");

                OpenCONN();
                cmd.ExecuteReader();
                CloseCONN();
            }

            catch (Exception ex)
            {
                throw new Exception("Error al CONSULTAR", ex);
            }
            
        }

        [WebMethod]
        public void u_WalkT(int id)
        {
            try
            {
                MySqlCommand cmd = new MySqlCommand();
                cmd.CommandText = "CALL u_WalkT (@corr);";

                cmd.Parameters.AddWithValue("@corr", id);

                cmd.CommandType = CommandType.Text;
                cmd.Connection = ConnectTo_STR("CENTRAL8ENEW");

                OpenCONN();
                cmd.ExecuteReader();
                CloseCONN();
            }

            catch (Exception ex)
            {
                throw new Exception("Error al CONSULTAR", ex);
            }

        }

        [WebMethod]
        public void i_usuario_reg(string Nombres, string Apellidos, string Matricula, string Correo, string Contra)
        {
            try
            {
                MySqlCommand cmd = new MySqlCommand();
                cmd.CommandText = "CALL i_usuario_reg(@nm, @ap, @mat, @cor, @pss)";

                cmd.Parameters.AddWithValue("@nm", Nombres);
                cmd.Parameters.AddWithValue("@ap", Apellidos);
                cmd.Parameters.AddWithValue("@mat", Matricula);
                cmd.Parameters.AddWithValue("@cor", Correo);
                cmd.Parameters.AddWithValue("@pss", Contra);

                cmd.CommandType = CommandType.Text;
                cmd.Connection = ConnectTo_STR("CENTRAL8ENEW");

                OpenCONN();
                cmd.ExecuteReader();

                string NombreUsuario = Nombres + " " + Apellidos;

                EnviaEmail_New(Correo, NombreUsuario);

                CloseCONN();
            }

            catch (Exception ex)
            {
                throw new Exception("Error al INSERTAR", ex);
            }

        }

        [WebMethod]
        public void u_Usuario(int Idu, string Nombres, string Apellidos, string Matricula, string Correo, string Foto)
        {

            try
            {
                MySqlCommand cmd = new MySqlCommand();
                cmd.CommandText = "CALL u_Usuario(@id,@nm, @ap, @mat, @cor, @fot)";
                cmd.Parameters.AddWithValue("@id", Idu);
                cmd.Parameters.AddWithValue("@nm", Nombres);
                cmd.Parameters.AddWithValue("@ap", Apellidos);
                cmd.Parameters.AddWithValue("@mat", Matricula);
                cmd.Parameters.AddWithValue("@cor", Correo);
                cmd.Parameters.AddWithValue("@fot", Foto);

                cmd.CommandType = CommandType.Text;
                cmd.Connection = ConnectTo_STR("CENTRAL8ENEW");

                OpenCONN();
                cmd.ExecuteReader();
                
                CloseCONN();
            }

            catch (Exception ex)
            {
                throw new Exception("Error al CONSULTAR", ex);
            }

        }

        [WebMethod]
        public void u_Contra(int Idu, string Contra)
        {
            try
            {
                MySqlCommand cmd = new MySqlCommand();
                cmd.CommandText = "CALL u_Contra(@id,@pass)";
                cmd.Parameters.AddWithValue("@id", Idu);
                cmd.Parameters.AddWithValue("@pass", Contra);

                cmd.CommandType = CommandType.Text;
                cmd.Connection = ConnectTo_STR("CENTRAL8ENEW");

                OpenCONN();
                cmd.ExecuteReader();

                CloseCONN();
            }

            catch (Exception ex)
            {
                throw new Exception("Error al CONSULTAR", ex);
            }

        }

        [WebMethod]
        public void u_CambiarTipo( int idUsuario)
        {
            try
            {
                MySqlCommand cmd = new MySqlCommand();
                cmd.CommandText = "CALL u_CambiarTipo(@idU)";
                
                cmd.Parameters.AddWithValue("@idU", idUsuario);

                cmd.CommandType = CommandType.Text;
                cmd.Connection = ConnectTo_STR("CENTRAL8ENEW");

                OpenCONN();
                cmd.ExecuteReader();
                CloseCONN();
            }

            catch (Exception ex)
            {
                throw new Exception("Error al INSERTAR", ex);
            }
        }

        [WebMethod]
        public void i_usuario_adm(string Nombres, string Apellidos, string Matricula, string Correo, string Contra)
        {
            try
            {
                MySqlCommand cmd = new MySqlCommand();
                cmd.CommandText = "CALL i_usuario_adm(@nm, @ap, @mat, @cor, @pss)";

                cmd.Parameters.AddWithValue("@nm", Nombres);
                cmd.Parameters.AddWithValue("@ap", Apellidos);
                cmd.Parameters.AddWithValue("@mat", Matricula);
                cmd.Parameters.AddWithValue("@cor", Correo);
                cmd.Parameters.AddWithValue("@pss", Contra);

                cmd.CommandType = CommandType.Text;
                cmd.Connection = ConnectTo_STR("CENTRAL8ENEW");

                OpenCONN();
                cmd.ExecuteReader();

                string NombreUsuario = Nombres + " " + Apellidos;

                EnviaEmail_New(Correo, NombreUsuario);

                CloseCONN();
            }

            catch (Exception ex)
            {
                throw new Exception("Error al INSERTAR", ex);
            }

        }

        #endregion

        #region --------------------------------------- SELECTSS ------------------------------------
        [WebMethod]
        public List<Usuario> s_usuario()
        {

            List<Usuario> L_USERS = new List<Usuario>();
            try
            {
                MySqlCommand cmd = new MySqlCommand();
                cmd.CommandText = "CALL s_usuario;";
                cmd.CommandType = CommandType.Text;
                cmd.Connection = ConnectTo_STR("CENTRAL8ENEW");

                OpenCONN();

                MySqlDataReader rd = cmd.ExecuteReader();
                if (rd.HasRows)
                {
                    while (rd.Read())
                    {
                        Usuario rv = new Usuario(
                            rd.GetInt32(0),
                            rd.GetString(1),
                            rd.GetString(2),
                            rd.GetString(3),
                            rd.GetString(4),
                            rd.GetInt32(5),
                            rd.GetString(6),
                            rd.GetString(7)
                            );

                        L_USERS.Add(rv);
                    }
                }

                CloseCONN();
            }

            catch (Exception ex)
            {
                throw new Exception("Error al CONSULTAR", ex);
            }

            return L_USERS;
        }

        [WebMethod]
        public List<Usuario> s_usuarioUpdate(int idu)
        {

            List<Usuario> L_USERS = new List<Usuario>();
            try
            {
                MySqlCommand cmd = new MySqlCommand();
                cmd.CommandText = "CALL s_usuarioUpdate(@idu);";
                cmd.Parameters.AddWithValue("@idu", idu);
                cmd.CommandType = CommandType.Text;
                cmd.Connection = ConnectTo_STR("CENTRAL8ENEW");

                OpenCONN();

                MySqlDataReader rd = cmd.ExecuteReader();
                if (rd.HasRows)
                {
                    while (rd.Read())
                    {
                        Usuario rv = new Usuario(
                            rd.GetInt32(0),
                            rd.GetString(1),
                            rd.GetString(2),
                            rd.GetString(3),
                            rd.GetString(4),
                            rd.GetInt32(5),
                            rd.GetString(6),
                            rd.GetString(7),
                            rd.GetString(8)
                            );

                        L_USERS.Add(rv);
                    }
                }

                CloseCONN();
            }

            catch (Exception ex)
            {
                throw new Exception("Error al CONSULTAR", ex);
            }

            return L_USERS;
        }

        [WebMethod]
        public List<Usuario> s_todoUsuarios()
        {

            List<Usuario> L_USERS = new List<Usuario>();
            try
            {
                MySqlCommand cmd = new MySqlCommand();
                cmd.CommandText = "CALL s_todoUsuarios;";
                cmd.CommandType = CommandType.Text;
                cmd.Connection = ConnectTo_STR("CENTRAL8ENEW");

                OpenCONN();

                MySqlDataReader rd = cmd.ExecuteReader();
                if (rd.HasRows)
                {
                    while (rd.Read())
                    {
                        Usuario rv = new Usuario(
                            rd.GetInt32(0),
                            rd.GetString(1),
                            rd.GetString(2),
                            rd.GetString(3),
                            rd.GetString(4),
                            rd.GetInt32(5),
                            rd.GetString(6)
                            );

                        L_USERS.Add(rv);
                    }
                }

                CloseCONN();
            }

            catch (Exception ex)
            {
                throw new Exception("Error al CONSULTAR", ex);
            }

            return L_USERS;
        }

        [WebMethod]
        public List<Usuario> s_UsuariosNoAdmin()
        {

            List<Usuario> L_USERS = new List<Usuario>();
            try
            {
                MySqlCommand cmd = new MySqlCommand();
                cmd.CommandText = "CALL s_UsuariosNoAdmin;";
                cmd.CommandType = CommandType.Text;
                cmd.Connection = ConnectTo_STR("CENTRAL8ENEW");

                OpenCONN();

                MySqlDataReader rd = cmd.ExecuteReader();
                if (rd.HasRows)
                {
                    while (rd.Read())
                    {
                        Usuario rv = new Usuario(
                            rd.GetInt32(0),
                            rd.GetString(1),
                            rd.GetString(2),
                            rd.GetString(3),
                            rd.GetString(4),
                            rd.GetInt32(5),
                            rd.GetString(6)
                            );

                        L_USERS.Add(rv);
                    }
                }

                CloseCONN();
            }

            catch (Exception ex)
            {
                throw new Exception("Error al CONSULTAR", ex);
            }

            return L_USERS;
        }

        [WebMethod]
        public List<Seccion> s_Seccion()
        {

            List<Seccion> L_Sec = new List<Seccion>();
            try
            {
                MySqlCommand cmd = new MySqlCommand();
                cmd.CommandText = "CALL s_Seccion;";
                cmd.CommandType = CommandType.Text;
                cmd.Connection = ConnectTo_STR("CENTRAL8ENEW");

                OpenCONN();

                MySqlDataReader rd = cmd.ExecuteReader();
                if (rd.HasRows)
                {
                    while (rd.Read())
                    {
                        Seccion rv = new Seccion(
                            rd.GetInt32(0),
                            rd.GetString(1)
                            );

                        L_Sec.Add(rv);
                    }
                }

                CloseCONN();
            }

            catch (Exception ex)
            {
                throw new Exception("Error al CONSULTAR", ex);
            }

            return L_Sec;
        }

        [WebMethod]
        public List<Locker> s_Locker()
        {

            List<Locker> L_Lok = new List<Locker>();
            try
            {
                MySqlCommand cmd = new MySqlCommand();
                cmd.CommandText = "CALL s_Locker;";
                cmd.CommandType = CommandType.Text;
                cmd.Connection = ConnectTo_STR("CENTRAL8ENEW");

                OpenCONN();

                MySqlDataReader rd = cmd.ExecuteReader();
                if (rd.HasRows)
                {
                    while (rd.Read())
                    {
                        Locker rv = new Locker(
                                rd.GetInt32(0),
                                rd.GetString(1),
                                (float)rd.GetDouble(2),
                                rd.GetInt32(3),
                                rd.GetInt32(4),
                                rd.GetInt32(5)
                            );

                        L_Lok.Add(rv);
                    }
                }

                CloseCONN();
            }

            catch (Exception ex)
            {
                throw new Exception("Error al CONSULTAR", ex);
            }

            return L_Lok;
        }

        [WebMethod]
        public List<Locker> s_LockerBySeccion(int idSecc)
        {

            List<Locker> L_Lok = new List<Locker>();
            try
            {
                MySqlCommand cmd = new MySqlCommand();
                cmd.CommandText = "CALL s_LockerBySeccion (@idsec);";
                cmd.Parameters.AddWithValue("@idsec", idSecc);
                cmd.CommandType = CommandType.Text;
                cmd.Connection = ConnectTo_STR("CENTRAL8ENEW");

                OpenCONN();

                MySqlDataReader rd = cmd.ExecuteReader();
                if (rd.HasRows)
                {
                    while (rd.Read())
                    {
                        Locker rv = new Locker(
                                rd.GetInt32(0),
                                rd.GetString(1),
                                (float)rd.GetDouble(2),
                                rd.GetInt32(3),
                                rd.GetInt32(4),
                                rd.GetInt32(5)
                            );

                        L_Lok.Add(rv);
                    }
                }

                CloseCONN();
            }

            catch (Exception ex)
            {
                throw new Exception("Error al CONSULTAR", ex);
            }

            return L_Lok;
        }

        [WebMethod]
        public List<Locker> s_LockerByUser(int idUser)
        {

            List<Locker> L_Lok = new List<Locker>();
            try
            {
                MySqlCommand cmd = new MySqlCommand();
                cmd.CommandText = "CALL s_LockerByUser (@idU);";
                cmd.Parameters.AddWithValue("@idU", idUser);
                cmd.CommandType = CommandType.Text;
                cmd.Connection = ConnectTo_STR("CENTRAL8ENEW");

                OpenCONN();

                MySqlDataReader rd = cmd.ExecuteReader();
                if (rd.HasRows)
                {
                    while (rd.Read())
                    {
                        Locker rv = new Locker(
                                rd.GetInt32(0),
                                rd.GetString(1),
                                (float)rd.GetDouble(2),
                                rd.GetInt32(3),
                                rd.GetInt32(4),
                                rd.GetInt32(5)
                            );

                        L_Lok.Add(rv);
                    }
                }

                CloseCONN();
            }

            catch (Exception ex)
            {
                throw new Exception("Error al CONSULTAR", ex);
            }

            return L_Lok;
        }

        [WebMethod]
        public List<Locker> s_LockerByUserOcupado(int idUser, int idSecc)
        {

            List<Locker> L_Lok = new List<Locker>();
            try
            {
                MySqlCommand cmd = new MySqlCommand();
                cmd.CommandText = "CALL s_LockerByUserOcupado (@idU,@idsec);";                
                cmd.Parameters.AddWithValue("@idU", idUser);
                cmd.Parameters.AddWithValue("@idsec", idSecc);
                cmd.CommandType = CommandType.Text;
                cmd.Connection = ConnectTo_STR("CENTRAL8ENEW");

                OpenCONN();

                MySqlDataReader rd = cmd.ExecuteReader();
                if (rd.HasRows)
                {
                    while (rd.Read())
                    {
                        Locker rv = new Locker(
                                rd.GetInt32(0),
                                rd.GetString(1),
                                (float)rd.GetDouble(2),
                                rd.GetInt32(3),
                                rd.GetInt32(4),
                                rd.GetInt32(5)
                            );

                        L_Lok.Add(rv);
                    }
                }

                CloseCONN();
            }

            catch (Exception ex)
            {
                throw new Exception("Error al CONSULTAR", ex);
            }

            return L_Lok;
        }

        [WebMethod]
        public List<Renta> s_Resumen()
        {

            List<Renta> L_Res = new List<Renta>();
            try
            {
                MySqlCommand cmd = new MySqlCommand();
                cmd.CommandText = "CALL s_Resumen;";
                cmd.CommandType = CommandType.Text;
                cmd.Connection = ConnectTo_STR("CENTRAL8ENEW");

                OpenCONN();

                MySqlDataReader rd = cmd.ExecuteReader();
                if (rd.HasRows)
                {
                    while (rd.Read())
                    {
                        Renta rv = new Renta(
                            rd.GetInt32(0),
                            rd.GetString(1),
                            rd.GetString(2),
                            rd.GetString(3),
                            rd.GetString(4),
                            rd.GetDateTime(5)
                            );

                        L_Res.Add(rv);
                    }
                }

                CloseCONN();
            }

            catch (Exception ex)
            {
                throw new Exception("Error al CONSULTAR", ex);
            }

            return L_Res;
        }

        [WebMethod]
        public List<Imprimir> s_DataImprimir(int idUser, int idLock, string Conp)
        {

            List<Imprimir> L_imp = new List<Imprimir>();
            try
            {
                MySqlCommand cmd = new MySqlCommand();
                cmd.CommandText = "CALL s_DataImprimir (@idu,@idl,@con);";
                cmd.Parameters.AddWithValue("@idu", idUser);
                cmd.Parameters.AddWithValue("@idl", idLock);
                cmd.Parameters.AddWithValue("@con", Conp);
                cmd.CommandType = CommandType.Text;
                cmd.Connection = ConnectTo_STR("CENTRAL8ENEW");

                OpenCONN();

                MySqlDataReader rd = cmd.ExecuteReader();
                if (rd.HasRows)
                {
                    while (rd.Read())
                    {
                        //DateTime Fecha, int folio, int idu, string nombre, string apellidos, string matricula, 
                        //string numeroL, float precio, string concepto, string estado
                        Imprimir rv = new Imprimir(
                                rd.GetDateTime(0),
                                rd.GetInt32(1),
                                rd.GetInt32(2),
                                rd.GetString(3),
                                rd.GetString(4),
                                rd.GetString(5),
                                rd.GetString(6),
                                (float)rd.GetDouble(7),
                                rd.GetString(8),
                                rd.GetString(9)
                            );

                        L_imp.Add(rv);
                    }
                }

                CloseCONN();
            }

            catch (Exception ex)
            {
                throw new Exception("Error al CONSULTAR", ex);
            }

            return L_imp;
        }

        #endregion


        #region --------------------------------------- RENTAR ------------------------------------
        [WebMethod]
        public List<Mensajes> i_RentaByUsuario(int idLocker, int idUsuario, DateTime fecha)
        {
            List<Mensajes> L_Msg = new List<Mensajes>();
            try
            {
                MySqlCommand cmd = new MySqlCommand();
                cmd.CommandText = "CALL i_RentaByUsuario(@idL, @idU, @dia)";

                cmd.Parameters.AddWithValue("@idL", idLocker);
                cmd.Parameters.AddWithValue("@idU", idUsuario);
                cmd.Parameters.AddWithValue("@dia", fecha);

                cmd.CommandType = CommandType.Text;
                cmd.Connection = ConnectTo_STR("CENTRAL8ENEW");

                OpenCONN();
                //cmd.ExecuteReader();

                MySqlDataReader rd = cmd.ExecuteReader();
                if (rd.HasRows)
                {
                    while (rd.Read())
                    {
                        Mensajes rv = new Mensajes(rd.GetString(0));

                        L_Msg.Add(rv);
                    }
                }

                CloseCONN();
            }

            catch (Exception ex)
            {
                throw new Exception("Error al INSERTAR", ex);
            }

            return L_Msg;

        }

        [WebMethod]
        public List<Mensajes> i_RentaByAdmin(int idLocker, int idUsuario, int idRentador, string Comentarios, DateTime fecha)
        {
            List<Mensajes> L_Msg = new List<Mensajes>();
            try
            {
                MySqlCommand cmd = new MySqlCommand();
                cmd.CommandText = "CALL i_RentaByAdmin(@idL, @idU, @idRen, @com, @dia)";

                cmd.Parameters.AddWithValue("@idL", idLocker);
                cmd.Parameters.AddWithValue("@idU", idUsuario);
                cmd.Parameters.AddWithValue("@idRen", idRentador);
                cmd.Parameters.AddWithValue("@com", Comentarios);
                cmd.Parameters.AddWithValue("@dia", fecha);

                cmd.CommandType = CommandType.Text;
                cmd.Connection = ConnectTo_STR("CENTRAL8ENEW");

                OpenCONN();

                MySqlDataReader rd = cmd.ExecuteReader();
                if (rd.HasRows)
                {
                    while (rd.Read())
                    {
                        Mensajes rv = new Mensajes(rd.GetString(0));

                        L_Msg.Add(rv);
                    }
                }

                CloseCONN();
            }

            catch (Exception ex)
            {
                throw new Exception("Error al INSERTAR", ex);
            }

            return L_Msg;
        }

        #endregion

        #region --------------------------------------- RENOVAR----------------------------------

        [WebMethod]
        public void u_RenovarByUsuario(int idLocker, int idUsuario, DateTime fecha)
        {
            try
            {
                MySqlCommand cmd = new MySqlCommand();
                cmd.CommandText = "CALL u_RenovarByUsuario(@idL, @idU, @dia)";

                cmd.Parameters.AddWithValue("@idL", idLocker);
                cmd.Parameters.AddWithValue("@idU", idUsuario);
                cmd.Parameters.AddWithValue("@dia", fecha);

                cmd.CommandType = CommandType.Text;
                cmd.Connection = ConnectTo_STR("CENTRAL8ENEW");

                OpenCONN();
                cmd.ExecuteReader();
                CloseCONN();
            }

            catch (Exception ex)
            {
                throw new Exception("Error al INSERTAR", ex);
            }
        }

        [WebMethod]
        public void u_RenovarByAdmin(int idLocker, int idUsuario, int idRentador, string Comentarios, DateTime fecha)
        {
            try
            {
                MySqlCommand cmd = new MySqlCommand();
                cmd.CommandText = "CALL u_RenovarByAdmin(@idL, @idU, @idRen, @com, @dia)";

                cmd.Parameters.AddWithValue("@idL", idLocker);
                cmd.Parameters.AddWithValue("@idU", idUsuario);
                cmd.Parameters.AddWithValue("@idRen", idRentador);
                cmd.Parameters.AddWithValue("@com", Comentarios);
                cmd.Parameters.AddWithValue("@dia", fecha);

                cmd.CommandType = CommandType.Text;
                cmd.Connection = ConnectTo_STR("CENTRAL8ENEW");

                OpenCONN();
                cmd.ExecuteReader();
                CloseCONN();
            }

            catch (Exception ex)
            {
                throw new Exception("Error al INSERTAR", ex);
            }
            
        }

        #endregion

        #region --------------------------------------- CANCELAR----------------------------------
        [WebMethod]
        public void u_CancelarByUsuario(int idLocker, int idUsuario, DateTime fecha)
        {
            try
            {
                MySqlCommand cmd = new MySqlCommand();
                cmd.CommandText = "CALL u_CancelarByUsuario(@idL, @idU, @dia)";

                cmd.Parameters.AddWithValue("@idL", idLocker);
                cmd.Parameters.AddWithValue("@idU", idUsuario);
                cmd.Parameters.AddWithValue("@dia", fecha);

                cmd.CommandType = CommandType.Text;
                cmd.Connection = ConnectTo_STR("CENTRAL8ENEW");

                OpenCONN();
                cmd.ExecuteReader();
                CloseCONN();
            }

            catch (Exception ex)
            {
                throw new Exception("Error al INSERTAR", ex);
            }
        }

        [WebMethod]
        public void u_CancelarByAdmin(int idLocker, int idUsuario, int idRentador, string Comentarios, DateTime fecha)
        {
            try
            {
                MySqlCommand cmd = new MySqlCommand();
                cmd.CommandText = "CALL u_CancelarByAdmin(@idL, @idU, @idRen, @com, @dia)";

                cmd.Parameters.AddWithValue("@idL", idLocker);
                cmd.Parameters.AddWithValue("@idU", idUsuario);
                cmd.Parameters.AddWithValue("@idRen", idRentador);
                cmd.Parameters.AddWithValue("@com", Comentarios);
                cmd.Parameters.AddWithValue("@dia", fecha);

                cmd.CommandType = CommandType.Text;
                cmd.Connection = ConnectTo_STR("CENTRAL8ENEW");

                OpenCONN();
                cmd.ExecuteReader();
                CloseCONN();
            }

            catch (Exception ex)
            {
                throw new Exception("Error al INSERTAR", ex);
            }

        }
        #endregion

        #region --------------------------------------- PENDIENTES--------------------------------

        [WebMethod]
        public List<Reportes> s_Pendientes()
        {

            List<Reportes> L_REP = new List<Reportes>();
            try
            {
                MySqlCommand cmd = new MySqlCommand();
                cmd.CommandText = "CALL s_Pendientes;";
                cmd.CommandType = CommandType.Text;
                cmd.Connection = ConnectTo_STR("CENTRAL8ENEW");

                OpenCONN();

                MySqlDataReader rd = cmd.ExecuteReader();
                if (rd.HasRows)
                {
                    while (rd.Read())
                    {
                        Reportes rv = new Reportes(
                                rd.GetInt32(0),
                                rd.GetDateTime(1),
                                rd.GetString(2),
                                 rd.GetString(3),
                                (float)rd.GetDouble(4),
                                rd.GetString(5),
                                rd.GetInt32(6)
                            );

                        L_REP.Add(rv);
                    }
                }

                CloseCONN();
            }

            catch (Exception ex)
            {
                throw new Exception("Error al CONSULTAR", ex);
            }

            return L_REP;
        }

        [WebMethod]
        public void u_Aceptar(int Folio, int Rentador, string Comentarios, int Usuario, DateTime Fecha, string tipo)
        {
            try
            {
                MySqlCommand cmd = new MySqlCommand();
                cmd.CommandText = "CALL u_Aceptar(@folio, @rent, @com, @user, @dia, @tipo)";

                cmd.Parameters.AddWithValue("@folio", Folio);
                cmd.Parameters.AddWithValue("@rent", Rentador);
                cmd.Parameters.AddWithValue("@com", Comentarios);
                cmd.Parameters.AddWithValue("@user", Usuario);
                cmd.Parameters.AddWithValue("@dia", Fecha);
                cmd.Parameters.AddWithValue("@tipo", tipo);

                cmd.CommandType = CommandType.Text;
                cmd.Connection = ConnectTo_STR("CENTRAL8ENEW");

                OpenCONN();
                cmd.ExecuteReader();
                CloseCONN();
            }

            catch (Exception ex)
            {
                throw new Exception("Error al INSERTAR", ex);
            }
        }

        #endregion

        #region --------------------------------------- REPORTES----------------------------------

        [WebMethod]
        public List<Reportes> s_ReporteLockers_Tipo(int concepto)
        {

            List<Reportes> L_REP = new List<Reportes>();
            try
            {
                MySqlCommand cmd = new MySqlCommand();
                cmd.CommandText = "CALL s_ReporteLockers_Tipo (@concepto);";
                cmd.Parameters.AddWithValue("@concepto", concepto);
                cmd.CommandType = CommandType.Text;
                cmd.Connection = ConnectTo_STR("CENTRAL8ENEW");

                OpenCONN();

                MySqlDataReader rd = cmd.ExecuteReader();
                if (rd.HasRows)
                {
                    while (rd.Read())
                    {
                        Reportes rv = new Reportes(
                                rd.GetString(0),
                                (float)rd.GetDouble(1),
                                rd.GetString(2),
                                rd.GetString(3)
                            );

                        L_REP.Add(rv);
                    }
                }

                CloseCONN();
            }

            catch (Exception ex)
            {
                throw new Exception("Error al CONSULTAR", ex);
            }

            return L_REP;
        }

        #endregion
    }

    public class SenderMail
    {
        public string Smtp;
        public int SmtpPort;
        public string MailFrom;
        public string Pass;
        public bool SSL;

        public SenderMail() { }

        public SenderMail(string Smtp, int SmtpPort, string MailFrom, string Pass, bool SSL)
        {
            this.Smtp = Smtp;
            this.SmtpPort = SmtpPort;
            this.MailFrom = MailFrom;
            this.Pass = Pass;
            this.SSL = SSL;
        }

    }
}
