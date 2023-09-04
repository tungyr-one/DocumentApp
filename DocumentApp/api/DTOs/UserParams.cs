namespace DocumentApp.DTOs
{
    public class UserParams
    {
        ///<summary>
        /// User parameters for pagination, filtering and sorting
        ///</summary>
        public int Offset {get; set;}
        public int PageSize {get; set;}
        public string FilterBy {get; set;}
        public string SortBy {get; set;}
        public string SortOrder {get; set;}
    }
}