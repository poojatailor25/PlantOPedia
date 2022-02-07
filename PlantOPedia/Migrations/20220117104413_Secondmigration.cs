using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PlantOPedia.Migrations
{
    public partial class Secondmigration : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "DateTime",
                table: "Orders",
                newName: "OrderDate");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "OrderDate",
                table: "Orders",
                newName: "DateTime");
        }
    }
}
