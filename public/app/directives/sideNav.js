angular.module('fixme').directive('fmSideNav', function(pageState){
    return {
        templateUrl: 'app/templates/sideNav.html',
        restrict: 'E',
        controller: function($scope){
            $scope.showContent = function(newPageState){
                pageState.updatePageStage(newPageState)
            }
        }
    }
})

