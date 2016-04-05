angular.module('fixme').directive('fmSideNav', function(){
    return {
        templateUrl: 'app/templates/sideNav.html',
        restrict: 'E',
        controller: function($scope){
            /*$scope.$watch(
                function() {
                    return userProfile.getUser();
                },
                function(newUser, oldUser){
                    console.log('newUser:')
                    console.log(newUser);
                    $scope.user = newUser;

                    console.log('oldUser:')
                    console.log(oldUser);
                }
            );*/
        }
    }
})

