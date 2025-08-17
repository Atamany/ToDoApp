using Microsoft.AspNetCore.Mvc;
using ToDoApp.DAL.Context;
using ToDoApp.DAL.Entities;

namespace ToDoApp.Controllers
{
    public class OrganisationController : Controller
    {
        ToDoContext db = new ToDoContext();
        public IActionResult Index()
        {
            var result = db.Organisations.Where(x => x.IsActive == true).ToList();
            return View(result);
        }
        public IActionResult DeleteOrganisation(int id)
        {
            var deger = db.Organisations.Find(id);
            if (deger != null)
            {
                deger.IsActive = false;
                db.Organisations.Update(deger);
                db.SaveChanges();
            }
            return RedirectToAction("Index");
        }
        [HttpGet]
        public IActionResult AddOrganisation()
        {
            return View();
        }
        [HttpPost]
        public IActionResult AddOrganisation(Organisation organisation)
        {
            organisation.IsActive = true;
            db.Organisations.Add(organisation);
            db.SaveChanges();
            return RedirectToAction("Index");
        }
        [HttpGet]
        public IActionResult UpdateOrganisation(int id)
        {
            var deger = db.Organisations.Find(id);
            if (deger != null)
            {
                return View(deger);
            }
            return NotFound();
        }
        [HttpPost]
        public IActionResult UpdateOrganisation(Organisation organisation)
        {
            var deger = db.Organisations.Find(organisation.OrganisationId);
            if (deger != null)
            {
                deger.OrganisationName = organisation.OrganisationName;
                deger.IsActive = true;
                db.Organisations.Update(deger);
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            return NotFound();
        }
    }
}
