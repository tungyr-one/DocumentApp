using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;

namespace DocumentApp.Helpers
{
    [JsonObject]
    public class Pagination<T>
    {
        public Pagination(IEnumerable<T> items, int count)
        {
         CountItems = count;
         Items = items;
        }
   
        public int CountItems { get; set; }      
        public IEnumerable<T> Items { get; set; }

        public static Pagination<T> ToPageResult(IEnumerable<T> source, int offset, int pageSize)
        {   
            var count = source.Count();
            var items = source.Skip(offset).Take(pageSize);
            return new Pagination<T>(items, count);
        }
    }
}