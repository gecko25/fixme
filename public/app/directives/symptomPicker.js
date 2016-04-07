angular.module('fixme').directive('fmSymptomPicker', function($http){
    return {
        templateUrl: 'app/templates/symptomPicker.html',
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

            //on text change in autocomplete

            $scope.searchSymptoms = function(searchText){
                var re = new RegExp('^' + searchText, "i");

                var deferred = $q.defer();


                console.log('Searching with regex:')
                console.log(re);

                try{
                    var matches = [];

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


        } 
    }
})


