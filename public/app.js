var fixme = angular.module('fixme', [
    'ngMaterial',
    'ngMessages',
    'ngMdIcons'
]);

angular.module('fixme').config(function($mdThemingProvider, $mdIconProvider){
    $mdThemingProvider.theme('default')
        .primaryPalette('blue')
        .accentPalette('yellow');

    $mdIconProvider
        .icon('menu', 'assets/svg/menu.svg', 24)
});

angular.module('fixme').factory('userProfile', function(){
    var user={};
    return{
        setUserProfile : function(updated_user){
            user = updated_user;
        },
        getUserProfile: function(){
            return user;
        }
    }
});


angular.module('fixme').controller('mainCtrl', function($scope, $mdSidenav, userProfile){
    $scope.signOut = function(){
        var auth2 = gapi.auth2.getAuthInstance();
        auth2.signOut().then(function () {
            console.log('User signed out.');
        });
    }
    
    $scope.updateUserInfo = function(googleUser){
        var user={};
        var profile = googleUser.getBasicProfile();
        user.name = profile.getName();
        user.img = profile.getImageUrl();
        user.email = profile.getEmail();
        userProfile.setUserProfile(user);
    }
});


