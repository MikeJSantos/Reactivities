using Application.Activities;
using Application.Core;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[AllowAnonymous]
public class ActivitiesController : BaseApiController
{
    [HttpGet]
    public async Task<IActionResult> GetActivities()
    {
        var request = new List.Query();
        var result = await Mediator.Send(request); ;
        return HandleResult(result);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetActivity(Guid id)
    {
        var request = new Details.Query { Id = id };
        var result = await Mediator.Send(request);
        return HandleResult(result);
    }

    [HttpPost]
    public async Task<IActionResult> CreateActivity(Activity activity)
    {
        var request = new Create.Command { Activity = activity };
        return await Send(request);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> EditActivity(Guid id, Activity activity)
    {
        activity.Id = id;
        var request = new Edit.Command { Activity = activity };
        return await Send(request);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteActivity(Guid id)
    {
        var request = new Delete.Command() { Id = id };
        return await Send(request);
    }

    private async Task<IActionResult> Send(IRequest<Result<Unit>> request)
    {
        var result = await Mediator.Send(request);
        return HandleResult(result);
    }
}
