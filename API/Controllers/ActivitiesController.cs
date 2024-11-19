using Application.Activities;
using Domain;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

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
        var result = await Mediator.Send(request);
        return HandleResult(result);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> EditActivity(Guid id, Activity activity)
    {
        activity.Id = id;
        await Mediator.Send(new Edit.Command { Activity = activity });
        return Ok();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteActivity(Guid id)
    {
        await Mediator.Send(new Delete.Command() { Id = id });
        return Ok();
    }
}
