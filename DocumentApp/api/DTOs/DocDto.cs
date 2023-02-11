using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.DTOs
{
    public class DocDto
    {
        [System.ComponentModel.DataAnnotations.Key]
        public int Id { get; set; }
        public string Name { get; set; }             
        public DateTime Created { get; set; }
        public string Version { get; set; }
        public string Author { get; set; }
        public string CategoryName { get; set; }
        public string SubcategoryName { get; set; }        
        public int CategoryId { get; set; }
        public int SubcategoryId { get; set; }
        public string Text { get; set; }
    }
}