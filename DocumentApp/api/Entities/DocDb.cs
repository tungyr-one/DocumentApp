using System;

namespace api.Entities
{
    public class DocDb
    {
        [System.ComponentModel.DataAnnotations.Key]
        public int Id { get; set; }
        public string Name { get; set; }             
        public DateTime Created { get; set; }
        public string Version { get; set; }
        public string Author { get; set; }
        public CategoryDb Category { get; set; }
        public SubcategoryDb Subcategory { get; set; }        
        public int CategoryId { get; set; }
        public int SubcategoryId { get; set; }
        public string Text { get; set; }
    }
}