using System.Collections.Generic;

namespace DocumentApp.Entities
{
    ///<summary>
    ///Category model for DB
    ///</summary>
    public class CategoryDb
    {
        public int Id { get; set; }
        public string Name { get; set; }  
        #nullable enable
        public int? ParentId { get; set; }
        public IList<CategoryDb>? Children { get; set; }
    }
    
}