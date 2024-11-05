using Domain;
using MediatR;
using Persistence;

namespace Application.Activities;

public class Create
{
    public class Command : IRequest
    {
        public Activity Activity { get; set; }
    }

    public class Handler(DataContext context) : IRequestHandler<Command>
    {
        private readonly DataContext _context = context;

        public async Task Handle(Command request, CancellationToken cancellationToken)
        {
            await _context.Activities.AddAsync(request.Activity);
            await _context.SaveChangesAsync(cancellationToken);
        }
    }
}