angular.module('fixme').directive('fmSymptomPicker', function($http){
    return {
        templateUrl: 'app/templates/symptomPicker.html',
        restrict: 'E',
        controller: function($scope){
            $scope.symptoms = [];
            $http({
                method: 'GET',
                url: '/api/symptoms'
            }).then((response) => {
                $scope.symptoms = response.data;
                console.log($scope.symptoms);
            }, (response) => {
                console.log('There was an error!');
                console.log(response);
            });

        }
    }
})