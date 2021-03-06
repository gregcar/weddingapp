
var rsvpDialog = function() { 

	var initFromModel= function (model) {
		if (model.rsvpStatus != "Unknown" )
		{
			$("#rsvpValue"+model.rsvpStatus).prop("checked",true);
		}

		
		$("#numberOfKids").val(model.numberOfKids);
		$("[name=guestName]").html(model.guestName);

		if (model.familyMemberName !="") {  
			$("[name=familyMemberName]").html(model.familyMemberName);
			$("#rsvpValueYesPlusOne").parent().hide(); 
			$("#plusOneGroup").hide();
		} else {
			$("#plusOneName").val(model.plusOneName);	
			$("#rsvpValueFamilyMemberYesOnly").parent().hide();
			$("#rsvpValueBothYes").parent().hide(); 
			
		}
		resetEnabledInputs();	 
	};	


	var closeDialog= function(){
		$('#rsvpUdateDialog').modal("hide");
	};

	var resetEnabledInputs = function()
	{ 
		var value = $("input[name='rsvp-value']:checked").val();
		if (value == "No") {
			$("#plusOneName" ).prop( "disabled", true );
			$("#plusOneName").val("");

			$("#numberOfKids").prop( "disabled", true );
			$("#numberOfKids").val("0");
		}
		else if (value == "GuestYesOnly") {
			$("#numberOfKids").prop( "disabled", false );

			$("#plusOneName" ).prop( "disabled", true );
			$("#plusOneName").val("");
		}
		else { //yes plus one
			$("#plusOneName" ).prop( "disabled", false );
			$("#numberOfKids").prop( "disabled", false );
		}
	};
		
	$("[name=rsvp-value]").change(resetEnabledInputs);


	return {
		closeDialog: closeDialog,
		initFromModel: initFromModel
	};
}();
