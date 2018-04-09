
var rsvpDialog = function() { 

	var initFromModel= function (model) {
		if (model.rsvpStatus != "Unknown" )
		{	
			switch (model.rsvpStatus)
			{
				case "Yes": 
					$("#rsvpValueYes").attr("checked","");
					break;
				case "YesPlusOne": 
					$("rsvpValueYesPlusOne").attr("checked","");
					break;
				case "No": 
					$("rsvpValueNo").attr("checked","");
					break;
			}
		}
		$("#numberOfKids").val(model.numberOfKids);
		$("#plusOneName").val(model.plusOneName);		 
	};	


	var closeDialog= function(){
		$('#rsvpUdateDialog').modal("hide");
	};
	
	return {
		closeDialog: closeDialog,
		initFromModel: initFromModel
	};
}();
