using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.DTOs;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;

namespace api.Helpers
{
    [JsonObject]
    public class Pagination<T>
    {
        public Pagination(IEnumerable<T> items, int count, int pageSize)
        {
         CountPages = (int) Math.Ceiling(count/(double) pageSize);
         CountItems = count;
         Items = items;
        }

        [JsonProperty]
        public int CountPages { get; set; }      
        [JsonProperty]
        public int CountItems { get; set; }      
        [JsonProperty]
        public IEnumerable<T> Items { get; set; }

        public static async Task<Pagination<T>> CreateAsync(IQueryable<T> source, int pageNumber, int pageSize)
        {   
            var count = await source.CountAsync();
            var items = await source.Skip((pageNumber - 1) * pageSize).Take(pageSize).ToArrayAsync();
            return new Pagination<T>(items, count, pageSize);
        }
    }
}