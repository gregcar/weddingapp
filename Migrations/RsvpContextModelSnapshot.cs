﻿// <auto-generated />
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage;
using Microsoft.EntityFrameworkCore.Storage.Internal;
using System;
using WeddingApp.Models;

namespace WeddingApp.Migrations
{
    [DbContext(typeof(RsvpContext))]
    partial class RsvpContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "2.0.2-rtm-10011")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("WeddingApp.Models.Rsvp", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<bool>("Attending");

                    b.Property<string>("Email")
                        .IsRequired();

                    b.Property<int>("KidsCount");

                    b.Property<string>("Name")
                        .IsRequired();

                    b.Property<bool>("PlusOne");

                    b.Property<string>("PlusOneName");

                    b.HasKey("Id");

                    b.ToTable("RsvpItems");
                });
#pragma warning restore 612, 618
        }
    }
}
