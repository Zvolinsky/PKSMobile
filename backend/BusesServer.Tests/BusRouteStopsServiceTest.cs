using BusesServer.Data;
using BusesServer.Data.Models;
using BusesServer.Data.Services;
using BusesServer.DTOs;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json.Bson;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusesServer.Tests
{
    public class BusRouteStopsServiceTest
    {
        private static DbContextOptions<AppDbContext> dbContextOptions = new DbContextOptionsBuilder<AppDbContext>()
            .UseInMemoryDatabase(databaseName: "BusesDbTest")
            .Options;

#pragma warning disable NUnit1032 // An IDisposable field/property should be Disposed in a TearDown method
        private AppDbContext context;
#pragma warning restore NUnit1032 // An IDisposable field/property should be Disposed in a TearDown method

        BusRouteStopsService busRouteStopsService;


        [OneTimeSetUp]
        public void Setup()
        {
            context = new AppDbContext(dbContextOptions);
            context.Database.EnsureCreated();

            SeedDatabase();

            busRouteStopsService = new BusRouteStopsService(context);
        }

        [Test, Order(1)]
        public void GetBusRouteStopsTest1()
        {
            var busRouteDirectionId = 1;
            var result = busRouteStopsService.GetBusRouteStops(busRouteDirectionId);

            Assert.That(result.Count(), Is.EqualTo(3));
            Assert.AreEqual(result.Count, 3);
        }

        [Test, Order(2)]
        public void GetBusRouteStopsTest2()
        {
            var busRouteDirectionId = 2;
            var result = busRouteStopsService.GetBusRouteStops(busRouteDirectionId);

            Assert.That(result.Count, Is.EqualTo(0));
        }

        [Test, Order(3)]
        public void AddBusRouteStopTest()
        {
            var newBusRouteStop = new BusRouteStopDTO()
            {
                BusStopId = 1,
                BusRouteDirectionId = 1,
                Order = 1
            };

            Assert.That(() => busRouteStopsService.AddBusRouteStop(newBusRouteStop), Throws.Nothing);
        }

        [OneTimeTearDown]
        public void CleanUp()
        {
            context.Database.EnsureDeleted();
        }

        private void SeedDatabase()
        {
            var busRouteStops = new List<BusRouteStop>
            {
                new BusRouteStop
                {
                    Id = 1,
                    BusStopId = 1,
                BusRouteDirectionId = 1,
                Order = 1
                },
                new BusRouteStop
                {
                    Id = 2,
                    BusStopId = 1,
                BusRouteDirectionId = 1,
                Order = 2
                },
                new BusRouteStop
                {
                    Id = 3,
                    BusStopId = 1,
                BusRouteDirectionId = 1,
                Order = 3
                },
            };
            context.BusRouteStops.AddRange(busRouteStops);
            context.SaveChanges();
        }
    }
}
