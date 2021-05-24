using EindProjectCloudApi.Database;
using EindProjectCloudApi.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;

namespace EindProjectCloudApi.Controllers
{
    [Route("api/v1/Caliber")]
    [ApiController]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public class CaliberController : ControllerBase
    {
        private readonly BalisticsContext context;

        public CaliberController(BalisticsContext context)
        {
            this.context = context;
        }

        [HttpGet] //api/v1/caliber
        public List<Caliber> GetAllCalibers(int? page, int length = 21)
        {
            IQueryable<Caliber> q = context.Calibers;
            if (page.HasValue)
            {
                q = q.Skip(page.Value * length);
                
            }
            q = q.Take(length);
            return q.ToList();
        }

        [HttpPost] 
        public IActionResult CreateCaliber([FromBody] Caliber newCaliber)
        {
            context.Calibers.Add(newCaliber);
            context.SaveChanges();
            return Created("", newCaliber);
        }

        [Route("{Id}")] //api/v1/caliber/2
        [HttpGet]
        public IActionResult GetCaliber(int id)
        {
            var caliber = context.Calibers.Find(id);
            if (caliber == null)
            {
                return NotFound();
            }
            return Ok(caliber);
        }
        [Route("{Id}")] 
        [HttpDelete]
        public IActionResult DeletCaliber(int id)
        {
            var caliber = context.Calibers.Find(id);
            if (caliber == null)
            {
                return NotFound();
            }
            context.Calibers.Remove(caliber);
            context.SaveChanges();
            return NoContent();
        }
        [HttpPut]
        public IActionResult UpdateCaliber([FromBody] Caliber updateCaliber)
        {
            var orgCaliber = context.Calibers.Find(updateCaliber.Id);
            if (orgCaliber == null)
            {
                return NotFound();
            }
            orgCaliber.Name = updateCaliber.Name;
            context.SaveChanges();
            return Ok(orgCaliber);
        }
    }
}
