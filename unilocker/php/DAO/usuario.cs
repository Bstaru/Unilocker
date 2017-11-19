using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Runtime.Serialization;

namespace DAO
{
    public class Usuario
    {
        public int id;
        public string Nombres;
        public string Apellidos;
        public string Matricula;
        public string Correo;
        public int idTipo;
        public string Contra;
        public string Foto;
        public int Activo;
        public string Locker;

        public string NombreCompleto;
        public string Tipo;

        public Usuario() { }

        public Usuario(int id,string Nombres, string Apellidos, string Matricula, string Correo, int idTipo, string Contra, string Foto)
        {
            this.id = id;
            this.Nombres = Nombres;
            this.Apellidos = Apellidos;
            this.Matricula = Matricula;
            this.Correo = Correo;
            this.idTipo = idTipo;
            this.Contra = Contra;
            this.Foto = Foto;
        }
        public Usuario(int id, string Nombres, string Apellidos, string Matricula, string Correo, int idTipo, string Contra, string Foto, string Locker)
        {
            this.id = id;
            this.Nombres = Nombres;
            this.Apellidos = Apellidos;
            this.Matricula = Matricula;
            this.Correo = Correo;
            this.idTipo = idTipo;
            this.Contra = Contra;
            this.Foto = Foto;
            this.Locker = Locker;
        }
        public Usuario(int id, string Nombres, string Apellidos, string Matricula, string Correo, int idTipo, string Contra, string Foto, string Locker, int Activo)
        {
            this.id = id;
            this.Nombres = Nombres;
            this.Apellidos = Apellidos;
            this.Matricula = Matricula;
            this.Correo = Correo;
            this.idTipo = idTipo;
            this.Contra = Contra;
            this.Foto = Foto;
            this.Locker = Locker;
            this.Activo = Activo;
        }
        //PARA ADMINS, VER TODOS
        public Usuario(int id, string Foto, string NombreCompleto, string Matricula, string Correo, int Activo, string Tipo) {
            this.id = id;
            this.Foto = Foto;
            this.NombreCompleto = NombreCompleto;
            this.Matricula = Matricula;
            this.Correo = Correo;
            this.Activo = Activo;
            this.Tipo = Tipo;
        }
    }
}