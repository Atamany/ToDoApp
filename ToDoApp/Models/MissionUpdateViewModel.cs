namespace ToDoApp.Models
{
    public class MissionUpdateViewModel
    {
        public int MissionId { get; set; }
        public string Title { get; set; }
        public bool ImportanceStatus { get; set; }
        public bool UrgencyStatus { get; set; }
        public int OrganisationId { get; set; }
        public int Steps { get; set; }
    }
}
