using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace api.Entities
{
    public class DocDb
    {
        [System.ComponentModel.DataAnnotations.Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
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