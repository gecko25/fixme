'use strict';

angular.module('fixme').directive('fmFooter', function () {
    return {
        templateUrl: 'app/templates/footer.html',
        restrict: 'E'
    };
});
'use strict';

angular.module('fixme').directive('fmLoginPanel', function () {
    return {
        templateUrl: 'app/templates/loginPanel.html',
        restrict: 'E'
    };
});
'use strict';

angular.module('fixme').directive('fmSideNav', function () {
    return {
        templateUrl: 'app/templates/sideNav.html',
        restrict: 'E',
        controller: function controller($scope) {
            /*$scope.$watch(
                function() {
                    return userProfile.getUser();
                },
                function(newUser, oldUser){
                    console.log('newUser:')
                    console.log(newUser);
                    $scope.user = newUser;
                     console.log('oldUser:')
                    console.log(oldUser);
                }
            );*/
        }
    };
});
'use strict';

angular.module('fixme').directive('fmToolbarHeader', function () {
    return {
        templateUrl: 'app/templates/toolbarHeader.html',
        restrict: 'E',
        controller: function controller($scope, $mdSidenav) {

            $scope.toggleSideNav = function () {
                $mdSidenav('left').toggle();
            };
        }
    };
});
//# sourceMappingURL=fixme.js.map
