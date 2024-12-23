using Application.Core;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Activities;

public class List
{
    public class Query : IRequest<Result<List<Activity>>> { }

    public class Handler(DataContext context) : IRequestHandler<Query, Result<List<Activity>>>
    {
        private readonly DataContext _context = context;

        public async Task<Result<List<Activity>>> Handle(Query request, CancellationToken cancellationToken)
        {
            var activities = await _context.Activities.ToListAsync(cancellationToken);
            return Result<List<Activity>>.Success(activities);
        }
    }
}