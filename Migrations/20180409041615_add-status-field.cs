using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace WeddingApp.Migrations
{
    public partial class addstatusfield : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Attending",
                table: "RsvpItems");

            migrationBuilder.AddColumn<int>(
                name: "StatusId",
                table: "RsvpItems",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "StatusId",
                table: "RsvpItems");

            migrationBuilder.AddColumn<bool>(
                name: "Attending",
                table: "RsvpItems",
                nullable: false,
                defaultValue: false);
        }
    }
}
