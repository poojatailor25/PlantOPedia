using System.Text.Json.Serialization;

namespace PlantOPedia.Models
{
    [JsonConverter(typeof(JsonStringEnumConverter))]

    public enum RoleType
    {
        Admin=0,
        Customer=1
    }
}
