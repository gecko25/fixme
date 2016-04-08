angular.module('fixme').factory('pageState', function(){
    var _showPage = {
        symptomPicker : false,
        findDoctor: false,
        settings: true,
    }
    return{
        getPageState : function(){
            return _showPage;
        },
        updatePageStage : function(newPageState){
            for (var page in _showPage){
                if (page === newPageState)
                    _showPage[page] = true;
                else
                    _showPage[page] = false;
            }
        }
    }
});