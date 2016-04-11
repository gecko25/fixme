module.exports = {
  updateUserObjectFromSession : function(req,res){
      req.session.age = req.body.age;
      req.session.gender = req.body.gender;

    //TODO: make this read all the keys on the req.body and add to user (i.e not just update age/gender)    
    return {
      age: req.body.age,
      gender: req.body.gender
    }
      
  }
}
