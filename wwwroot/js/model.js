var model = {
    guestID : "",
    guestName : "",
    rsvpStatus : "", //unknown, Yes, YesPlusOne, No
    numberOfKids : 0,
    plusOneName : "",
    getNumberOfKidsDescription: function() {
        var numberOfKidsDescription = "";
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
        return numberOfKidsDescription;s
    },
    getPlusOneDescription: function() {
        var plusOneDescription = "";
        if (this.rsvpStatus == "YesPlusOne")
        {
            if (this.plusOneName != "") {
                plusOneDescription = "You are bringing a guest (" + this.plusOneName + ").";
            }
            else
            {
                plusOneDescription = "You are bringing a guest and you have not told us the name yet.";
            }
        }
        return plusOneDescription;
    },
    getRVPStatusDescription: function() {
        var rsvpStatusDescription = "";		
        switch(this.rsvpStatus) 
        {
            case "Yes": 
            case "YesPlusOne": 
                rsvpStatusDescription= 'Hurray! You have said YES. ';
                break;
            case "No": 
                rsvpStatusDescription= 'You have told us you are not coming.';
                break;
            case "Unknown": 
                rsvpStatusDescription='You have not responded yet!';
                break;
            default:
                handleError("unexpected RSVP value " + this.rsvpStatus);			
        }
        return rsvpStatusDescription;
    },
    initFromDto: function(dto){
        this.rsvpStatus = dto.rsvpStatus;
        this.plusOneName = dto.plusOneName;
        this.numberOfKids = dto.numberOfKids;
        this.guestName = dto.guestName;			
    }
}
