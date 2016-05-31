angular.module('fixme').factory('$$Infermedica', function($http, $q, $$infermedicaEndpoints){
    var _currentDiagnosis = {
        sex: '',
        age: '',
        evidence: []
    };

    var _currentFollowup = {
        type: '',
        text: '',
        items: [],
        extras: {}
    }

    return{
        searchIntermedicaData : function(symptoms, searchText){
            var re = new RegExp('^' + searchText, "i");
            var matches = [];
            var lastItem = symptoms[symptoms.length - 1];
            var deferred = $q.defer();

            try{
                //search the array for matching expressions
                symptoms.forEach( (symptom) => {

                    //regex match occured
                    if (re.test(symptom.name)){
                        matches.push(symptom);
                        deferred.resolve(matches);
                    }

                    //No results were found
                    if (symptom.name === lastItem.name && matches.length === 0){
                        //add other options
                        $$infermedicaEndpoints.search_phrase(searchText)
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

        createInitialDiagnosis : function(sex, age, symptoms){
            _currentDiagnosis.sex = sex;
            _currentDiagnosis.age = age;
            for (var symptom of symptoms){
                _currentDiagnosis = this.addSymptomToDiagnosis(_currentDiagnosis, symptom.id, 'present');
            };
            return _currentDiagnosis;
        },


        addSymptomsToDiagnosis : function addSymptomsToDiagnosis(selectedSymptoms){
            for (var symptom of selectedSymptoms){
                _currentDiagnosis = this.addSymptomToDiagnosis(_currentDiagnosis, symptom.id, 'present');
            };
            return _currentDiagnosis;
        },

        removeAllSymptomsFromDiagnosis : function addSymptomsToDiagnosis(){
                _currentDiagnosis.evidence = [];
        },

        getCurrentDiagnosis : function getDiagnosis(){
            return _currentDiagnosis;
        },

        setCurrentFollowup : function(followupObject){
            _currentFollowup = followupObject;
        },

        getCurrentFollowup : function(){
            return _currentFollowup ;
        },
        

        addSymptomToDiagnosis : function(Diagnosis, id, choice_id){
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
        },

        setSelectedSymptomsInSearchBar : function(symptoms){

        }


    }
});
