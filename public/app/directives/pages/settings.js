angular.module('fixme').directive('fmSettings', function($cookies, $mdToast){
    return {
        templateUrl: 'app/templates/pages/settings.html',
        restrict: 'E',
        controller: function($scope, observeOnScope, $http){
            var patientInfoCookie =  {};
            var dataFromCookiesExist = false;

            $scope.data = {};

            //Listening for user to login, eventually this needs to be accomplished in a database
            observeOnScope($scope, 'user').subscribe( (change)=>{
                if (change.newValue){
                    $scope.user = change.newValue;

                    patientInfoCookie = $cookies.getObject($scope.user.email);
                    dataFromCookiesExist = _.isEmpty(patientInfoCookie) === false;

                    //if we have new user data, we need to check if cookies exists for their settings
                    $scope.data = {
                        gender: dataFromCookiesExist ? patientInfoCookie.gender : '',
                        age: dataFromCookiesExist ? patientInfoCookie.age : '',
                        
                    }
                }
            });

            $scope.savePatientData = function(){
                $cookies.putObject($scope.user.email, $scope.data)
                $scope.validationErrorAgeGender = false;

                var toast;
                toast = $mdToast.simple()
                    .textContent('Success! Go to DIAGNOSE ME page to begin')
                    .action('DIAGNOSE ME!')
                    .highlightAction(true)
                    .position('bottom right')
                    .hideDelay(60000);

                $mdToast.show(toast).then(function(response) {
                    if ( response == 'ok' ) {
                        $scope.showContent('symptomPicker')
                    }
                });
            }
            
            
            var validateAgeIsAReasonableNumber = function validateAgeIsAReasonableNumber(age){
                
            };
        }
    }
})