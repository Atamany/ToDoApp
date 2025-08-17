namespace ToDoApp.Models
{
    public class MissionViewModel
    {
        public int MissionId { get; set; }
        public string MissionTitle { get; set; }
        public int Importance { get; set; }
        public int StepCount { get; set; }
        public int DoneStepCount { get; set; }
        public string OrganisationName { get; set; }
    }
}
