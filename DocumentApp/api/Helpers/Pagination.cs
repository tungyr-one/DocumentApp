using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;

namespace api.Helpers
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

        public static async Task<Pagination<T>> CreateAsync(IQueryable<T> source, int offset, int pageSize)
        {   
            var count = await source.CountAsync();
            var items = await source.Skip(offset).Take(pageSize).ToArrayAsync();
            return new Pagination<T>(items, count);
        }
    }
}