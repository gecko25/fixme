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
        controller: function controller($scope) {}
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
