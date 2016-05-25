angular.module('fixme').factory('$$infermedicaEndpoints', function($http){
    return{
        symptoms : function(){
            return $http({
                method: 'GET',
                url: '/api/symptoms'
            });
        },
        search_phrase: function(text){
            return $http({
                method: 'GET',
                url: '/api/search/' + text
            });
        },
        diagnosis: function(Diagnosis){
            return $http({
                method: 'POST',
                url: '/api/diagnosis',
                data: Diagnosis
            })
        }

    }
});
