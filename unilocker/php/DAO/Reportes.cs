using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Runtime.Serialization;

namespace DAO
{
    public class Reportes
    {
        public DateTime Fecha;
        public int folio;
       
        public string numeroL;
        public float precio;
        public string estado;
        public string usuario;

        public int idu;

        public Reportes() { }

        //REPORTES

        public Reportes(string numeroL, float precio, string estado, string usuario)
        {
            this.numeroL = numeroL;
            this.precio = precio;
            this.estado = estado;
            this.usuario = usuario;
        }

        // PENDIENTES
        // R.id as FOLIO, R.Fecha,L.Numero, L.Precio, R.Concepto, E.Estado as EstadoLocker, CONCAT(U.Nombres,' ', U.Apellidos) AS Usuario

        public Reportes(int folio, DateTime Fecha, string estado, string numeroL, float precio, string usuario, int idu)
        {
            this.folio = folio;
            this.Fecha = Fecha;
            this.estado = estado;
            this.numeroL = numeroL;
            this.precio = precio;
            this.usuario = usuario;
            this.idu = idu;
        }
    }
}