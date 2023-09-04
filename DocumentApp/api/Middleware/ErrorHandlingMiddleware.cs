using System;
using System.Net;
using System.Text.Json;
using System.Threading.Tasks;
using DocumentApp.Exceptions;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

namespace DocumentApp.Middleware
{
    public class ErrorHandlingMiddleware
    {
        private readonly RequestDelegate _next;
        private ILogger<ErrorHandlingMiddleware> _logger { get; }
        private readonly IHostEnvironment _env;
        public ErrorHandlingMiddleware(RequestDelegate next, ILogger<ErrorHandlingMiddleware> logger, IHostEnvironment env)
        {
            _env = env;
            _logger = logger;
            _next = next;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            try
            {
                await _next(context);
            }
            catch(Exception ex)
            {
                _logger.LogError(ex, ex.Message);

                if (!_env.IsDevelopment())
                {
                    new ApiException(context.Response.StatusCode, "Internal Server Error");
                }
                else
                {
                    await HandleExceptionAsync(context, ex);
                }
            }
        }

        private static async Task HandleExceptionAsync(HttpContext context, Exception exception)
        {
            string errorMessage;
            int statusCode;
            string stackTrace = exception.StackTrace?.ToString();            

            if (exception is NotFoundException)
            {
                errorMessage = "Resource not found";
                statusCode = (int)HttpStatusCode.NotFound;
            }
            else if (exception is ValidationException)
            {
                errorMessage = "Wrong input data";
                statusCode = (int)HttpStatusCode.BadRequest;
            }
            else
            {
                errorMessage = "An error occurred.";
                statusCode = (int)HttpStatusCode.InternalServerError;
            }

            var response = new
            {
                ErrorMessage = errorMessage,
                StatusCode = statusCode,
                StackTrace = stackTrace
            };

            context.Response.StatusCode = statusCode;
            context.Response.ContentType = "application/json";

            var options = new JsonSerializerOptions{PropertyNamingPolicy = JsonNamingPolicy.CamelCase};

            var json = JsonSerializer.Serialize(response, options);
            
            await context.Response.WriteAsync(json);
        }
    }
}