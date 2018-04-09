$(document).ready(function(){
	

    var updateMainView = function (model) {
        //set guest name
        $("#guestName").html(model.guestName);
        
        //enable buttons
        $('#openChangeRSVPDialogButton').prop("disabled",false);			
        $('#saveRSVPButton').prop("disabled",false); 
    
        //set rsvp descriptions
        $('#plusOneDescription').html(model.getPlusOneDescription());
		$('#rsvpStatusDescription').html(model.getRVPStatusDescription());
        $('#numberOfKidsDescription').html(model.getNumberOfKidsDescription());
        
        //initialize dialog
        rsvpDialog.initFromModel(model);
	}	
	
	var initPage = function(guid) {
        //disable buttons until the page is loaded
        $('#openChangeRSVPDialogButton').prop("disabled",true);			
        $('#saveRSVPButton').prop("disabled",true);
			
		//todo get the guid from the URL
		var guestID = 123;
		if (guestID == "")
			{
				utils.handleError("Guest ID is empty");
			}
		//get the rsvp value for the guest and update the page
		services.retrieveRSVPValueForGuestID(guestID, function(dto) {
            //initialize the model
            model.initFromDto(dto);
            //initialize the page
            updateMainView(model);
		});

		//hook in the button that saves the page state
		$("#saveRSVPButton").click(function() {
			var rsvpStatus =  $("input[name='rsvp-value']:checked"). val();
			if (rsvpStatus == undefined){
				alert ("Please select Yes or No, then click save RSVP.");
				return; 
			}
						
			var dto = {
				rsvpStatus: rsvpStatus,
				plusOneName:  $("#plusOneName").val(),
				numberOfKids: $("#numberOfKids").val(),
				guestName: model.guestName,
			}
				
			services.saveRSVP(dto, guestID, function(){
				model.initFromDto(dto);
                updateMainView(model);
            });
            
            rsvpDialog.closeDialog();

		});

	}
	initPage();

});
	
