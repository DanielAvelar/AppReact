using AppSage;
using Microsoft.EntityFrameworkCore;

namespace DataAccessLibrary.EntityModels
{
    public partial class DBContext : DbContext
    {
        public DBContext()
        {
        }

        public DBContext(DbContextOptions<DBContext> options)
            : base(options)
        {
        }

        public DbSet<Person> Person { get; set; }
        public DbSet<Address> Address { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseNpgsql(GlobalVariables.PostresqlConnection);
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Address>()
                .HasKey(s => s.Fk_PersonId);

            modelBuilder.Entity<Person>()
                    .HasOne<Address>(s => s.Address)
                    .WithOne(sa => sa.Person);
        }
    }
}
