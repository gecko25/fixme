angular.module('fixme').directive('fmDiagnosisFollowup', function($$Infermedica, $$infermedicaEndpoints, $timeout){
    return {
        templateUrl: 'app/templates/pages/diagnosisFollowup.html',
        restrict: 'E',
        controller: function($scope){
            var additionalEvidence = [];
            var probabilityThreshold = 0.5;
            $scope.singleAnswerChoiceId = '';
            $scope.groupSingleAnswerSymptomId = '';
            $scope.possibleDiagnoses = [];
            $scope.possibleDiagnosisExists = false;

            

            $scope.updateEvidence = function updateEvidence(type) {
                $scope.possibleDiagnoses = [];
                var currentFollowup = $$Infermedica.getCurrentFollowup();
                var currentDiagnosis = $$Infermedica.getCurrentDiagnosis();

                if (type === 'single'){
                    var symptom_id = currentFollowup.items[0].id;
                    $$Infermedica.addSymptom(currentDiagnosis, symptom_id, $scope.singleAnswerChoiceId)
                }

                if (type === 'group_single'){
                    console.log($scope.groupSingleAnswerSymptomId)
                    for (var followupSymptom of currentFollowup.items){

                        if (followupSymptom.id === $scope.groupSingleAnswerSymptomId){
                            $$Infermedica.addSymptom(currentDiagnosis, followupSymptom.id, 'present')
                        }else{
                            $$Infermedica.addSymptom(currentDiagnosis, followupSymptom.id, 'absent')
                        }
                    };
                 }

                if (type === 'group_multiple'){
                    console.log($scope.groupSingleAnswerSymptomId)

                    for (var followupSymptom of currentFollowup.items){
                        var selectedIds = _.pluck(additionalEvidence, 'id');
                        var idx = selectedIds.indexOf(followupSymptom.id);
                        var userHasSymptom = idx > -1;

                        if (userHasSymptom){
                            $$Infermedica.addSymptom(currentDiagnosis, followupSymptom.id, 'present')
                        }else{
                            $$Infermedica.addSymptom(currentDiagnosis, followupSymptom.id, 'absent')
                        }
                    };
                }

                console.log('Evidence updated..');
                console.log($$Infermedica.getCurrentDiagnosis())


                $$infermedicaEndpoints.diagnosis($$Infermedica.getCurrentDiagnosis())
                    .then((response) => {
                        var numConditionsToDisplay = 3;

                        if (response.data.conditions.length < numConditionsToDisplay){
                            numConditionsToDisplay = response.data.conditions.length;
                        }

                        for (var i =0; i<numConditionsToDisplay; i++){
                            if (response.data.conditions[i].probability > probabilityThreshold){
                                $scope.possibleDiagnoses.push(response.data.conditions[i])
                            }
                        }
                        console.log('possible diagnosis')
                        console.log($scope.possibleDiagnoses)
                        $scope.possibleDiagnosisExists = $scope.possibleDiagnoses.length > 0;
                        console.log($scope.possibleDiagnosisExists);

                        console.log('conditions:')
                        console.log(response.data.conditions)

                        var followup = response.data.question;
                        $$Infermedica.setCurrentFollowup(followup);

                        $timeout(function(){
                            $scope.currentFollowup = followup;
                        });

                    }, (response) => {
                        console.log('There was an error!');
                        console.log(response);
                    });
            }

            $scope.toggleSymptom = function toggleSymptom(symptom){
                var selectedIds = _.pluck(additionalEvidence, 'id');
                var idx = selectedIds.indexOf(symptom.id);

                if (idx > -1) {
                    additionalEvidence.splice(idx, 1);
                }
                else {
                    additionalEvidence.push(symptom);
                }
            }
        }

    }
})