using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace api.Entities
{
    public class CategoryDb
    {
        [System.ComponentModel.DataAnnotations.Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public string Name { get; set; }  
        #nullable enable
        public ICollection<SubcategoryDb>? Subcategories { get; set; }
        public ICollection<DocDb>? Docs { get; set; }
    }
}