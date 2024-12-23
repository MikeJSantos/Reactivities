using Application.Core;
using Domain;
using MediatR;
using Persistence;

namespace Application.Activities;

public class Details
{
    public class Query : IRequest<Result<Activity>>
    {
        public Guid Id { get; set; }
    }

    public class Handler(DataContext context) : IRequestHandler<Query, Result<Activity>>
    {
        private readonly DataContext _context = context;

        public async Task<Result<Activity>> Handle(Query request, CancellationToken cancellationToken)
        {
            var activity = await _context.Activities.FindAsync([request.Id], cancellationToken: cancellationToken);
            return Result<Activity>.Success(activity);
        }
    }
}