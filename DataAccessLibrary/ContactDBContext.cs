using Microsoft.EntityFrameworkCore;

namespace DataAccessLibrary.EntityModels
{
    public partial class ContactDBContext : DbContext
    {
        public ContactDBContext()
        {
        }

        public ContactDBContext(DbContextOptions<ContactDBContext> options)
            : base(options)
        {
        }

        public DbSet<Contacts> Contacts { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseNpgsql(@"Server=localhost;Database=ContactDB;Port=5432;User Id=postgres;Password=joaop0705*;");
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Contacts>().HasKey(c => c.ContactId);
        }
    }
}
