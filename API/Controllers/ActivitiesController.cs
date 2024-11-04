using Application.Activities;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Controllers;

public class ActivitiesController(IMediator mediator) : BaseApiController
{
    private readonly IMediator _mediator = mediator;

    [HttpGet]
    public async Task<ActionResult<List<Activity>>> GetActivities()
        => await _mediator.Send(new List.Query());

    [HttpGet("{id}")]
    public async Task<ActionResult<Activity>> GetActivity(Guid id)
        => Ok();
}
