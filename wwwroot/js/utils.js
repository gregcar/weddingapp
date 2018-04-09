var utils = function() {
        var handleError = function (error) {
        if (console && console.log) 
        {
            console.log(error);
            alert(error);
        }
    }
    return {
        handleError: handleError
    }
}();
