using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Runtime.Serialization;

namespace DAO
{
    public class Seccion
    {
        public int id;
        public string Nombre;

        public Seccion() { }

        public Seccion(int id, string Nombre) {
            this.id = id;
            this.Nombre = Nombre;
        }
    }
}