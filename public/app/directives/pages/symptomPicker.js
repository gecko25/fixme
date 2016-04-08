angular.module('fixme').directive('fmSymptomPicker', function(loadIntermedicaData){
    return {
        templateUrl: 'app/templates/pages/symptomPicker.html',
        restrict: 'E',
        controller: function($scope, $q, $http){
            //on page startup, get data
            loadIntermedicaData.symptoms()
                .then(
                    (response) => {
                         $scope.symptoms = response.data;
                },  (response) => {
                         console.log('There was an error!' + response);
                });

            $scope.selectedSymptoms = [];

            //function called when text changes in autocomplete
            //TODO: if it doesn't exist, allow user to search
            $scope.searchSymptoms = function(searchText){
                var re = new RegExp('^' + searchText, "i");
                var matches = [];

                var deferred = $q.defer();

                try{
                    $scope.symptoms.forEach( (symptom) => {
                        //search the array for matching expressions
                        if (re.test(symptom.name)){
                            matches.push(symptom);
                            deferred.resolve(matches);
                        }
                    });

                }catch(e){
                    deferred.reject(null);
                }

                //return matches;
                return deferred.promise;
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

                console.log('Going to submit:')
                console.log($scope.selectedSymptoms);

                $http({
                    method: 'POST',
                    url: '/api/diagnosis',
                    data: $scope.selectedSymptoms
                }).then((response) => {
                    console.log(response);
                    console.log($scope.symptoms);
                }, (response) => {
                    console.log('There was an error!');
                    console.log(response);
                });
            }


        } 
    }
})


