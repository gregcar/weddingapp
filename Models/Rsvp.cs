using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;

namespace WeddingApp.Models
{

    public class Rsvp {
        [Key]
        [Required]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid Id {get;set;}

        [Required]
        public string Name {get;set;}

        [Required]
        public string Email {get;set;}

        [Required]
        public int StatusId {get;set;}

        [NotMapped]
        [JsonConverter(typeof(StringEnumConverter))]
        public RsvpStatus Status {
            get { return (RsvpStatus)StatusId; }
            set { StatusId = (int)value; }
        }

        public bool PlusOne {get;set;}

        public string PlusOneName {get;set;}

        public int KidsCount {get;set;}

        public DateTime InsertDate {get; set;}
        public DateTime UpdateDate {get; set;}

        [NotMapped]
        public bool Attending 
        {
            get {
                if (Status == RsvpStatus.Yes || Status == RsvpStatus.YesPlusOne)
                    return true;

                return false;
            }
        }

        [NotMapped]
        public int AdultsCount
        {
            get {
                if (Attending)
                {
                    return PlusOne ? 2 : 1;
                }

                return 0;
            }
        }

        public int TotalAttending 
        {
            get 
            {
                if (Attending)
                {
                    var total = 1 + KidsCount;

                    if (PlusOne)
                        total += 1;

                    return total;
                }

                return 0;
            }
        }
    }

    public enum RsvpStatus {
        
        Yes = 1,
        No = 3,
        YesPlusOne = 2,
        Unknown = 0
    } 
}