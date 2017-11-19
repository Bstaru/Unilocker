using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Runtime.Serialization;

namespace DAO
{
    public class Mensajes
    {
        public string mensaje;

        public Mensajes() { }

        public Mensajes (string mensaje)
        {
            this.mensaje = mensaje;
        }
    }
}