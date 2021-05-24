using EindProjectCloudApi.Database;
using EindProjectCloudApi.Models;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;

namespace EindProjectCloudApi.Controllers
{

    [Route("api/v1/Round")]
    [ApiController]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public class RoundController : ControllerBase
    {
        private readonly BalisticsContext context;

        public RoundController(BalisticsContext context)
        {
            this.context = context;
        }

        [HttpGet] //api/v1/Round 
        public List<Round> GetAllRounds([FromQuery]string name, string sort, string dir = "asc")
        {
            IQueryable<Round> q = context.Rounds;
            if (name != null)
            {
                q = q.Where(q => name == q.Name);
            }
            if (!string.IsNullOrWhiteSpace(sort))
            {
                switch (sort)
                {
                    case "name":
                        if (dir == "asc")
                        {
                            q = q.OrderBy(n => n.Name);
                        }
                        else if (dir == "desc")
                        {
                            q = q.OrderByDescending(n => n.Name);
                        }
                        break;
                }
            }
            return q
                .Include(c => c.Caliber)
                .ToList();
        }

        [HttpPost]
        public IActionResult CreateRound([FromBody] Round newRound)
        {
            context.Rounds.Add(newRound);
            context.SaveChanges();
            return Created("", newRound);
        }

        [Route("{Id}")] //api/v1/Round/2
        [HttpGet]
        public IActionResult GetRound(int id)
        {
            var Round = context.Rounds
                .Include(i => i.Caliber)
                .FirstOrDefault(x => x.Id == id);
            if (Round == null)
            {
                return NotFound();
            }
            return Ok(Round);
        }
        [Route("{Id}")]
        [HttpDelete]
        public IActionResult DeletRound(int id)
        {
            var Round = context.Rounds.Find(id);
            if (Round == null)
            {
                return NotFound();
            }
            context.Rounds.Remove(Round);
            context.SaveChanges();
            return NoContent();
        }
        [HttpPut]
        public IActionResult UpdateRound([FromBody] Round updateRound)
        {
            var orgRound = context.Rounds.Find(updateRound.Id);
            if (orgRound == null)
            {
                return NotFound();
            }
            orgRound.Name = updateRound.Name;
            orgRound.Damage = updateRound.Damage;
            orgRound.PenPower = updateRound.PenPower;
            orgRound.ArmorDamage = updateRound.ArmorDamage;
            orgRound.Accuracy = updateRound.Accuracy;
            orgRound.FragChance = updateRound.FragChance;
            orgRound.Caliber = updateRound.Caliber;
            context.SaveChanges();
            return Ok(orgRound);
        }
    }

}
