using System;

namespace DocumentApp.Exceptions
{
    public class ValidationException: Exception
    {
        public ValidationException(string message)
            :base(message)
        {
            
        }
    }
}