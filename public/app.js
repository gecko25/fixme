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


angular.module('fixme').controller('mainCtrl', function($scope, $mdSidenav, pageState){
    $scope.loggedIn = false;
    $scope.loginReminder = '';
    $scope.showPage = pageState.getPageState();
    $scope.animate = "";
    $scope.user = {};


    $scope.removeLoginReminderMsg = function(){
        $scope.loginReminder = '';
    };

    $scope.showContent = function(newPageState){
        console.log('going to update to.. ' + newPageState)
        pageState.updatePageStage(newPageState);
    }

    $scope.updateUserInfo = function(googleUser){
        $scope.loggedIn = true;
        var u = {};
        var profile = googleUser.getBasicProfile();

        profile.getName() ? u.name = profile.getName() : u.name = 'User-Name'
        profile.getImageUrl() ? u.img = profile.getImageUrl() : u.img = 'assets/img/avatar_unknown.png'
        profile.getEmail() ? u.email = profile.getEmail() : u.email = 'user@gmail.com'

        $scope.user = u;
        $scope.$apply();

    }

});


