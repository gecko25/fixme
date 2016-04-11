angular.module('fixme').directive('fmToolbarHeader', function(){
    return {
        templateUrl: 'app/templates/baseComponents/toolbarHeader.html',
        restrict: 'E',
        controller: function($scope, $mdSidenav){

            $scope.signOut = function(){
                var auth2 = gapi.auth2.getAuthInstance();
                auth2.signOut().then(function () {
                    console.log('User signed out.');
                    $scope.user = {};
                    $scope.loggedIn = false;
                    $scope.$apply();
                });
            }

            $scope.toggleSideNav = function(){
                $mdSidenav('left').toggle();
            }
        }
    }
}) 