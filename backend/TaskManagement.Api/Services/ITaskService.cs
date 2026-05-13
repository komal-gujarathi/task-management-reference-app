using TaskManagement.Api.Contracts;
using TaskManagement.Api.Models;

namespace TaskManagement.Api.Services;

public interface ITaskService
{
    IEnumerable<TaskItem> GetAll();
    TaskItem? GetById(Guid id);
    TaskItem Create(CreateTaskRequest request);
    TaskItem? UpdateStatus(Guid id, UpdateTaskStatusRequest request);
    bool Delete(Guid id);
}