module.exports = {
  buildUserObjectFromSession : function(req,res){
    return {
      id: req.session.user_id,
      name: '',
      email: '',
      avatar: ''
    }
  }
}
