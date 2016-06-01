angular.module('fixme').directive('fmDiagnosisFollowup', function($$Infermedica, $$infermedicaEndpoints, $timeout, $$pageState){
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

            $scope.resetEvidence = function resetEvidence(){
                $scope.possibleDiagnosisExists = false;
                $scope.selectedSymptoms = [];
                $$Infermedica.removeAllSymptomsFromDiagnosis();
                $$pageState.updatePageStage('symptomPicker');
            }

            $scope.updateEvidence = function updateEvidence(type) {
                $scope.possibleDiagnoses = [];
                var currentFollowup = $$Infermedica.getCurrentFollowup();
                var currentDiagnosis = $$Infermedica.getCurrentDiagnosis();

                if (type === 'single'){
                    console.log('singleAnswerChoiceId', $scope.singleAnswerChoiceId)
                    var symptom_id = currentFollowup.items[0].id;
                    $$Infermedica.addSymptomToDiagnosis(currentDiagnosis, symptom_id, $scope.singleAnswerChoiceId)
                }

                if (type === 'group_single'){
                    console.log('groupSingleAnswerSymptomId', $scope.groupSingleAnswerSymptomId)
                    for (var followupSymptom of currentFollowup.items){

                        if (followupSymptom.id === $scope.groupSingleAnswerSymptomId){
                            $$Infermedica.addSymptomToDiagnosis(currentDiagnosis, followupSymptom.id, 'present')
                        }else{
                            $$Infermedica.addSymptomToDiagnosis(currentDiagnosis, followupSymptom.id, 'absent')
                        }
                    };
                 }

                if (type === 'group_multiple'){
                    console.log('additionalEvidence', additionalEvidence)

                    for (var followupSymptom of currentFollowup.items){
                        var selectedIds = _.pluck(additionalEvidence, 'id');
                        var idx = selectedIds.indexOf(followupSymptom.id);
                        var userHasSymptom = idx > -1;

                        if (userHasSymptom){
                            $$Infermedica.addSymptomToDiagnosis(currentDiagnosis, followupSymptom.id, 'present')
                        }else{
                            $$Infermedica.addSymptomToDiagnosis(currentDiagnosis, followupSymptom.id, 'absent')
                        }
                    };
                }


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

                        $scope.possibleDiagnosisExists = $scope.possibleDiagnoses.length > 0;


                        var followup = response.data.question;
                        $$Infermedica.setCurrentFollowup(followup);

                        $timeout(function(){
                            $scope.currentFollowup = followup;
                        });

                    }, (response) => {
                        console.log('There was an error in diagnosisFollowup.js!');
                        console.log(response);
                    });
            }

            $scope.toggleSymptom = function toggleSymptom(symptom){
                var selectedIds;

                    selectedIds = _.pluck(additionalEvidence, 'id');
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