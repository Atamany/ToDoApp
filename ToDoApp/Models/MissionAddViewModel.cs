using ToDoApp.DAL.Entities;

namespace ToDoApp.Models
{
    public class MissionAddViewModel
    {
        public string Title { get; set; }
        public bool ImportanceStatus { get; set; }
        public bool UrgencyStatus { get; set; }
        public int OrganisationId { get; set; }
        public int Steps { get; set; }
    }
}
