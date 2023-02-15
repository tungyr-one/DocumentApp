using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Entities
{
    public class SubcategoryDb
    {
        public int Id { get; set; }
        public string Name { get; set; }  
        public CategoryDb Category {get; set; }
        public int CategoryId { get; set; }
        #nullable enable
        public ICollection<DocDb>? Docs { get; set; }
    }
}