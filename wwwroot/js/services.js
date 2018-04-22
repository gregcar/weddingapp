

var services = function()  {  
    var base_URL = "/api/";

    var retrieveRSVPValueForGuestID = function (guestID, callback){
        $.ajax({
            method: "GET",
            url: base_URL + "rsvps/"+ guestID,
            dataType: "json",
            crossDomain: true
        }).success(function(dto) {
            callback(dto);
        }).fail(function( jqXHR, textStatus ){
            utils.handleError(textStatus, "We could not find your invitation. Please try clicking the link in the email we sent you.");
        })	
    };
    var saveRSVP = function (dto, guestID, callback) {
        $.ajax({
            method: "PUT",
            url: base_URL + "rsvps/"+ guestID,
            contentType: "application/json",
            data : JSON.stringify(dto),
            crossDomain: true
        }).success(function () {
            callback(); 
            
        }).fail(function( jqXHR, textStatus ){
            utils.handleError(textStatus, "Error saving your RSVP. Please try clicking the link from the email we sent you and try again.");
        });
    };
    return {
        saveRSVP: saveRSVP,
        retrieveRSVPValueForGuestID: retrieveRSVPValueForGuestID
    }
}();