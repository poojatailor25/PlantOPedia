using System.Text.Json.Serialization;

namespace PlantOPedia.Models
{
    [JsonConverter(typeof(JsonStringEnumConverter))]

    public enum CategoryType
    {
        Seeds=0,
        Plants=1,
        Flowers=2
    }
}
