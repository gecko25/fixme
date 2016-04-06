'use strict';

angular.module('fixme').directive('fmFindDoctor', function () {
    return {
        templateUrl: 'app/templates/findDoctor.html',
        restrict: 'E',
        controller: function controller($scope) {}
    };
});
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

angular.module('fixme').directive('fmSideNav', function (pageState) {
    return {
        templateUrl: 'app/templates/sideNav.html',
        restrict: 'E',
        controller: function controller($scope) {
            $scope.showContent = function (newPageState) {
                pageState.updatePageStage(newPageState);
            };
        }
    };
});
'use strict';

angular.module('fixme').directive('fmSymptomPicker', function () {
    return {
        templateUrl: 'app/templates/symptomPicker.html',
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

            $scope.signOut = function () {
                var auth2 = gapi.auth2.getAuthInstance();
                auth2.signOut().then(function () {
                    console.log('User signed out.');
                    $scope.user = {};
                    $scope.loggedIn = false;
                    $scope.$apply();
                });
            };

            $scope.toggleSideNav = function () {
                $mdSidenav('left').toggle();
            };
        }
    };
});
//# sourceMappingURL=fixme.js.map
