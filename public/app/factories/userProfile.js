angular.module('fixme').factory('userProfile', function(){
    var _user={};

    return{
        setUserFromGoogleProfile : function(profile, $scope){

            profile.getName() ? _user.name = profile.getName() : _user.name = 'User-Name';
            profile.getImageUrl() ? _user.img = profile.getImageUrl() : _user.img = 'assets/img/avatar_unknown.png';
            profile.getEmail() ? _user.email = profile.getEmail() : _user.email = 'user@gmail.com';

            $scope.user = _user;
            $scope.apply();
        },
        
        getUser : function(){
            return _user
        }
    }
});