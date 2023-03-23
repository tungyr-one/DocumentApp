using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Exceptions
{
    public class ValidationException: ArgumentException
    {
        public ValidationException()
        {
            
        }

        public ValidationException(string message)
            :base(message)
        {
            
        }
    }
}