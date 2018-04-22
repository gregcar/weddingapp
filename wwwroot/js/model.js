var model = {
    guestID : "",
    guestName : "",
    rsvpStatus : "", //unknown, Yes, YesPlusOne, No
    numberOfKids : 0,
    plusOneName : "",
    getNumberOfKidsDescription: function() {
        var numberOfKidsDescription = "~~";
        if (this.rsvpStatus == "Yes" || this.rsvpStatus == "YesPlusOne")
        {
            if (this.numberOfKids == 1) {
                numberOfKidsDescription = "You are bringing ONE kid.";
            }
            else if(this.numberOfKids > 1){
                numberOfKidsDescription = "You are bringing "+ this.numberOfKids +" kids.";
            } 
            else
            {
                numberOfKidsDescription = "You are not bringing any kids.";
            }
        }
        return numberOfKidsDescription;
    },
    getPlusOneDescription: function() {
        var plusOneDescription = "~~";
        if (this.rsvpStatus == "YesPlusOne")
        {
            if (this.plusOneName != "") {
                plusOneDescription = "You are bringing a precious guest (" + this.plusOneName + ").";
            }
            else
            {
                plusOneDescription = "You are bringing a guest but you have not told us the name yet.";
            }
        }
        return plusOneDescription;
    },
    getRVPStatusDescription: function() {
        var rsvpStatusDescription = "~~";		
        switch(this.rsvpStatus) 
        {
            case "Yes": 
            case "YesPlusOne": 
                rsvpStatusDescription= 'Hurray! You have said YES. ';
                break;
            case "No": 
                rsvpStatusDescription= 'Boooo.... You are not coming! :(';
                break;
            case "Unknown": 
                rsvpStatusDescription='Not responded yet!! Seriously! Are you coming?';
                break;
            default:
                utils.handleError("unexpected RSVP value " + this.rsvpStatus);			
        }
        return rsvpStatusDescription;
    },
    initFromDto: function(dto){
        this.guestID = dto.id;
        this.rsvpStatus = dto.status;
        this.plusOneName = dto.plusOneName;
        this.numberOfKids = dto.kidsCount;
        this.guestName = dto.name;			
    }
}
