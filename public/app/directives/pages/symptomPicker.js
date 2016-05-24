angular.module('fixme').directive('fmSymptomPicker', function(loadIntermedicaData){
    return {
        templateUrl: 'app/templates/pages/symptomPicker.html',
        restrict: 'E',
        controller: function($scope, $q, $http, $cookies){
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
                return searchIntermedicaData(searchText)
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
                var diagnosisEntity = {};
                diagnosisEntity.selectedSymptoms = $scope.selectedSymptoms;
                diagnosisEntity.gender = $cookies.getObject($scope.user.email).gender;
                diagnosisEntity.age = $cookies.getObject($scope.user.email).age;

                console.log('Going to submit:')
                console.log(diagnosisEntity)


                $http({
                    method: 'POST',
                    url: '/api/diagnosis',
                    data: diagnosisEntity
                }).then((response) => {
                    console.log(response.data.question);
                    //TODO: handle question 
                }, (response) => {
                    console.log('There was an error!');
                    console.log(response);
                });
            }


            var searchIntermedicaData = function(searchText){
                var re = new RegExp('^' + searchText, "i");
                var matches = [];
                var lastItem = $scope.symptoms[$scope.symptoms.length - 1];
                var deferred = $q.defer();

                try{
                    //search the array for matching expressions
                    $scope.symptoms.forEach( (symptom) => {

                        //regex match occured
                        if (re.test(symptom.name)){
                            matches.push(symptom);
                            deferred.resolve(matches);
                        }

                        //No results were found
                        if (symptom.name === lastItem.name && matches.length === 0){
                            //add other options
                            loadIntermedicaData.search_phrase(searchText)
                                .then(
                                    (response) => {
                                        var symptom_search_results = response.data;
                                        console.log(symptom_search_results)

                                        if ( _.isEmpty(response.data)){
                                            deferred.resolve([]);
                                        }else{
                                            symptom_search_results.forEach( symptom => {
                                                matches.push(
                                                    { name: symptom.label,
                                                        id: symptom.id,
                                                        searchRequired: true
                                                    });
                                                deferred.resolve(matches);
                                            })
                                        }
                                    },  (response) => {
                                        console.log('There was an error!' + response);
                                    });

                        }
                    });

                }catch(e){
                    deferred.reject(null);
                }

                //return matches;
                return deferred.promise;
            }

        } 
    }
})


