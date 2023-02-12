using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.DTOs
{
    public class CategoryDto
    {
        public int Id { get; set; }
        public string Name { get; set; }             
        public SubcategoryDto[] Subcategories { get; set; }
        public DocDto[] Docs { get; set; }
    }
}