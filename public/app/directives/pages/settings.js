angular.module('fixme').directive('fmSettings', function(pageState, $cookies, $mdToast){
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
                $cookies.putObject($scope.user.email, $scope.data, {path: 'http://localhost:4001/'})

                var toast;
                toast = $mdToast.simple()
                    .textContent('Saved!')
                    .action('DIAGNOSE ME')
                    .highlightAction(true)
                    .position('bottom right')
                    .hideDelay(6000);

                $mdToast.show(toast).then(function(response) {
                    if ( response == 'ok' ) {
                        $scope.showContent('symptomPicker')
                    }
                });
            }
        }
    }
})


/*
 $http({
 method: 'PATCH',
 url: '/api/user',
 headers: 'Content-Type: application/json',
 data: $scope.data
 }).then((response) => {
 console.log(response);
 pageState.updatePageStage('symptomPicker');

 }, (response) => {
 console.log('There was an error!');
 console.log(response);
 });*/