var model = {

    guestName : "",
    rsvpStatus : "", //unknown, YesPlusOne, No, BothYes, GuestYesOnly, FamilyMemberYesOnly
    numberOfKids : 0,
    plusOneName : "",
    guestID : "",
    familyMemberID : "",
    familyMemberName : "",
    familyMemberRSVPStatus : "",
    
    getNumberOfKidsDescription: function() {
        var numberOfKidsDescription = "~~";
        if (this.rsvpStatus != "Unkown" && this.rsvpStatus != "No")
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
            //unknown, YesPlusOne, No, BothYes, GuestYesOnly, FamilyMemberYesOnly
            case "BothYes": 
            case "YesPlusOne": 
                rsvpStatusDescription= 'Hurray! You have said YES. ';
                break;
            case "GuestYesOnly": 
                rsvpStatusDescription= this.familyMemberName==""?'Hurray! You have said YES. ':this.guestName + " is coming, but " + this.familyMemberName + " cannot make it.";
                break;
            case "FamilyMemberYesOnly": 
                rsvpStatusDescription= this.familyMemberName + " is coming, but " + this.guestName + " cannot make it.";
                break;
            case "No": 
                rsvpStatusDescription= 'Boooo.... You are not coming! :(';
                break;
            case "Unknown": 
                rsvpStatusDescription='Not responded yet!! Seriously! Are you coming?';
                break;
            default:
                utils.handleError("unexpected RSVP value " + this.rsvpStatus, "Something is wrong please email us.");			
        }
        return rsvpStatusDescription;
    },
    initFromDto: function(dto){
        this.guestID = dto.id;
        this.plusOneName = dto.plusOneName;
        this.numberOfKids = dto.kidsCount;
        this.guestName = dto.name;
        if (dto.familyMembers != null) {
            this.familyMemberID = dto.familyMembers[0].id;
            this.familyMemberName = dto.familyMembers[0].name
        }

        switch (dto.status)
		{	
			case "Yes": 
                if (dto.familyMembers != null) {
                    this.rsvpStatus = (dto.familyMembers[0].status=="Yes") ? "BothYes" : "GuestYesOnly";
                }
                else {
                    this.rsvpStatus = "GuestYesOnly";
                }
                break;
            case "No": 
                if (dto.familyMembers != null) {
                    this.rsvpStatus = (dto.familyMembers[0].status=="Yes") ? "FamilyMemberYesOnly" : "No";
                } 
                else {
                    this.rsvpStatus = dto.status;
                }
				break;                
			case "YesPlusOne": 
                this.rsvpStatus = dto.status; 
                break;
            case "Unknown": 
                this.rsvpStatus = dto.status; 
                break;
            default:
                utils.handleError("Something went wrong. RSVP status: (" + dto.status + ") is not recognized. Please call us.");
        }
    }
}
