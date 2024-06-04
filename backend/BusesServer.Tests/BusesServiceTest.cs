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
    public class BusesServiceTest
    {
         private static DbContextOptions<AppDbContext> dbContextOptions = new DbContextOptionsBuilder<AppDbContext>()
            .UseInMemoryDatabase(databaseName: "BusesDbTest")
            .Options;

#pragma warning disable NUnit1032 // An IDisposable field/property should be Disposed in a TearDown method
        private AppDbContext context;
#pragma warning restore NUnit1032 // An IDisposable field/property should be Disposed in a TearDown method
        BusesService busesService;
        

        [OneTimeSetUp]
        public void Setup()
        {
            context = new AppDbContext(dbContextOptions);
            context.Database.EnsureCreated();

            SeedDatabase();

            busesService = new BusesService(context);
        }

        
        [Test, Order(1)]
        public void GetAllBusesTest()
        {
            var result = busesService.GetAllBuses();

            Assert.That(result.Count(), Is.EqualTo(4));
            Assert.AreEqual(result.Count, 4);
        }

        [Test, Order(2)]
        public void GetBusByIdTest()
        {
            var id = 1;
            var result = busesService.GetBusById(id);

            Assert.That(result.Id, Is.EqualTo(id));
            Assert.That(result.Number, Is.EqualTo("420"));
        }

        [Test, Order(3)]
        public void AddBusTest()
        {
            var newBus = new BusDTO()
            {
                Number = "34"
            };

            Assert.That(() => busesService.AddBus(newBus), Throws.Nothing);
        }

        [OneTimeTearDown]
        public void CleanUp()
        {
            context.Database.EnsureDeleted();
        }

        private void SeedDatabase()
        {
            var buses = new List<Bus>
            {
                new Bus
                {
                    Id = 1,
                    Number = "420"
                },
                new Bus
                {
                    Id = 2,
                    Number = "69"
                },
                new Bus
                {
                    Id = 3,
                    Number = "421"
                },
                new Bus
                {
                    Id = 4,
                    Number = "68"
                },
            };
            context.Buses.AddRange(buses);
            context.SaveChanges();
        }
        
    }
}