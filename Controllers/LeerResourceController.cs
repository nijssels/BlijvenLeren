using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;

namespace BlijvenLeren.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class LeerResourceController : ControllerBase
    {
        private static ConcurrentDictionary<int, LeerResource> InMemoryLeerResources =
            new ConcurrentDictionary<int, LeerResource>(new Dictionary<int, LeerResource> {
                {1, new LeerResource(1, "Naam1", "Omschrijving1") },
                {2, new LeerResource(2, "Naam2", "Omschrijving2") },
                {3, new LeerResource(3, "Naam3", "Omschrijving3") },
                {4, new LeerResource(4, "Naam4", "Omschrijving4") },
                {5, new LeerResource(5, "Naam5", "Omschrijving5") }
            });

        private readonly ILogger<LeerResourceController> _logger;
        public LeerResourceController(ILogger<LeerResourceController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        public IEnumerable<LeerResource> Get()
        {
            return InMemoryLeerResources.Values;
        }

        [HttpPut]
        public LeerResource Put(LeerResource leerResource)
        {
            if(leerResource.Id.HasValue)
            {
                InMemoryLeerResources[leerResource.Id.Value] = leerResource;
            }
            else
            {
                int newId = InMemoryLeerResources.Keys.Max() + 1;
                leerResource.Id = newId;
                InMemoryLeerResources[newId] = leerResource;
            }

            return leerResource;
        }

        [HttpDelete]
        public void Delete(LeerResource leerResource)
        {
            InMemoryLeerResources.Remove(leerResource.Id.Value, out _);
        }
    }
}
