using System;

namespace api.Helpers
{
    public static class Extensions
    {
        public static string CapitalizeFirstLetter(this string str)
        {
            return string.Concat(str[0].ToString().ToUpper(), str.AsSpan(1));
        }
    }
}