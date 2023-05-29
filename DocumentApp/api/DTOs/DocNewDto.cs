using System;

namespace DocumentApp.DTOs
{
    ///<summary>
    ///Document creation model for getting data from frontend
    ///</summary>
    public class DocNewDto
    {
        public string Name { get; set; }             
        public DateTime Created { get; set; }
        public DateTime Edited { get; set; }
        public int Version { get; set; }
        public string Author { get; set; }
        public int CategoryId { get; set; }              
        public string Text { get; set; }
    }
}