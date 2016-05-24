angular.module('fixme').directive('fmSymptomPicker', function(loadIntermedicaData){
    return {
        templateUrl: 'app/templates/pages/symptomPicker.html',
        restrict: 'E',
        controller: function($scope, $q, $http, $cookies, $$Infermedica){
            //on page startup, get data
            loadIntermedicaData.symptoms()
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
                return $$Infermedica.searchIntermedicaData($scope, searchText)
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

            $scope.submitSymptoms = function(){


                var Diagnosis = $$Infermedica.createDiagnosisEntity($scope.selectedSymptoms);
                Diagnosis.sex = $cookies.getObject($scope.user.email).gender;
                Diagnosis.age = $cookies.getObject($scope.user.email).age;

                console.log('Going to submit:')
                console.log(Diagnosis)


                $http({
                    method: 'POST',
                    url: '/api/diagnosis',
                    data: Diagnosis
                }).then((response) => {
                    console.log(response.data.question);
                    //TODO: handle question
                }, (response) => {
                    console.log('There was an error!');
                    console.log(response);
                });
            }



        } 
    }



})


