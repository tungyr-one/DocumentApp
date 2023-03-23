using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace api.Entities
{
    ///<summary>
    ///Document model for DB
    ///<summary>
    public class DocDb
    {
        public int Id { get; set; }
        public string Name { get; set; }             
        public DateTime Created { get; set; }
        public int Version { get; set; }
        public string Author { get; set; }
        public string Text { get; set; }
        public int CategoryId { get; set; }    
        public CategoryDb Category { get; set; }    
    }
}