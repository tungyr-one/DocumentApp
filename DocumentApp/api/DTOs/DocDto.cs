using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.DTOs
{
    ///<summary>
    ///Document model for transfer data to frontend
    ///<summary>
    public class DocDto
    {
        public int Id { get; set; }
        public string Name { get; set; }             
        public DateTime Created { get; set; }
        public DateTime Edited { get; set; }
        public int Version { get; set; }
        public string Author { get; set; }     
        public string Text { get; set; }
        #nullable enable
        public CategoryDto? Category { get; set; }
    }
}