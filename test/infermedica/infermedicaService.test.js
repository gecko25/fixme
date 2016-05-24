var infermedicaService = require('../../server/services/infermedicaService.js')
var clientDiagnosisEntity = require('./clientDiagnosisEntity.js')
var expect = require('chai').expect;

describe('createDiagnosis', function() {
        it("should return an object with sex, age, and evidence", function(){
            var Diagnosis = infermedicaService.createDiagnosis(clientDiagnosisEntity);

            expect(Diagnosis).to.have.ownProperty('evidence');
            expect(Diagnosis).to.have.ownProperty('age');
            expect(Diagnosis).to.have.ownProperty('sex');

            expect(Array.isArray(Diagnosis.evidence)).to.be.true;
            expect(typeof Diagnosis.sex).to.equal('string');
            expect(typeof Diagnosis.age).to.equal('string');
            

        });
});
