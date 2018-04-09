

var services = function()  {  
    var base_URL = "https://carnieweddingfctns.azurewebsites.net/api/";

    var retrieveRSVPValueForGuestID = function (guestID, callback){
        $.ajax({
            method: "GET",
            url: base_URL + "rsvps/"+ guestID,
            dataType: "json",
            crossDomain: true
        }).success(function(dto) {
            callback(dto);
        }).fail(function( jqXHR, textStatus ){
            utils.handleError(textStatus);
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
            utils.handleError(textStatus);
        });
    };
    return {
        saveRSVP: saveRSVP,
        retrieveRSVPValueForGuestID: retrieveRSVPValueForGuestID
    }
}();