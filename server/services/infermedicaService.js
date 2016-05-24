var Infermedica = require('../utilities/infermedicaHelper');
var colors = require('colors');


module.exports = {
    createDiagnosis: function(clientDiagnosisEntity){
        var Diagnosis = {
            sex: '',
            age: '',
            evidence: []
        };

        Diagnosis.age = clientDiagnosisEntity.age;
        Diagnosis.sex = clientDiagnosisEntity.gender;


        for (var symptom of clientDiagnosisEntity.selectedSymptoms){
            Diagnosis = Infermedica.addSymptom(Diagnosis, symptom.id, 'present');
        };
        
        return Diagnosis;

    }
}

