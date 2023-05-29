using System;

namespace api.DTOs
{
    ///<summary>
    ///Document update model for getting data from frontend
    ///<summary>
    public class DocUpdateDto
    {
        public string Name { get; set; }
        public int Version { get; set; }
        public string Author {get; set; }             
        public int CategoryId { get; set; }
        public DateTime Edited { get; set; }
        public string Text { get; set; }
    }
}