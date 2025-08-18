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
            var degerler = db.Missions.OrderByDescending(x=>x.Importance).Select(m => new MissionViewModel
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
        [HttpGet]
        public IActionResult AddMission()
        {
            var kurumlar = db.Organisations.Where(x=>x.IsActive==true).ToList();

            ViewBag.Kurumlar = kurumlar;
            return View();
        }
        [HttpPost]
        public IActionResult AddMission(MissionAddViewModel missionAddViewModel)
        {
            int ImportanceCode = 0;

            if (missionAddViewModel.ImportanceStatus == true && missionAddViewModel.UrgencyStatus == true) { ImportanceCode = 4; }
            else if (missionAddViewModel.ImportanceStatus == false && missionAddViewModel.UrgencyStatus == true) { ImportanceCode = 3; }
            else if (missionAddViewModel.ImportanceStatus == true && missionAddViewModel.UrgencyStatus == false) { ImportanceCode = 2; }
            else if (missionAddViewModel.ImportanceStatus == false && missionAddViewModel.UrgencyStatus == false) { ImportanceCode = 1; }
            Mission mission = new Mission
            {
                Title = missionAddViewModel.Title,
                Importance = ImportanceCode,
                Organisation = db.Organisations.Find(missionAddViewModel.OrganisationId),
                Steps = new List<Step>()
            };
            for(int i=1;i < (missionAddViewModel.Steps+1); i++)
            {
                Step step = new Step
                {
                    StepName = i.ToString(),
                    IsCompleted = false,
                    Mission = mission
                };
                db.Steps.Add(step);
            }
            db.Missions.Add(mission);
            db.SaveChanges();
            return RedirectToAction("Index");
        }
        [HttpGet]
        public IActionResult UpdateMission(int id)
        {
            var mission = db.Missions.Find(id);
            if (mission == null)
            {
                return NotFound();
            }
            return View(mission);
        }
    }
}
