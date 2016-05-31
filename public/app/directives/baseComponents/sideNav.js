angular.module('fixme').directive('fmSideNav', function($$pageState, $mdSidenav, $$Infermedica){
    return {
        templateUrl: 'app/templates/baseComponents/sideNav.html',
        restrict: 'E',
        controller: function($scope){
            $scope.showContentAndCloseSideNav = function(newPageState){
                if (!$scope.loggedIn){
                    $mdSidenav('left').close();
                    $scope.loginReminder = 'Please login first';
                    $scope.animateShake = "";
                    setTimeout(
                        ()=>{$scope.animateShake = "shake";}
                        ,0
                    );

                }else{

                    if (newPageState === 'symptomPicker'){
                            $scope.possibleDiagnosisExists = false;
                            $scope.selectedSymptoms = [];
                            $$Infermedica.removeAllSymptomsFromDiagnosis();
                    }

                    $mdSidenav('left').close();
                    $$pageState.updatePageStage(newPageState);
                }

            }
        }
    }
})

