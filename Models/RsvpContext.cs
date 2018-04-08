using Microsoft.EntityFrameworkCore;

namespace WeddingApp.Models
{
    public class RsvpContext : DbContext
    {
        public RsvpContext(DbContextOptions<RsvpContext> options)
            : base(options)
        {
        }

        public DbSet<Rsvp> RsvpItems { get; set; }

    }
}