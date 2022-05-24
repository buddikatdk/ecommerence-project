using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Core.Entities
{
    public class Cart
    {
        public Cart()
        {
        }

        public Cart(string id)
        {
            Id = id;
           // Items = items;
        }

        public string Id { get; set; }
        public List<CartItem> Items { get; set; } = new List<CartItem>();
    }
}