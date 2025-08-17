using Microsoft.EntityFrameworkCore;
using ToDoApp.DAL.Entities;

namespace ToDoApp.DAL.Context
{
    public class ToDoContext: DbContext
    {
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer("Server=YIGITATAMANPC;initial Catalog=ToDoAppDB;integrated Security=True;TrustServerCertificate=True;");
        }

        public DbSet<Organisation> Organisations { get; set; }
        public DbSet<Mission> Missions { get; set; }
        public DbSet<Step> Steps { get; set; }
    }
}
