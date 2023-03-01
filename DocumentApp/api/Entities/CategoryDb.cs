using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace api.Entities
{
    ///<summary>
    ///Category model for DB
    ///<summary>
    public class CategoryDb
    {
        public int Id { get; set; }
        public string Name { get; set; }  
        #nullable enable
        public int? ParentId { get; set; }
        public IList<CategoryDb>? Children { get; set; }
        public ICollection<DocDb>? Docs { get; set; }
    }
}