using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using WeddingApp.Models;

namespace WeddingApp.Controllers
{
    [Route("api/[controller]")]
    public class RsvpController : Controller
    {
        private readonly RsvpContext _context;

        public RsvpController(RsvpContext context)
        {
            _context = context;

            if (_context.RsvpItems.Count() == 0)
            {
                _context.RsvpItems.Add(new Rsvp { Name = "Item1", UniqueId = Guid.NewGuid() });
                _context.SaveChanges();
            }
        }

        [HttpGet]
        public IEnumerable<Rsvp> GetAll()
        {
            return _context.RsvpItems.ToList();
        }

        [HttpGet("{id}", Name = "GetRsvp")]
        public IActionResult GetByUniqueId(string id)
        {
            Guid uniqueId = Guid.Empty;
            
            Guid.TryParse(id, out uniqueId);
            var item = _context.RsvpItems.FirstOrDefault(t => t.UniqueId == uniqueId);
            if (item == null)
            {
                return NotFound();
            }
            return new ObjectResult(item);
        } 

        [HttpPost]
        public IActionResult Create([FromBody] Rsvp item)
        {
            if (item == null)
            {
                return BadRequest();
            }

            _context.RsvpItems.Add(item);
            _context.SaveChanges();

            return CreatedAtRoute("GetRsvp", new { id = item.UniqueId.ToString() }, item);
        }

        [HttpPut("{id}")]
        public IActionResult Update(string id, [FromBody] Rsvp item)
        {
            Guid uniqueId = Guid.Empty;
            
            Guid.TryParse(id, out uniqueId);

            if (item == null || item.UniqueId != uniqueId)
            {
                return BadRequest();
            }

            var rsvp = _context.RsvpItems.FirstOrDefault(t => t.UniqueId == uniqueId);
            if (rsvp == null)
            {
                return NotFound();
            }
            rsvp.Name = item.Name;
            rsvp.PlusOne = item.PlusOne;
            rsvp.KidsCount = item.KidsCount;
            rsvp.Email = item.Email;
            rsvp.Attending = item.Attending;

            if (item.PlusOne)
                rsvp.PlusOneName = item.PlusOneName;
            else 
                rsvp.PlusOneName = string.Empty;


            _context.RsvpItems.Update(rsvp);
            _context.SaveChanges();
            return new NoContentResult();
        }
    }
}