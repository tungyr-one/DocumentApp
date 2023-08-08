using System.Collections.Generic;

namespace DocumentApp.DTOs
{
    ///<summary>
    ///Category model for transfer data to frontend
    ///</summary>
    public class CategoryDto
    {
        public int Id { get; set; }
        public string Name { get; set; }

        public int? ParentId { get; set; }
        public IList<CategoryDto>? Children { get; set; }         
    }
}