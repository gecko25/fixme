angular.module('fixme').factory('$$Infermedica', function($http, $q){
    return{
        searchIntermedicaData : function($scope, searchText){
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
        },


        createDiagnosisEntity : function createDiagnosis(selectedSymptoms){
            var Diagnosis = {
                sex: '',
                age: '',
                evidence: []
            };

            for (var symptom of selectedSymptoms){
                Diagnosis = this.addSymptom(Diagnosis, symptom.id, 'present');
            };

            return Diagnosis;

        },


        addSymptom : function(Diagnosis, id, choice_id){
            if (Diagnosis.evidence){
                Diagnosis.evidence.push(
                    {
                        "id": id,
                        "choice_id": choice_id
                    }
                )
                return Diagnosis;
            }else{
                throw Error('Diagnosis object not configured correctly', Diagnosis);
            }
        }


    }
});
