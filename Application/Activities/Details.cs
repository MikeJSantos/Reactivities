using Domain;
using MediatR;
using Persistence;

namespace Application.Activities;

public class Details
{
    public class Query : IRequest<Activity>
    {
        public Guid Id { get; set; }
    }

    public class Handler(DataContext context) : IRequestHandler<Query, Activity>
    {
        private readonly DataContext _context = context;

        public async Task<Activity> Handle(Query request, CancellationToken cancellationToken)
        {
            var activity = await _context.Activities.FindAsync([request.Id], cancellationToken: cancellationToken)
                ?? throw new Exception($"Activity ID ({request.Id}) not found.");
            return activity;
        }
    }
}