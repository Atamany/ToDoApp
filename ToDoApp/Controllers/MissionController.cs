using Microsoft.AspNetCore.Mvc;
using ToDoApp.DAL.Context;
using ToDoApp.DAL.Entities;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ToDoApp.Models;

namespace ToDoApp.Controllers
{
    public class MissionController : Controller
    {
        ToDoContext db = new ToDoContext();
        [HttpGet]
        public IActionResult Index()
        {
            var degerler = db.Missions.Select(m => new MissionViewModel
            {
                MissionId = m.MissionId,
                MissionTitle = m.Title,
                Importance = m.Importance,
                StepCount = db.Steps.Count(s => s.Mission.MissionId == m.MissionId),
                DoneStepCount = db.Steps.Count(s => s.Mission.MissionId == m.MissionId && s.IsCompleted),
                OrganisationName = db.Organisations
                                   .Where(o => o.OrganisationId == m.Organisation.OrganisationId)
                                   .Select(o => o.OrganisationName)
                                   .FirstOrDefault()
            })
    .ToList();

            return View(degerler);
        }

    }
}
