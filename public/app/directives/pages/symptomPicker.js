angular.module('fixme').directive('fmSymptomPicker', function($$infermedicaEndpoints){
    return {
        templateUrl: 'app/templates/pages/symptomPicker.html',
        restrict: 'E',
        controller: function($scope, $q, $http, $cookies, $timeout, $$Infermedica, $$pageState){
            //on page startup, get data
            $$infermedicaEndpoints.symptoms()
                .then(
                    (response) => {
                         $scope.symptoms = response.data;
                         console.log('Loaded symptom data from intermedica')
                        console.log($scope.symptoms);
                },  (response) => {
                         console.log('There was an error!' + response);
                });

            $scope.selectedSymptoms = [];

            //function called when text changes in autocomplete
            //TODO: if it doesn't exist, allow user to search

            $scope.searchSymptoms = function(searchText){
                return $$Infermedica.searchIntermedicaData($scope.symptoms, searchText)
                    .then( items => {
                        return items
                    }, err => {
                        console.log('There was an error searching for data: ' + err)
                    });
            }


            $scope.transformChip = function(chip){
                // If it is an object, it's already a known chip
                if (typeof chip === 'object') {
                    return chip;
                }
                // Otherwise, create a new one
                return { name: chip, searchRequired: true}
            }

            $scope.submitChiefComplaint = function(){
                var sex = $cookies.getObject($scope.user.email).gender;
                var age = $cookies.getObject($scope.user.email).age;
                var Diagnosis = $$Infermedica.createInitialDiagnosis(sex, age, $scope.selectedSymptoms);

                $$infermedicaEndpoints.diagnosis(Diagnosis)
                    .then((response) => {

                        console.log(response.data);
                        var followup = response.data.question;
                        $$Infermedica.setCurrentFollowup(followup);

                        $timeout(function(){
                            $scope.currentFollowup = followup;
                        });

                        $$pageState.updatePageStage('diagnosisFollowup');

                }, (response) => {
                    console.log('There was an error!');
                    console.log(response);
                });
            }



        } 
    }



})


