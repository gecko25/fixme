angular.module('fixme').directive('fmSettings', function(pageState){
    return {
        templateUrl: 'app/templates/pages/settings.html',
        restrict: 'E',
        controller: function($scope, $http){
            $scope.data = {
                gender: '',
                age: ''
            }

            $scope.savePatientData = function(){

                $http({
                    method: 'PATCH',
                    url: '/api/user',
                    headers: 'Content-Type: application/json',
                    data: $scope.data
                }).then((response) => {
                    console.log(response);
                }, (response) => {
                    console.log('There was an error!');
                    console.log(response);
                });
            }

        }
    }
})
