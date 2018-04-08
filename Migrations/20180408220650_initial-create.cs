using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace WeddingApp.Migrations
{
    public partial class initialcreate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "RsvpItems",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Attending = table.Column<bool>(nullable: false),
                    Email = table.Column<string>(nullable: false),
                    KidsCount = table.Column<int>(nullable: false),
                    Name = table.Column<string>(nullable: false),
                    PlusOne = table.Column<bool>(nullable: false),
                    PlusOneName = table.Column<string>(nullable: true),
                    UniqueId = table.Column<Guid>(nullable: false)
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
