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
            var degerler = db.Missions.Where(x=>x.isActive==true).OrderByDescending(x => x.Importance).Select(m => new MissionViewModel
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
            var kurumlar = db.Organisations.Where(x => x.IsActive == true).ToList();

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
                Steps = new List<Step>(),
                isActive = true
            };
            for (int i = 1; i < (missionAddViewModel.Steps + 1); i++)
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
            var kurumlar = db.Organisations.Where(x => x.IsActive == true).ToList();

            ViewBag.Kurumlar = kurumlar;

            var mission = db.Missions.Find(id);
            if (mission == null)
            {
                return NotFound();
            }
            MissionUpdateViewModel missionUpdateViewModel = new MissionUpdateViewModel
            {
                MissionId = mission.MissionId,
                Title = mission.Title,
                ImportanceStatus = mission.Importance % 2 == 0,
                UrgencyStatus = mission.Importance > 2,
                OrganisationId = mission.Organisation.OrganisationId
            };
            return View(missionUpdateViewModel);
        }
        [HttpPost]
        public IActionResult UpdateMission(MissionUpdateViewModel missionUpdateViewModel)
        {
            int ImportanceCode = 0;
            if (missionUpdateViewModel.ImportanceStatus == true && missionUpdateViewModel.UrgencyStatus == true) { ImportanceCode = 4; }
            else if (missionUpdateViewModel.ImportanceStatus == false && missionUpdateViewModel.UrgencyStatus == true) { ImportanceCode = 3; }
            else if (missionUpdateViewModel.ImportanceStatus == true && missionUpdateViewModel.UrgencyStatus == false) { ImportanceCode = 2; }
            else if (missionUpdateViewModel.ImportanceStatus == false && missionUpdateViewModel.UrgencyStatus == false) { ImportanceCode = 1; }
            var mission = db.Missions.Find(missionUpdateViewModel.MissionId);
            if (mission != null)
            {
                mission.Title = missionUpdateViewModel.Title;
                mission.Importance = ImportanceCode;
                mission.Organisation = db.Organisations.Find(missionUpdateViewModel.OrganisationId);
                db.Missions.Update(mission);
                db.SaveChanges();
            }
            return RedirectToAction("Index");
        }
        public IActionResult DeleteMission(int id)
        {
            var deger = db.Missions.Find(id);
            if (deger != null)
            {
                deger.isActive = false;
                db.Missions.Update(deger);
                db.SaveChanges();
            }
            return RedirectToAction("Index");
        }
    }
}
