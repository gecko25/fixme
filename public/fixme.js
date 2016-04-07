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

angular.module('fixme').directive('fmSettings', function (pageState) {
    return {
        templateUrl: 'app/templates/settings.html',
        restrict: 'E',
        controller: function controller($scope, $http) {
            $scope.data = {
                gender: '',
                age: ''
            };

            $scope.showContent = function (newPageState) {
                console.log('going to update to.. ' + newPageState);
                pageState.updatePageStage(newPageState);
            };

            $scope.savePatientData = function () {

                $http({
                    method: 'PATCH',
                    url: '/api/user',
                    headers: 'Content-Type: application/json',
                    data: $scope.data
                }).then(function (response) {
                    console.log(response);
                }, function (response) {
                    console.log('There was an error!');
                    console.log(response);
                });
            };
        }
    };
});
'use strict';

angular.module('fixme').directive('fmSideNav', function (pageState) {
    return {
        templateUrl: 'app/templates/sideNav.html',
        restrict: 'E',
        controller: function controller($scope) {
            $scope.showContent = function (newPageState) {
                if (!$scope.loggedIn) {
                    $scope.loginReminder = 'Please login first';
                    $scope.animate = "";
                    setTimeout(function () {
                        $scope.animate = "shake";
                    }, 0);
                } else {
                    pageState.updatePageStage(newPageState);
                }
            };
        }
    };
});
'use strict';

angular.module('fixme').directive('fmSymptomPicker', function ($http) {
    return {
        templateUrl: 'app/templates/symptomPicker.html',
        restrict: 'E',
        controller: function controller($scope, $q) {
            //on page startup, get data
            $http({
                method: 'GET',
                url: '/api/symptoms'
            }).then(function (response) {
                $scope.symptoms = response.data;
                console.log($scope.symptoms);
            }, function (response) {
                console.log('There was an error!');
                console.log(response);
            });

            $scope.selectedSymptoms = [];

            //function called when text changes in autocomplete
            $scope.searchSymptoms = function (searchText) {
                var re = new RegExp('^' + searchText, "i");
                var matches = [];

                var deferred = $q.defer();

                try {
                    $scope.symptoms.forEach(function (symptom) {
                        //search the array for matching expressions
                        if (re.test(symptom.name)) {
                            matches.push(symptom);
                            deferred.resolve(matches);
                        }
                    });
                } catch (e) {
                    deferred.reject(null);
                }

                //return matches;
                return deferred.promise;
            };

            $scope.submitSymptoms = function () {
                $http({
                    method: 'POST',
                    url: '/api/diagnosis',
                    data: selectedSymptoms
                }).then(function (response) {
                    console.log(response);
                    console.log($scope.symptoms);
                }, function (response) {
                    console.log('There was an error!');
                    console.log(response);
                });
            };
        }
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
