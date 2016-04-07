angular.module('fixme').directive('fmSideNav', function(pageState){
    return {
        templateUrl: 'app/templates/sideNav.html',
        restrict: 'E',
        controller: function($scope){
            $scope.showContent = function(newPageState){
                if (!$scope.loggedIn){
                    $scope.loginReminder = 'Please login first';
                    $scope.animate = "";
                    setTimeout(
                        ()=>{$scope.animate = "shake";}
                        ,0
                    );

                }else{
                    pageState.updatePageStage(newPageState);
                }

            }
        }
    }
})

