using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Runtime.Serialization;

namespace DAO
{
    public class Renta
    {
        public int Folio;
        public string Usuario;
        public string NumeroLock;
        public string Concepto;
        public string Estatus;
        public DateTime Fecha;

        public Renta() { }

        public Renta(int Folio, string Usuario, string NumeroLock, string Concepto, string Estatus, DateTime Fecha)
        {
            this.Folio = Folio;
            this.Usuario = Usuario;
            this.NumeroLock = NumeroLock;
            this.Concepto = Concepto;
            this.Estatus = Estatus;
            this.Fecha = Fecha;
        }
    }
}