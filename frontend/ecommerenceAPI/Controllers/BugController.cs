using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ecommerenceAPI.Errors;
using Infrasturcture.Data;
using Microsoft.AspNetCore.Mvc;

namespace ecommerenceAPI.Controllers
{
    public class BugController:BaseApiController
    {
        private readonly StoreContext _context;

        public BugController(StoreContext context)
        {
            _context = context;
        }

        [HttpGet("notfound")]
        public ActionResult GetNotFoundRequest()
        {
            var thing = _context.Products.Find(100);
            if(thing == null)
            {
                return NotFound(new ApiResponse(400));
            }
            return Ok();
        }

        [HttpGet("servererror")]
        public ActionResult GetServerError()
        {
            var thing = _context.Products.Find(100);
            var thingToReturn = thing.ToString();
            return Ok();
        }

        [HttpGet("badrequest")]
        public ActionResult GetBadRequest()
        {
            return BadRequest(new ApiResponse(400));//400 response
        }

        [HttpGet("badrequest/{id}")]
        public ActionResult GetNotFoundRequest(int id)
        {
            return Ok();
        }
    }
}