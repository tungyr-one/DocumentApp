using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.DTOs
{
    ///<summary>
    ///Document update model for getting data from frontend
    ///<summary>
    public class DocUpdateDto
    {
        public string Name { get; set; }             
        public int Version { get; set; }
        public string CategoryName { get; set; }
        public string Text { get; set; }
    }
}