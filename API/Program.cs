using Microsoft.EntityFrameworkCore;
using Persistence;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

var services = builder.Services;
services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
services.AddEndpointsApiExplorer();
services.AddSwaggerGen();
var connectionString = builder.Configuration.GetConnectionString("Default");
services.AddDbContext<DataContext>(optionsAction => optionsAction.UseSqlite(connectionString));

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// "We're going to remove this L6 @ 6:37
// app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
