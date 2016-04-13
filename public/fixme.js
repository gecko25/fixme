'use strict';

angular.module('fixme').factory('loadIntermedicaData', function ($http) {
    return {
        symptoms: function symptoms() {
            //console.log('Going to load symptom data from Intermedica...')
            return $http({
                method: 'GET',
                url: '/api/symptoms'
            });
        },
        lab_tests: function lab_tests() {
            return $http({
                method: 'GET',
                url: '/api/lab_tests'
            });
        },
        conditions: function conditions() {
            return $http({
                method: 'GET',
                url: '/api/conditions'
            });
        },
        search_phrase: function search_phrase(text) {
            return $http({
                method: 'GET',
                url: '/api/search/' + text
            });
        }

    };
});
'use strict';

angular.module('fixme').factory('pageState', function () {
    var _showPage = {
        symptomPicker: true,
        findDoctor: false,
        settings: false
    };
    return {
        getPageState: function getPageState() {
            return _showPage;
        },
        updatePageStage: function updatePageStage(newPageState) {
            for (var page in _showPage) {
                if (page === newPageState) _showPage[page] = true;else _showPage[page] = false;
            }
        }
    };
});
'use strict';

angular.module('fixme').factory('userProfile', function () {
    var _user = {};

    return {
        setUserFromGoogleProfile: function setUserFromGoogleProfile(profile, $scope) {

            profile.getName() ? _user.name = profile.getName() : _user.name = 'User-Name';
            profile.getImageUrl() ? _user.img = profile.getImageUrl() : _user.img = 'assets/img/avatar_unknown.png';
            profile.getEmail() ? _user.email = profile.getEmail() : _user.email = 'user@gmail.com';

            $scope.user = _user;
            $scope.apply();
        },

        getUser: function getUser() {
            return _user;
        }
    };
});
'use strict';

angular.module('fixme').directive('fmFooter', function () {
    return {
        templateUrl: 'app/templates/baseComponents/footer.html',
        restrict: 'E'
    };
});
'use strict';

angular.module('fixme').directive('fmLoginPanel', function () {
    return {
        templateUrl: 'app/templates/baseComponents/loginPanel.html',
        restrict: 'E'
    };
});
'use strict';

angular.module('fixme').directive('fmSideNav', function (pageState, $mdSidenav) {
    return {
        templateUrl: 'app/templates/baseComponents/sideNav.html',
        restrict: 'E',
        controller: function controller($scope) {
            $scope.showContentAndCloseSideNav = function (newPageState) {
                if (!$scope.loggedIn) {
                    $mdSidenav('left').close();
                    $scope.loginReminder = 'Please login first';
                    $scope.animateShake = "";
                    setTimeout(function () {
                        $scope.animateShake = "shake";
                    }, 100);
                } else {
                    $mdSidenav('left').close();
                    pageState.updatePageStage(newPageState);
                }
            };
        }
    };
});
'use strict';

angular.module('fixme').directive('fmToolbarHeader', function () {
    return {
        templateUrl: 'app/templates/baseComponents/toolbarHeader.html',
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
'use strict';

angular.module('fixme').directive('fmFindDoctor', function () {
    return {
        templateUrl: 'app/templates/pages/findDoctor.html',
        restrict: 'E',
        controller: function controller($scope) {}
    };
});
'use strict';

angular.module('fixme').directive('fmSettings', function (pageState, $cookies, $mdToast) {
    return {
        templateUrl: 'app/templates/pages/settings.html',
        restrict: 'E',
        controller: function controller($scope, observeOnScope, $http) {
            var patientInfoCookie = {};
            var dataFromCookiesExist = false;

            $scope.data = {};

            //Listening for user to login, eventually this needs to be accomplished in a database
            observeOnScope($scope, 'user').subscribe(function (change) {
                if (change.newValue) {
                    $scope.user = change.newValue;

                    patientInfoCookie = $cookies.getObject($scope.user.email);
                    dataFromCookiesExist = _.isEmpty(patientInfoCookie) === false;

                    //if we have new user data, we need to check if cookies exists for their settings
                    $scope.data = {
                        gender: dataFromCookiesExist ? patientInfoCookie.gender : '',
                        age: dataFromCookiesExist ? patientInfoCookie.age : ''

                    };
                }
            });

            $scope.savePatientData = function () {
                $cookies.putObject($scope.user.email, $scope.data, { path: 'http://localhost:4001/' });

                var toast;
                toast = $mdToast.simple().textContent('Saved!').action('DIAGNOSE ME').highlightAction(true).position('bottom right').hideDelay(6000);

                $mdToast.show(toast).then(function (response) {
                    if (response == 'ok') {
                        $scope.showContent('symptomPicker');
                    }
                });
            };
        }
    };
});

/*
 $http({
 method: 'PATCH',
 url: '/api/user',
 headers: 'Content-Type: application/json',
 data: $scope.data
 }).then((response) => {
 console.log(response);
 pageState.updatePageStage('symptomPicker');

 }, (response) => {
 console.log('There was an error!');
 console.log(response);
 });*/
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

angular.module('fixme').directive('fmSymptomPicker', function (loadIntermedicaData) {
    return {
        templateUrl: 'app/templates/pages/symptomPicker.html',
        restrict: 'E',
        controller: function controller($scope, $q, $http) {
            //on page startup, get data
            loadIntermedicaData.symptoms().then(function (response) {
                $scope.symptoms = response.data;
                console.log('Loaded symptom data from intermedica');
                console.log($scope.symptoms);
            }, function (response) {
                console.log('There was an error!' + response);
            });

            //on page startup, get data
            loadIntermedicaData.search_phrase('fatigue').then(function (response) {
                $scope.symptoms = response.data;
                console.log('Loaded search data from intermedica');
                console.log($scope.symptoms);
            }, function (response) {
                console.log('There was an error!' + response);
            });

            $scope.selectedSymptoms = [];

            //function called when text changes in autocomplete
            //TODO: if it doesn't exist, allow user to search

            $scope.searchSymptoms = function (searchText) {
                return searchIntermedicaData(searchText).then(function (items) {
                    return items;
                }, function (err) {
                    console.log('There was an error' + err);
                });
            };

            $scope.transformChip = function (chip) {
                // If it is an object, it's already a known chip
                if ((typeof chip === 'undefined' ? 'undefined' : _typeof(chip)) === 'object') {
                    return chip;
                }
                // Otherwise, create a new one
                return { name: chip, searchRequired: true };
            };

            $scope.submitSymptoms = function () {

                console.log('Going to submit:');
                console.log($scope.selectedSymptoms);

                $http({
                    method: 'POST',
                    url: '/api/diagnosis',
                    data: $scope.selectedSymptoms
                }).then(function (response) {
                    console.log(response);
                    console.log($scope.symptoms);
                }, function (response) {
                    console.log('There was an error!');
                    console.log(response);
                });
            };

            var searchIntermedicaData = function searchIntermedicaData(searchText) {
                var re = new RegExp('^' + searchText, "i");
                var matches = [];
                var lastItem = $scope.symptoms[$scope.symptoms.length - 1];
                var deferred = $q.defer();

                try {
                    $scope.symptoms.forEach(function (symptom) {
                        //search the array for matching expressions
                        if (re.test(symptom.name)) {
                            matches.push(symptom);
                            deferred.resolve(matches);
                        }

                        if (symptom.name === lastItem.name && matches.length === 0) {
                            //No results were found
                            var customSymptom = { name: searchText, searchRequired: true };
                            matches.push(customSymptom);
                            deferred.resolve(matches);
                        }
                    });
                } catch (e) {
                    deferred.reject(null);
                }

                //return matches;
                return deferred.promise;
            };
        }
    };
});
//# sourceMappingURL=fixme.js.map
