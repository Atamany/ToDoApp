namespace ToDoApp.DAL.Entities
{
    public class Step
    {
        public int StepId { get; set; }
        public string StepName { get; set; }
        public bool IsCompleted { get; set; }
        public virtual Mission Mission { get; set; } 
    }
}
