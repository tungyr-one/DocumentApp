using System;

namespace DocumentApp.Exceptions
{
    public class NotFoundException: Exception
    {
        public NotFoundException(string message):base(message)
        {
        }        
    }
}