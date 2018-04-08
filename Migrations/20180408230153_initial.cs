using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace WeddingApp.Migrations
{
    public partial class initial : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "RsvpItems",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false, defaultValueSql:"newid()"),
                    Attending = table.Column<bool>(nullable: false, defaultValue:0),
                    Email = table.Column<string>(nullable: false),
                    KidsCount = table.Column<int>(nullable: false, defaultValue:0),
                    Name = table.Column<string>(nullable: false),
                    PlusOne = table.Column<bool>(nullable: false, defaultValue:0),
                    PlusOneName = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RsvpItems", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "RsvpItems");
        }
    }
}
