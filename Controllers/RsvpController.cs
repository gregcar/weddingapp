using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using WeddingApp.Models;

namespace WeddingApp.Controllers
{
    [Route("api/[controller]")]
    public class RsvpsController : Controller
    {
        private readonly RsvpContext _context;

        public RsvpsController(RsvpContext context)
        {
            _context = context;

        }

        [HttpGet]
        public IEnumerable<Rsvp> GetAll()
        {
            return _context.RsvpItems.ToList();
        }

        [HttpGet("{id}", Name = "GetRsvp")]
        public IActionResult GetById(string id)
        {
            Guid uniqueId = Guid.Empty;
            
            Guid.TryParse(id, out uniqueId);
            var item = _context.RsvpItems.FirstOrDefault(t => t.Id == uniqueId);
            if (item == null)
            {
                return NotFound();
            }
            return new JsonResult(item);
        } 

        //[HttpPost]
        //public IActionResult Create([FromBody] Rsvp item)
        //{
        //    if (item == null)
        //    {
        //        return BadRequest();
        //    }
        //    _context.RsvpItems.Add(item);
        //    _context.SaveChanges();

          //  return CreatedAtRoute("GetRsvp", new { id = item.Id.ToString() }, item);
        //}

        [HttpPut("{id}")]
        public IActionResult Update(string id, [FromBody] Rsvp item)
        {
            Guid uniqueId = Guid.Empty;
            
            Guid.TryParse(id, out uniqueId);

            if (item == null || item.Id != uniqueId)
            {
                return BadRequest();
            }

            var rsvp = _context.RsvpItems.FirstOrDefault(t => t.Id == uniqueId);
            if (rsvp == null)
            {
                return NotFound();
            }

            rsvp.KidsCount = item.KidsCount;
            rsvp.Status = item.Status;
            rsvp.UpdateDate = DateTime.UtcNow;

            if (item.Status == RsvpStatus.YesPlusOne)
                rsvp.PlusOneName = item.PlusOneName;
            else 
                rsvp.PlusOneName = string.Empty;


            _context.RsvpItems.Update(rsvp);
            _context.SaveChanges();
            return new NoContentResult();
        }
    }
}