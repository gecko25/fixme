angular.module('fixme').directive('fmDiagnosisFollowup', function($$Infermedica, $$infermedicaEndpoints, $timeout){
    return {
        templateUrl: 'app/templates/pages/diagnosisFollowup.html',
        restrict: 'E',
        controller: function($scope){
            var additionalEvidence = [];
            $scope.singleAnswerChoiceId = '';
            $scope.groupSingleAnswerSymptomId = '';

            $scope.textInput = '';

            $scope.test = function(){
                console.log($scope.groupSingleAnswerSymptomId)
                console.log($scope.singleAnswerChoiceId)
            }

            $scope.updateEvidence = function updateEvidence(type) {
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
                console.log('Going to ask API again..');


                $$infermedicaEndpoints.diagnosis($$Infermedica.getCurrentDiagnosis())
                    .then((response) => {
                        console.log(response.data.conditions);
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