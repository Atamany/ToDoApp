using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ToDoApp.DAL.Context;
using ToDoApp.DAL.Entities;

namespace ToDoApp.Controllers
{
    public class StepController : Controller
    {
        ToDoContext db = new ToDoContext();

        [HttpGet]
        public IActionResult Index(int id)
        {
            var result = db.Steps.Where(x => x.Mission.MissionId == id).ToList();
            ViewBag.MissionId = id;
            ViewBag.Organization = (db.Missions.Where(x => x.MissionId == id).Select(x => x.Organisation.OrganisationName).FirstOrDefault()) + " - " + db.Missions.Where(x=>x.MissionId==id).Select(x=>x.Title).FirstOrDefault();
            return View(result);
        }
        [HttpGet]
        public IActionResult AddStep(int id) {
            ViewBag.MissionId = id;
            ViewBag.Organization = (db.Missions.Where(x => x.MissionId == id).Select(x => x.Organisation.OrganisationName).FirstOrDefault()) + " - " + db.Missions.Where(x => x.MissionId == id).Select(x => x.Title).FirstOrDefault();
            return View();
        }

        [HttpPost]
        public IActionResult AddStep(Step step, int MissionId)
        {
            step.Mission = db.Missions.Find(MissionId);
            step.IsCompleted = false;
            db.Steps.Add(step);
            db.SaveChanges();
            return RedirectToAction("Index", new { id = MissionId });
        }
        public IActionResult DeleteStep(int id)
        {
            var step = db.Steps.Include(s => s.Mission).FirstOrDefault(s => s.StepId == id);
            var missionId = step.Mission.MissionId;
            if (step != null)
            {
                db.Steps.Remove(step);
                db.SaveChanges();
            }
            return RedirectToAction("Index", new { id = missionId });
        }
        public IActionResult DoneStep(int id)
        {
            var step = db.Steps.Include(s => s.Mission).FirstOrDefault(s => s.StepId == id);
            var missionId = step.Mission.MissionId;
            if (step != null)
            {
                step.IsCompleted = true;
                db.SaveChanges();
            }
            return RedirectToAction("Index", new { id = missionId });
        }
        public IActionResult UndoneStep(int id)
        {
            var step = db.Steps.Include(s => s.Mission).FirstOrDefault(s => s.StepId == id);
            var missionId = step.Mission.MissionId;
            if (step != null)
            {
                step.IsCompleted = false;
                db.SaveChanges();
            }
            return RedirectToAction("Index", new { id = missionId });
        }
        public IActionResult UpdateStep(int id)
        {
            var step = db.Steps.Include(s => s.Mission).FirstOrDefault(s => s.StepId == id);
            if (step != null)
            {
                ViewBag.MissionId = step.Mission.MissionId;
                ViewBag.Organization = (db.Missions.Where(x => x.MissionId == step.Mission.MissionId).Select(x => x.Organisation.OrganisationName).FirstOrDefault()) + " - " + db.Missions.Where(x => x.MissionId == step.Mission.MissionId).Select(x => x.Title).FirstOrDefault();
                return View(step);
            }
            return NotFound();
        }
        [HttpPost]
        public IActionResult UpdateStep(Step step)
        {
            var existingStep = db.Steps.Include(s => s.Mission).FirstOrDefault(s => s.StepId == step.StepId);
            var missionId = existingStep.Mission.MissionId;
            if (existingStep != null)
            {
                existingStep.StepName = step.StepName;
                db.SaveChanges();
                return RedirectToAction("Index", new { id = missionId });
            }
            return NotFound();
        }
    }
}
