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

		var rsvpResponseBox = $("#RSVP ul");
		if (model.rsvpStatus == "No") {
			rsvpResponseBox.removeClass("bg-warning");
			rsvpResponseBox.addClass("bg-danger");
			rsvpResponseBox.removeClass("bg-success");
		}
		else if (model.rsvpStatus == "Unknown"){
			rsvpResponseBox.removeClass("bg-danger");
			rsvpResponseBox.addClass("bg-warning");
			rsvpResponseBox.removeClass("bg-success");
		}
		else {
			rsvpResponseBox.removeClass("bg-danger");
			rsvpResponseBox.removeClass("bg-warning");
			rsvpResponseBox.addClass("bg-success");
		}
        
        //initialize dialog
        rsvpDialog.initFromModel(model);
	}	
	
	var initPage = function(guid) {
        //disable buttons until the page is loaded
        $('#openChangeRSVPDialogButton').prop("disabled",true);			
        $('#saveRSVPButton').prop("disabled",true);
			
		//todo get the guid from the URL
		var guestID = utils.getParameterByName("c", null);
		if (guestID == null || guestID == "")
			{
				utils.handleError("Error loading the page.", "Please try clicking the link from the email we sent you.");
				return;
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
				status: rsvpStatus,					
				plusOneName:  $("#plusOneName").val(),
				kidsCount: $("#numberOfKids").val(), 
				guestName: model.guestName,
				id: model.guestID
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


	
