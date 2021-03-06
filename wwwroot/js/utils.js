var utils = function() {
    var handleError = function (error, description) {
        if (description == null || description==undefined)
        {
            description = "";
        }
        if (console && console.log) 
        {
            console.log(error);
            $("#errorModal p.errorSummary").html(error);
            $("#errorModal p.errorDescription").html(description);
            $("#errorModal").modal();
        }
    }


    var getParameterByName = function(name, url) {
        if (!url) url = window.location.href;
        name = name.replace(/[\[\]]/g, "\\$&");
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, " "));
    }
    return {
        handleError: handleError,
        getParameterByName: getParameterByName
    }
}();
