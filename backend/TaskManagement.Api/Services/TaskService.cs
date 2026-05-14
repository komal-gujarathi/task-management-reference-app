using TaskManagement.Api.Contracts;
using TaskManagement.Api.Models;

namespace TaskManagement.Api.Services;

public class TaskService : ITaskService
{
    private readonly List<TaskItem> _tasks = new();

    public IEnumerable<TaskItem> GetAll()
    {
        return _tasks.OrderBy(t => t.DueDate ?? DateTime.MaxValue);
    }

    public TaskItem? GetById(Guid id)
    {
        return _tasks.FirstOrDefault(t => t.Id == id);
    }

    public TaskItem Create(CreateTaskRequest request)
    {
        var task = new TaskItem
        {
            Title = request.Title.Trim(),
            Description = request.Description,
            AssignedTo = request.AssignedTo,
            DueDate = request.DueDate,
            Status = "To Do",
            ClientName = request.ClientName,
            RaisedBy = request.RaisedBy,
            RaisedDate = DateTime.UtcNow,
            Priority = request.Priority,
            Category = request.Category,
        };

        _tasks.Add(task);
        return task;
    }

    public TaskItem? UpdateStatus(Guid id, UpdateTaskStatusRequest request)
    {
        var task = GetById(id);

        if (task is null)
        {
            return null;
        }

        task.Status = request.Status.Trim();
        return task;
    }

    public bool Delete(Guid id)
    {
        var task = GetById(id);

        if (task is null)
        {
            return false;
        }

        _tasks.Remove(task);
        return true;
    }
}