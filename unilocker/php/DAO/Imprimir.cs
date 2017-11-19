using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Runtime.Serialization;

namespace DAO
{
    public class Imprimir
    {
        //R.Fecha, R.id as Folio,  U.id, U.Nombres, U.Apellidos, U.Matricula, L.Numero, L.Precio, R.Concepto, E.Estado as EstadoLocker
        public DateTime Fecha;
        public int folio;
        public int idu;
        public string nombre;
        public string apellidos;
        public string matricula;
        public string numeroL;
        public float precio;
        public string concepto;
        public string estado;

        public Imprimir() { }

        public Imprimir(DateTime Fecha, int folio, int idu, string nombre, string apellidos, string matricula, 
            string numeroL, float precio, string concepto, string estado)
        {
            this.Fecha = Fecha;
            this.folio = folio;
            this.idu = idu;
            this.nombre = nombre;
            this.apellidos = apellidos;
            this.matricula = matricula;
            this.numeroL = numeroL;
            this.precio = precio;
            this.concepto = concepto;
            this.estado = estado;

        }
    }
}