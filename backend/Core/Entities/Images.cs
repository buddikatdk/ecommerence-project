namespace Core.Entities
{
    public class Images:BaseEntity
    {
        public string ImagesPath { get; set; }
        public Product Product { get; set; }
        public int ProductId { get; set; }
    }
}