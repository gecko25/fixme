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
    var _user={};
    return{
        setUser : function(updated_user){
            _user = updated_user;
        },
        getUser : function(){
            return _user
        }
    }
});


angular.module('fixme').controller('mainCtrl', function($scope, $mdSidenav, userProfile){




    
    $scope.updateUserInfo = function(googleUser){
        var u={};
        $scope.loggedIn = true;

        var profile = googleUser.getBasicProfile();
        profile.getName() ? u.name = profile.getName() : u.name = 'User-Name'
        profile.getImageUrl() ? u.img = profile.getImageUrl() : u.img = 'assets/img/avatar_unknown.png'
        profile.getEmail() ? u.email = profile.getEmail() : u.email = 'user@gmail.com'

        $scope.user = u;
        $scope.$apply();
    }
});


