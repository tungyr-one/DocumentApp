using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Entities
{
    public class CategoryDb
    {
        [System.ComponentModel.DataAnnotations.Key]
        public int Id { get; set; }
        public string Name { get; set; }  
        #nullable enable
        public ICollection<SubcategoryDb>? Subcategories { get; set; }
        public ICollection<DocDb>? Docs { get; set; }
    }
}