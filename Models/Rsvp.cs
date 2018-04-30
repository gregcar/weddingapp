using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;

namespace WeddingApp.Models
{
    public class Rsvp {
        private List<Rsvp> _familyMembers = null;

        [Key]
        [Required]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid Id {get;set;}

        [Required]
        public string Name {get;set;}

        [Required]
        public string FullName {get;set;}

        [Required]
        public string Email {get;set;}

        [Required]
        public int StatusId {get;set;}

        [Required]
        public int FamilyId {get;set;}

        [NotMapped]
        [JsonConverter(typeof(StringEnumConverter))]
        public RsvpStatus Status {
            get { return (RsvpStatus)StatusId; }
            set { StatusId = (int)value; }
        }
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
        public List<Rsvp> FamilyMembers
        {
            get {
                return _familyMembers;
            }
            set {
                _familyMembers = value;
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