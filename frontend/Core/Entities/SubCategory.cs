namespace Core.Entities
{
    public class SubCategory:BaseEntity
    {
        public string SubCategoryName { get; set; }
        public Category Category { get; set; }
        public int CategoryId { get; set; }
    }
}