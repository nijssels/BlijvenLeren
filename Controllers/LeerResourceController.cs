using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Collections.Generic;

namespace BlijvenLeren.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class LeerResourceController : ControllerBase
    {
        private readonly ILogger<LeerResourceController> _logger;
        public LeerResourceController(ILogger<LeerResourceController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        public IEnumerable<LeerResource> Get()
        {
            return new List<LeerResource>() {
                new LeerResource(1, "Naam1", "Omschrijving1"),
                new LeerResource(2, "Naam2", "Omschrijving2"),
                new LeerResource(3, "Naam3", "Omschrijving3"),
                new LeerResource(4, "Naam4", "Omschrijving4"),
                new LeerResource(5, "Naam5", "Omschrijving5")
            };
        }
    }
}
