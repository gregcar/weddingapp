using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace WeddingApp.Migrations
{
    public partial class dbidtracking : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_RsvpItems",
                table: "RsvpItems");

            migrationBuilder.AddColumn<int>(
                name: "InternalId",
                table: "RsvpItems",
                nullable: false,
                defaultValue: 0)
                .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            migrationBuilder.AddColumn<byte[]>(
                name: "RowVersion",
                table: "RsvpItems",
                rowVersion: true,
                nullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_RsvpItems",
                table: "RsvpItems",
                column: "InternalId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_RsvpItems",
                table: "RsvpItems");

            migrationBuilder.DropColumn(
                name: "InternalId",
                table: "RsvpItems");

            migrationBuilder.DropColumn(
                name: "RowVersion",
                table: "RsvpItems");

            migrationBuilder.AddPrimaryKey(
                name: "PK_RsvpItems",
                table: "RsvpItems",
                column: "Id");
        }
    }
}
