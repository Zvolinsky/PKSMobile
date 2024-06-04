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
    public class BusRouteDirectionsTest
    {
         private static DbContextOptions<AppDbContext> dbContextOptions = new DbContextOptionsBuilder<AppDbContext>()
            .UseInMemoryDatabase(databaseName: "BusesDbTest")
            .Options;

#pragma warning disable NUnit1032 // An IDisposable field/property should be Disposed in a TearDown method
        private AppDbContext context;
#pragma warning restore NUnit1032 // An IDisposable field/property should be Disposed in a TearDown method
        BusRouteDirectionsService busRouteDirectionsService;
        

        [OneTimeSetUp]
        public void Setup()
        {
            context = new AppDbContext(dbContextOptions);
            context.Database.EnsureCreated();

            SeedDatabase();

            busRouteDirectionsService = new BusRouteDirectionsService(context);
        }

        
        [Test, Order(1)]
        public void GetAllBusRouteDirectionsTest()
        {
            var result = busRouteDirectionsService.GetAllBusRouteDirections();

            Assert.That(result.Count(), Is.EqualTo(3));
            Assert.AreEqual(result.Count, 3);
        }

        [Test, Order(2)]
        public void GetBusRouteDirectionsByBusIdTest()
        {
            var id = 3;
            var result = busRouteDirectionsService.GetBusRouteDirectionsByBusId(id);

            Assert.That(result.Count(), Is.EqualTo(2));
        }

        [Test, Order(3)]
        public void AddBusRouteDirectionTest()
        {
            var newBusRouteDirection = new BusRouteDirectionDTO()
            {
                Name = "G£OGÓW M£P. PÊTLA"
            };

            Assert.That(() => busRouteDirectionsService.AddBusRouteDirection(newBusRouteDirection), Throws.Nothing);
        }

        [OneTimeTearDown]
        public void CleanUp()
        {
            context.Database.EnsureDeleted();
        }

        private void SeedDatabase()
        {
            var busRouteDirections = new List<BusRouteDirection>
            {
                new BusRouteDirection()
                {
                    Id = 1,
                    Name = "KIELANÓWKA PÊTLA",
                    BusId = 1,
                },
                new BusRouteDirection()
                {
                    Id = 2,
                    Name = "STOBIERNA, KRZYWE PÊTLA",
                    BusId = 3,
                },
                new BusRouteDirection()
                {
                    Id = 3,
                    Name = "PALIKÓWKA PÊTLA",
                    BusId = 3,
                },
            };
            context.BusRouteDirections.AddRange(busRouteDirections);
            context.SaveChanges();
        }
        
    }
}