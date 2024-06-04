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
    public class BusStopsServiceTest
    {
        private static DbContextOptions<AppDbContext> dbContextOptions = new DbContextOptionsBuilder<AppDbContext>()
            .UseInMemoryDatabase(databaseName: "BusesDbTest")
            .Options;

#pragma warning disable NUnit1032 // An IDisposable field/property should be Disposed in a TearDown method
        private AppDbContext context;
#pragma warning restore NUnit1032 // An IDisposable field/property should be Disposed in a TearDown method

        BusStopsService busStopsService;


        [OneTimeSetUp]
        public void Setup()
        {
            context = new AppDbContext(dbContextOptions);
            context.Database.EnsureCreated();

            SeedDatabase();

            busStopsService = new BusStopsService(context);
        }

        [Test, Order(1)]
        public void GetAllBusStopsTest()
        {
            var result = busStopsService.GetAllBusStops();

            Assert.That(result.Count(), Is.EqualTo(4));
            Assert.AreEqual(result.Count, 4);
        }

        [Test, Order(2)]
        public void GetBusStopByIdTest()
        {
            var Id = 1;
            var result = busStopsService.GetBusStopById(Id);

            Assert.That(result.Id, Is.EqualTo(1));
        }

        [Test, Order(3)]
        public void AddBusStopTest()
        {
            var newBusStop = new BusStopDTO()
            {
                Name = "RZESZÓW D.A."
            };

            Assert.That(() => busStopsService.AddBusStop(newBusStop), Throws.Nothing);
        }

        [OneTimeTearDown]
        public void CleanUp()
        {
            context.Database.EnsureDeleted();
        }

        private void SeedDatabase()
        {
            var busStops = new List<BusStop>
            {
                new BusStop
                {
                    Id = 1,
                    Name = "JASIONKA, BORG"
                },
                new BusStop
                {
                    Id = 2,
                    Name = "JASIONKA, PORT LOTNICZY"
                },
                new BusStop
                {
                    Id = 3,
                    Name = "JASIONKA, AEROCLUB"
                },
                new BusStop
                {
                    Id = 4,
                    Name = "MEDYNIA ŁAŃCUCKA II"
                },
            };
            context.BusStops.AddRange(busStops);
            context.SaveChanges();
        }
    }
}
