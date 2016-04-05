angular.module('fixme').directive('fmToolbarHeader', function(){
    return {
        templateUrl: 'app/templates/toolbarHeader.html',
        restrict: 'E',
        controller: function($scope, $mdSidenav){

            
            $scope.toggleSideNav = function(){
                $mdSidenav('left').toggle();
            }
        }
    }
}) 