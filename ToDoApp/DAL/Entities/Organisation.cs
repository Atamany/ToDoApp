namespace ToDoApp.DAL.Entities
{
    public class Organisation
    {
        public int OrganisationId { get; set; }
        public string OrganisationName { get; set; }
        public bool IsActive { get; set; }
        public List<Mission> Missions { get; set; }
    }
}
