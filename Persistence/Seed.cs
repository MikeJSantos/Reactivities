using Domain;
using Microsoft.AspNetCore.Identity;

namespace Persistence
{
    public class Seed
    {
        private const string Drinks = "drinks";
        private const string London = "London";
        private static readonly List<Activity> activities = [];

        public static async Task SeedData(DataContext context)
        {
            if (context.Activities.Any()) return;

            AddActivity(-2, Drinks, London, "Pub");
            AddActivity(-1, "culture", "Paris", "Louvre");
            AddActivity(1, "culture", London, "Natural History Museum");
            AddActivity(2, "music", London, "O2 Arena");
            AddActivity(3, Drinks, London, "Another pub");
            AddActivity(4, Drinks, London, "Yet Another pub");
            AddActivity(5, Drinks, London, "Just another pub");
            AddActivity(6, "music", London, "Roundhouse Camden");
            AddActivity(7, "travel", London, "Somewhere on the Thames");
            AddActivity(8, "film", London, "Cinema");

            await context.Activities.AddRangeAsync(activities);
            await context.SaveChangesAsync();
        }

        private static void AddActivity(int months, string category, string city, string venue)
        {
            var now = DateTime.UtcNow;
            var isPast = int.IsNegative(months);
            var activityNum = activities.Count(a => isPast ? a.Date < now : a.Date >= now) + 1;

            var activity = new Activity()
            {
                Title = $"{(isPast ? "Past" : "Future")} Activity {activityNum}",
                Date = now.AddMonths(months),
                Description = $"Activity {int.Abs(months)} month(s) {(isPast ? "ago" : "in future")}",
                Category = category,
                City = city,
                Venue = venue
            };
            activities.Add(activity);
        }

        public static async Task SeedUsers(UserManager<AppUser> userManager)
        {
            if (userManager.Users.Any()) return;

            var users = new List<AppUser>
            {
                GetUser("bob"),
                GetUser("tom"),
                GetUser("jane"),
            };

            foreach (var user in users)
                await userManager.CreateAsync(user, "Pa$$w0rd");
        }

        private static AppUser GetUser(string name) => new()
        {
            DisplayName = name[0].ToString().ToUpper() + name[1..],
            UserName = name,
            Email = $"{name}@test.com"
        };
    }
}