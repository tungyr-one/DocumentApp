namespace api.DTOs
{
    public class SubcategoryDto
    {
        public int Id { get; set; }
        public string Name { get; set; }  
        public CategoryDto Category {get; set; }
        public int CategoryId { get; set; }
        public DocDto[] Docs { get; set; } = null!;
    }
}