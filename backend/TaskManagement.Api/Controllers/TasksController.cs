using Microsoft.AspNetCore.Mvc;
using TaskManagement.Api.Contracts;
using TaskManagement.Api.Services;

namespace TaskManagement.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TasksController : ControllerBase
{
    private readonly ITaskService _taskService;
    private readonly ILogger<TasksController> _logger;

    public TasksController(ITaskService taskService, ILogger<TasksController> logger)
    {
        _taskService = taskService;
        _logger = logger;
    }

    [HttpGet]
    public IActionResult GetAll()
    {
        return Ok(_taskService.GetAll());
    }

    [HttpGet("{id:guid}")]
    public IActionResult GetById(Guid id)
    {
        var task = _taskService.GetById(id);

        if (task is null)
        {
            return NotFound();
        }

        return Ok(task);
    }

    [HttpPost]
    public IActionResult Create(CreateTaskRequest request)
    {
        if (string.IsNullOrWhiteSpace(request.Title))
        {
            return BadRequest("Title is required.");
        }

        var task = _taskService.Create(request);

        _logger.LogInformation("Task created with ID {TaskId}", task.Id);

        return CreatedAtAction(nameof(GetById), new { id = task.Id }, task);
    }

    [HttpPatch("{id:guid}/status")]
    public IActionResult UpdateStatus(Guid id, UpdateTaskStatusRequest request)
    {
        if (string.IsNullOrWhiteSpace(request.Status))
        {
            return BadRequest("Status is required.");
        }

        var task = _taskService.UpdateStatus(id, request);

        if (task is null)
        {
            return NotFound();
        }

        return Ok(task);
    }

    [HttpDelete("{id:guid}")]
    public IActionResult Delete(Guid id)
    {
        var deleted = _taskService.Delete(id);

        if (!deleted)
        {
            return NotFound();
        }

        return NoContent();
    }
}