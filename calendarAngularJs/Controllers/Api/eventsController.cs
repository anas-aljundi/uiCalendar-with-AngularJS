using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace calendarAngularJs.Controllers.Api
{
    public class eventsController : ApiController
    {
        private EventsTestingEntities _context;
        public eventsController()
        {
            _context = new EventsTestingEntities();
        }

        // GET/ api/ events
        public IHttpActionResult GetEvents() {
            var allEvents = _context.Events.ToList();
            return Ok(allEvents);
        }
    }
}
