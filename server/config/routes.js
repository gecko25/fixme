var infermedica = require('../controllers/infermedicaController');
var sessionManager = require('../controllers/sessionManagerController');
//var betterDoctor = require('../controllers/betterDoctorController');


var indexRedirect = function (req, res) {
    //TODO: serve static index.html
}

//routes
module.exports = function (app) {
   

   app.get('/api/symptoms', infermedica.generateSymptoms);

   app.post('/api/symptoms', infermedica.diagnose);

    app.patch('/api/user', sessionManager.updateUserObjectFromSession);


  // ensure that the client side application does ALL of the routing
   app.get('*', indexRedirect);
}
