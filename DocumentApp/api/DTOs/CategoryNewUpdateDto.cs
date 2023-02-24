using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.DTOs
{
    public class CategoryNewUpdateDto
    {
        public string Name { get; set; }
        public int? ParentId { get; set; }
        public string[]? Children { get; set; }
    }
}