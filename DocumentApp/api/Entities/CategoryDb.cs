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
        public int Id { get; set; }
        public string Name { get; set; }  
        #nullable enable
        public int? ParentId { get; set; }
        public IList<CategoryDb>? Children { get; set; }
        public ICollection<DocDb>? Docs { get; set; }
    }
}