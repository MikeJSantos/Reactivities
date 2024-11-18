using AutoMapper;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.Activities;

public class Edit
{
    public class Command : IRequest
    {
        public Activity Activity { get; set; }
    }

    public class CommandValidator : AbstractValidator<Command>
    {
        public CommandValidator()
            => RuleFor(a => a.Activity).SetValidator(new ActivityValidator());
    }

    public class Handler(DataContext context, IMapper mapper) : IRequestHandler<Command>
    {
        private DataContext _context = context;
        private IMapper _mapper = mapper;

        public async Task Handle(Command request, CancellationToken cancellationToken)
        {
            var activity = await _context.Activities.FindAsync(request.Activity.Id);
            _mapper.Map(request.Activity, activity);
            await _context.SaveChangesAsync(cancellationToken);
        }
    }
}