using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

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

        public Boolean Attending {get;set;}

        public Boolean PlusOne {get;set;}

        public string PlusOneName {get;set;}

        public int KidsCount {get;set;}

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
}