using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ZwajApp.API.Migrations
{
    /// <inheritdoc />
    public partial class fixIntroductioncolum : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Inroduction",
                table: "Users",
                newName: "Introduction");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Introduction",
                table: "Users",
                newName: "Inroduction");
        }
    }
}
