using Application.Core;
using MediatR;
using Persistence;

namespace Application.Activities;

public class Delete
{
    public class Command : IRequest<Result<Unit>>
    {
        public Guid Id { get; set; }
    }

    public class Handler(DataContext context) : IRequestHandler<Command, Result<Unit>>
    {
        private readonly DataContext _context = context;

        public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
        {
            var activity = await _context.Activities.FindAsync(request.Id, cancellationToken);
            if (activity == null) return null;

            _context.Remove(activity);
            var succcess = await _context.SaveChangesAsync(cancellationToken) > 0;

            return succcess
                ? Result<Unit>.Success(Unit.Value)
                : Result<Unit>.Failure("Failed to delete activity");
        }
    }
}