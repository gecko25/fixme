angular.module('fixme').factory('loadIntermedicaData', function($http){
    return{
        symptoms : function(){
            //console.log('Going to load symptom data from Intermedica...')
            return $http({
                method: 'GET',
                url: '/api/symptoms'
            });
        },
        lab_tests: function(){
            return $http({
                method: 'GET',
                url: '/api/lab_tests'
            });
        },
        conditions: function(){
            return $http({
                method: 'GET',
                url: '/api/conditions'
            });
        },

    }
});
