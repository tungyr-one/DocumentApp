using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.DTOs
{
    public class DocUpdateDto
    {
        public string Name { get; set; }             
        public string Version { get; set; }
        public string CategoryName { get; set; }
        public string Text { get; set; }
    }
}