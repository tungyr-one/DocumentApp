using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace api.Entities
{
    public class SubcategoryDb
    {
        [System.ComponentModel.DataAnnotations.Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public string Name { get; set; }  
        public CategoryDb Category {get; set; }
        public int CategoryId { get; set; }
        #nullable enable
        public ICollection<DocDb>? Docs { get; set; }
    }
}