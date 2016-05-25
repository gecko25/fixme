var fixme = angular.module('fixme', [
    'ngMaterial',
    'ngMessages',
    'ngMdIcons',
    'ngCookies',
    'rx'
]);

angular.module('fixme').config(function($mdThemingProvider, $mdIconProvider){
    $mdThemingProvider.theme('default')
        .primaryPalette('blue')
        .accentPalette('yellow');

    $mdIconProvider
        .icon('menu', 'assets/svg/menu.svg', 24)
});


angular.module('fixme').controller('mainCtrl', function($scope, $mdSidenav, $cookies, $$pageState, $$Infermedica){
    //initialize globals
    $scope.loggedIn = false;
    $scope.showPage = $$pageState.getPageState();
    $scope.user = {};
    $scope.showContent = function(newPageState){
        $$pageState.updatePageStage(newPageState);
    }

    //login panel
    $scope.loginReminder = '';
    $scope.animateShake = "";
    $scope.removeLoginReminderMsg = function(){
        $scope.loginReminder = '';
    };
    
    $scope.updateUserInfo = function(googleUser){
        $scope.loggedIn = true;
        var u = {};
        var profile = googleUser.getBasicProfile();

        profile.getName() ? u.name = profile.getName() : u.name = 'User-Name'
        profile.getImageUrl() ? u.img = profile.getImageUrl() : u.img = 'assets/img/avatar_unknown.png'
        profile.getEmail() ? u.email = profile.getEmail() : u.email = 'user@gmail.com'

        $scope.user = u;
        $scope.$apply();

        loadLandingPage($cookies, $scope.user.email, pageState);
    }

    //diagnosis info
    $scope.currentFollowup = $$Infermedica.getCurrentFollowup();
    $scope.currentDiagnosis = $$Infermedica.getCurrentDiagnosis();
});

var loadLandingPage = function(cookies, email, $$pageState){
    var patientInfoCookie = cookies.getObject(email);
    var patientInfoCookieIsNotEmpty = _.isEmpty(patientInfoCookie) === false;


    if (patientInfoCookie && patientInfoCookieIsNotEmpty){
        if (patientInfoCookie.gender && patientInfoCookie.age){
            console.log('Gender and age info exist, setting page to symptom picker');
            $$pageState.updatePageStage('symptomPicker');
        }
    }else{
        console.log('Gender and age info DONT exist, setting page to settings');
        $$pageState.updatePageStage('settings');
    }
}

