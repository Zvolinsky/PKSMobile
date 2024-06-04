using BusesServer.Data;
using BusesServer.Data.Models;
using BusesServer.Data.Services;
using BusesServer.DTOs;
using Microsoft.EntityFrameworkCore;
using NUnit.Framework;
using System;
using System.Collections.Generic;

namespace BusesServer.Tests
{
    public class DeparturesServiceTest
    {
         private static DbContextOptions<AppDbContext> dbContextOptions = new DbContextOptionsBuilder<AppDbContext>()
            .UseInMemoryDatabase(databaseName: "BusesDbTest")
            .Options;

#pragma warning disable NUnit1032 // An IDisposable field/property should be Disposed in a TearDown method
        private AppDbContext context;
#pragma warning restore NUnit1032 // An IDisposable field/property should be Disposed in a TearDown method
        DeparturesService departuresService;
        

        [OneTimeSetUp]
        public void Setup()
        {
            context = new AppDbContext(dbContextOptions);
            context.Database.EnsureCreated();

            SeedDatabase();

            departuresService = new DeparturesService(context);
        }

        
        [Test, Order(1)]
        public void GetDeparturesTest()
        {
            var result = departuresService.GetDepartures(1, 3, 3, 2, 69, true, true, false);

            Assert.That(result.Count(), Is.EqualTo(0));
        }

        [Test, Order(2)]
        public void GetBusByIdTest()
        {
            var id = 1;
            var result = departuresService.GetDepartureById(id);

            Assert.That(result.Id, Is.EqualTo(id));
        }

        [Test, Order(3)]
        public void AddDepartureTest()
        {
            var newDeparture = new DepartureDTO()
            {
                Hour = 12,
                Minute = 24,
                BusRouteId = 1,
                BusId = 1,
                BusStopId = 4
            };

            Assert.That(() => departuresService.AddDeparture(newDeparture), Throws.Nothing);
        }

        [OneTimeTearDown]
        public void CleanUp()
        {
            context.Database.EnsureDeleted();
        }

        private void SeedDatabase()
        {
            var departures = new List<Departure>
            {
                new Departure
                {
                    Hour = 12,
                    Minute= 24,
                    BusRouteId = 1,
                    BusId = 1,
                    BusStopId = 4
                },
                new Departure
                {
                    Hour = 14,
                    Minute= 12,
                    BusRouteId = 4,
                    BusId = 1,
                    BusStopId = 6
                },
                new Departure
                {
                    Hour = 16,
                    Minute= 23,
                    BusRouteId = 2,
                    BusId = 1,
                    BusStopId = 8
                },
            };
            context.Departures.AddRange(departures);
            context.SaveChanges();
        }
        
    }
}