using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.DTOs
{
    public class DocNewDto
    {
        public string Name { get; set; }             
        public DateTime Created { get; set; }
        public string Version { get; set; }
        public string Author { get; set; }
        public string CategoryName { get; set; }        
        public string Text { get; set; }
    }
}