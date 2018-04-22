
var rsvpDialog = function() { 

	var initFromModel= function (model) {
		if (model.rsvpStatus != "Unknown" )
		{	
			$("#rsvpValue"+model.rsvpStatus).prop("checked",true);
		}
		$("#numberOfKids").val(model.numberOfKids);
		$("#plusOneName").val(model.plusOneName);	
		resetEnabledInputs();	 
	};	


	var closeDialog= function(){
		$('#rsvpUdateDialog').modal("hide");
	};

	var resetEnabledInputs = function()
	{
		var value = $("[name=rsvp-value]:checked").val();
		if (value == "No") {
			$("#plusOneName" ).prop( "disabled", true );
			$("#plusOneName").val("");

			$("#numberOfKids").prop( "disabled", true );
			$("#numberOfKids").val("0");
		}
		else if (value == "Yes") {
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
