using System.Text.Json.Serialization;

namespace PlantOPedia.Models
{
    [JsonConverter(typeof(JsonStringEnumConverter))]

    public enum OrderStatus
    {
        Neworder = 0,
        Outfordelievery = 1,
          Delievered=2,
            cancelled=3
    }
}
