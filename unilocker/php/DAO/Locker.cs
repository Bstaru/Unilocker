using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Runtime.Serialization;

namespace DAO
{
    public class Locker
    {
        public int id;
        public string Numero;
        public float Precio;
        public int idEstatus;
        public int idSeccion;
        public int idUsuario;

        public Locker() { }

        public Locker(int id, string Numero, float Precio, int idEstatus, int idSeccion, int idUsuario)
        {
            this.id = id;
            this.Numero = Numero;
            this.Precio = Precio;
            this.idEstatus = idEstatus;
            this.idSeccion = idSeccion;
            this.idUsuario = idUsuario;
        }
    }
}