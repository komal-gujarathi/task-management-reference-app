namespace TaskManagement.Api.Contracts;

public class CreateTaskRequest
{
    public string Title { get; set; } = string.Empty;
    public string? Description { get; set; }
    public string? AssignedTo { get; set; }
    public DateTime? DueDate { get; set; }
    public string? ClientName { get; set; }
    public string? RaisedBy { get; set; }
    public string Priority { get; set; } = "Medium";
    public string Category { get; set; } = "General";

}