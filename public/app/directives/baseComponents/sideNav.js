angular.module('fixme').directive('fmSideNav', function(pageState, $mdSidenav){
    return {
        templateUrl: 'app/templates/baseComponents/sideNav.html',
        restrict: 'E',
        controller: function($scope){
            $scope.showContentAndCloseSideNav = function(newPageState){
                if (!$scope.loggedIn){
                    $scope.loginReminder = 'Please login first';
                    $scope.animate = "";
                    setTimeout(
                        ()=>{$scope.animate = "shake";}
                        ,0
                    );

                }else{
                    $mdSidenav('left').close();
                    pageState.updatePageStage(newPageState);
                }

            }
        }
    }
})

