using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.DTOs
{
    ///<summary>
    ///Category model for transfer data to frontend
    ///<summary>
    public class CategoryDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        #nullable enable    
        public int? ParentId { get; set; }
        public IList<CategoryDto>? Children { get; set; }         
    }
}