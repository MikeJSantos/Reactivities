using Application.Core;
using System.Net;
using System.Text.Json;

namespace API.Middleware;

public class ExceptionMiddleware(
    RequestDelegate next,
    ILogger<ExceptionMiddleware> logger,
    IHostEnvironment env)
{
    private readonly RequestDelegate _next = next;
    private readonly ILogger<ExceptionMiddleware> _logger = logger;
    private readonly IHostEnvironment _env = env;

    public async Task InvokeAsync(HttpContext context)
    {
        try
        {
            await _next(context);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, ex.Message);
            await SendErrorResponse(context, ex);
        }
    }

    private async Task SendErrorResponse(HttpContext context, Exception ex)
    {
        const int statusCode = (int)HttpStatusCode.InternalServerError;

        var appException = _env.IsDevelopment()
            ? new AppException(statusCode, ex.Message, ex.StackTrace?.ToString())
            : new AppException(statusCode, "Internal Server Error", string.Empty);
        var options = new JsonSerializerOptions { PropertyNamingPolicy = JsonNamingPolicy.CamelCase };
        var json = JsonSerializer.Serialize(appException, options);

        var httpResponse = context.Response;
        httpResponse.ContentType = "application/json";
        httpResponse.StatusCode = statusCode;
        await httpResponse.WriteAsync(json);
    }
}