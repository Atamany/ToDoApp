namespace ToDoApp.DAL.Entities
{
    public class Mission
    {
        public int MissionId { get; set; }
        public string Title { get; set; }
        public int Importance { get; set; }
        public virtual Organisation Organisation { get; set; }
        public List<Step> Steps { get; set; }
    }
}
