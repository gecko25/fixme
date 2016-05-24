module.exports.addSymptom = function(Diagnosis, id, choice_id){
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

