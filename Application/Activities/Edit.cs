using Application.Core;
using AutoMapper;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.Activities;

public class Edit
{
    public class Command : IRequest<Result<Unit>>
    {
        public Activity Activity { get; set; }
    }

    public class CommandValidator : AbstractValidator<Command>
    {
        public CommandValidator()
            => RuleFor(a => a.Activity).SetValidator(new ActivityValidator());
    }

    public class Handler(DataContext context, IMapper mapper) : IRequestHandler<Command, Result<Unit>>
    {
        private readonly DataContext _context = context;
        private readonly IMapper _mapper = mapper;

        public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
        {
            var activity = await _context.Activities.FindAsync(request.Activity.Id, cancellationToken);
            if (activity == null) return null;

            _mapper.Map(request.Activity, activity);
            var success = await _context.SaveChangesAsync(cancellationToken) > 0;

            return success
                ? Result<Unit>.Success(Unit.Value)
                : Result<Unit>.Failure("Failed to update activity");
        }
    }
}