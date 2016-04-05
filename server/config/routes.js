var infermedica = require('../controllers/infermedicaController');
//var betterDoctor = require('../controllers/betterDoctorController');


var indexRedirect = function (req, res) {
    //TODO: serve static index.html
}

//routes
module.exports = function (app) {
   

   app.get('/api/symptoms', infermedica.generateSymptoms);


  // ensure that the client side application does ALL of the routing
   app.get('*', indexRedirect);
}
