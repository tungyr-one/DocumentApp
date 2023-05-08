namespace api.DTOs
{
    public class UserParams
    {
        public int PageNumber {get; set;}
        public int PageSize {get; set;}
        public string OrderBy {get; set;}
        public string orderDirection {get; set;}
        public string filterBy {get; set;}
    }
}