using Domain;
using MediatR;
using Persistence;

namespace Application.Activities;

public class Edit
{
    public class Command : IRequest
    {
        public Activity Activity { get; set; }
    }

    public class Handler(DataContext context) : IRequestHandler<Command>
    {
        private DataContext _context = context;

        public async Task Handle(Command request, CancellationToken cancellationToken)
        {
            var activity = await _context.Activities.FindAsync(request.Activity.Id);
            activity.Title = request.Activity.Title;
            await _context.SaveChangesAsync();
        }
    }
}