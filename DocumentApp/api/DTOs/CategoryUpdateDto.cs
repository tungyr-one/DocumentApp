using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.DTOs
{
    ///<summary>
    ///Category update model for getting data from frontend
    ///<summary>
    public class CategoryUpdateDto
    {
        public string Name { get; set; }
        #nullable enable
        public int? ParentId { get; set; }
        public CategoryUpdateDto[]? Children { get; set; }
    }
}