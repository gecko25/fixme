angular.module('fixme').directive('fmSymptomPicker', function($http){
    return {
        templateUrl: 'app/templates/pages/symptomPicker.html',
        restrict: 'E',
        controller: function($scope, $q){
            //on page startup, get data
            $http({
                method: 'GET',
                url: '/api/symptoms'
            }).then((response) => {
                $scope.symptoms = response.data;
                console.log($scope.symptoms);
            }, (response) => {
                console.log('There was an error!');
                console.log(response);
            });
            
            $scope.selectedSymptoms = [];

            //function called when text changes in autocomplete
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

            $scope.submitSymptoms = function(){
                $http({
                    method: 'POST',
                    url: '/api/diagnosis',
                    data: selectedSymptoms
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


