using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.DTOs
{
    public class CategoryNewDto
    {
        public string Name { get; set; }
        public string[] SubcategoryNames { get; set; }
    }
}