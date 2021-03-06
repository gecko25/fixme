'use strict';

angular.module('fixme').factory('$$Infermedica', function ($http, $q, $$infermedicaEndpoints) {
    var _currentDiagnosis = {
        sex: '',
        age: '',
        evidence: []
    };

    var _currentFollowup = {
        type: '',
        text: '',
        items: [],
        extras: {}
    };

    return {
        searchIntermedicaData: function searchIntermedicaData(symptoms, searchText) {
            var re = new RegExp('^' + searchText, "i");
            var matches = [];
            var lastItem = symptoms[symptoms.length - 1];
            var deferred = $q.defer();

            try {
                //search the array for matching expressions
                symptoms.forEach(function (symptom) {

                    //regex match occured
                    if (re.test(symptom.name)) {
                        matches.push(symptom);
                        deferred.resolve(matches);
                    }

                    //No results were found
                    if (symptom.name === lastItem.name && matches.length === 0) {
                        //add other options
                        $$infermedicaEndpoints.search_phrase(searchText).then(function (response) {
                            var symptom_search_results = response.data;
                            console.log(symptom_search_results);

                            if (_.isEmpty(response.data)) {
                                deferred.resolve([]);
                            } else {
                                symptom_search_results.forEach(function (symptom) {
                                    matches.push({ name: symptom.label,
                                        id: symptom.id,
                                        searchRequired: true
                                    });
                                    deferred.resolve(matches);
                                });
                            }
                        }, function (response) {
                            console.log('There was an error!' + response);
                        });
                    }
                });
            } catch (e) {
                deferred.reject(null);
            }

            //return matches;
            return deferred.promise;
        },

        createInitialDiagnosis: function createInitialDiagnosis(sex, age, symptoms) {
            _currentDiagnosis.sex = sex;
            _currentDiagnosis.age = age;
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = symptoms[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var symptom = _step.value;

                    _currentDiagnosis = this.addSymptomToDiagnosis(_currentDiagnosis, symptom.id, 'present');
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }

            ;
            return _currentDiagnosis;
        },

        addSymptomsToDiagnosis: function addSymptomsToDiagnosis(selectedSymptoms) {
            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
                for (var _iterator2 = selectedSymptoms[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    var symptom = _step2.value;

                    _currentDiagnosis = this.addSymptomToDiagnosis(_currentDiagnosis, symptom.id, 'present');
                }
            } catch (err) {
                _didIteratorError2 = true;
                _iteratorError2 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion2 && _iterator2.return) {
                        _iterator2.return();
                    }
                } finally {
                    if (_didIteratorError2) {
                        throw _iteratorError2;
                    }
                }
            }

            ;
            return _currentDiagnosis;
        },

        removeAllSymptomsFromDiagnosis: function addSymptomsToDiagnosis() {
            _currentDiagnosis.evidence = [];
        },

        getCurrentDiagnosis: function getDiagnosis() {
            return _currentDiagnosis;
        },

        setCurrentFollowup: function setCurrentFollowup(followupObject) {
            _currentFollowup = followupObject;
        },

        getCurrentFollowup: function getCurrentFollowup() {
            return _currentFollowup;
        },

        addSymptomToDiagnosis: function addSymptomToDiagnosis(Diagnosis, id, choice_id) {
            if (Diagnosis.evidence) {
                Diagnosis.evidence.push({
                    "id": id,
                    "choice_id": choice_id
                });
                return Diagnosis;
            } else {
                throw Error('Diagnosis object not configured correctly', Diagnosis);
            }
        }
    };
});
'use strict';

angular.module('fixme').factory('$$infermedicaEndpoints', function ($http) {
    return {
        symptoms: function symptoms() {
            return $http({
                method: 'GET',
                url: '/api/symptoms'
            });
        },
        search_phrase: function search_phrase(text) {
            return $http({
                method: 'GET',
                url: '/api/search/' + text
            });
        },
        diagnosis: function diagnosis(Diagnosis) {
            return $http({
                method: 'POST',
                url: '/api/diagnosis',
                data: Diagnosis
            });
        }

    };
});
'use strict';

angular.module('fixme').factory('$$pageState', function () {
    var _showPage = {
        symptomPicker: true,
        findDoctor: false,
        settings: false,
        diagnosisFollowup: false,
        about: false
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

angular.module('fixme').directive('fmSideNav', function ($$pageState, $mdSidenav, $$Infermedica) {
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
                    }, 0);
                } else {

                    if (newPageState === 'symptomPicker') {
                        $scope.possibleDiagnosisExists = false;
                        $scope.selectedSymptoms = [];
                        $$Infermedica.removeAllSymptomsFromDiagnosis();
                    }

                    $mdSidenav('left').close();
                    $$pageState.updatePageStage(newPageState);
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

angular.module('fixme').directive('fmAbout', function () {
    return {
        templateUrl: 'app/templates/pages/about.html',
        restrict: 'E',
        controller: function controller() {}
    };
});
'use strict';

angular.module('fixme').directive('fmDiagnosisFollowup', function ($$Infermedica, $$infermedicaEndpoints, $timeout, $$pageState) {
    return {
        templateUrl: 'app/templates/pages/diagnosisFollowup.html',
        restrict: 'E',
        controller: function controller($scope) {
            var additionalEvidence = [];
            var probabilityThreshold = 0.5;
            $scope.singleAnswerChoiceId = '';
            $scope.groupSingleAnswerSymptomId = '';
            $scope.possibleDiagnoses = [];
            $scope.possibleDiagnosisExists = false;
            $scope.diagnosisFollowupValidationError = false;

            $scope.resetEvidence = function resetEvidence() {
                $scope.possibleDiagnosisExists = false;
                $scope.selectedSymptoms = [];
                $$Infermedica.removeAllSymptomsFromDiagnosis();
                $$pageState.updatePageStage('symptomPicker');
            };

            $scope.updateEvidence = function updateEvidence(type) {
                $scope.possibleDiagnoses = [];
                var currentFollowup = $$Infermedica.getCurrentFollowup();
                var currentDiagnosis = $$Infermedica.getCurrentDiagnosis();

                if (type === 'single') {
                    if ($scope.singleAnswerChoiceId) {
                        $scope.diagnosisFollowupValidationError = false;
                        var symptom_id = currentFollowup.items[0].id;
                        $$Infermedica.addSymptomToDiagnosis(currentDiagnosis, symptom_id, $scope.singleAnswerChoiceId);
                    } else {
                        $scope.diagnosisFollowupValidationError = true;
                        $scope.animateShake = "";
                        $scope.animateShake = "shake";
                        setTimeout(function () {
                            $scope.animateShake = "";
                        }, 500);
                    }
                }

                if (type === 'group_single') {
                    if ($scope.groupSingleAnswerSymptomId) {
                        $scope.diagnosisFollowupValidationError = false;

                        var _iteratorNormalCompletion = true;
                        var _didIteratorError = false;
                        var _iteratorError = undefined;

                        try {
                            for (var _iterator = currentFollowup.items[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                                var followupSymptom = _step.value;

                                if (followupSymptom.id === $scope.groupSingleAnswerSymptomId) {
                                    $$Infermedica.addSymptomToDiagnosis(currentDiagnosis, followupSymptom.id, 'present');
                                } else {
                                    $$Infermedica.addSymptomToDiagnosis(currentDiagnosis, followupSymptom.id, 'absent');
                                }
                            }
                        } catch (err) {
                            _didIteratorError = true;
                            _iteratorError = err;
                        } finally {
                            try {
                                if (!_iteratorNormalCompletion && _iterator.return) {
                                    _iterator.return();
                                }
                            } finally {
                                if (_didIteratorError) {
                                    throw _iteratorError;
                                }
                            }
                        }

                        ;
                    } else {
                        $scope.diagnosisFollowupValidationError = true;
                        $scope.animateShake = "";
                        $scope.animateShake = "shake";
                        setTimeout(function () {
                            $scope.animateShake = "";
                        }, 500);
                    }
                }

                if (type === 'group_multiple') {
                    var _iteratorNormalCompletion2 = true;
                    var _didIteratorError2 = false;
                    var _iteratorError2 = undefined;

                    try {
                        for (var _iterator2 = currentFollowup.items[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                            var followupSymptom = _step2.value;

                            var selectedIds = _.pluck(additionalEvidence, 'id');
                            var idx = selectedIds.indexOf(followupSymptom.id);
                            var userHasSymptom = idx > -1;

                            if (userHasSymptom) {
                                $$Infermedica.addSymptomToDiagnosis(currentDiagnosis, followupSymptom.id, 'present');
                            } else {
                                $$Infermedica.addSymptomToDiagnosis(currentDiagnosis, followupSymptom.id, 'absent');
                            }
                        }
                    } catch (err) {
                        _didIteratorError2 = true;
                        _iteratorError2 = err;
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion2 && _iterator2.return) {
                                _iterator2.return();
                            }
                        } finally {
                            if (_didIteratorError2) {
                                throw _iteratorError2;
                            }
                        }
                    }

                    ;
                }

                if (!$scope.diagnosisFollowupValidationError) {
                    $$infermedicaEndpoints.diagnosis($$Infermedica.getCurrentDiagnosis()).then(function (response) {
                        var numConditionsToDisplay = 3;

                        if (response.data.conditions.length < numConditionsToDisplay) {
                            numConditionsToDisplay = response.data.conditions.length;
                        }

                        for (var i = 0; i < numConditionsToDisplay; i++) {
                            if (response.data.conditions[i].probability > probabilityThreshold) {
                                var possibleDiagnosis = response.data.conditions[i],
                                    chance = possibleDiagnosis.probability * 100;

                                possibleDiagnosis.probability = chance.toFixed(1);

                                $scope.possibleDiagnoses.push(possibleDiagnosis);
                            }
                        }
                        $scope.possibleDiagnosisExists = $scope.possibleDiagnoses.length > 0;

                        var followup = response.data.question;
                        $$Infermedica.setCurrentFollowup(followup);

                        $timeout(function () {
                            $scope.currentFollowup = followup;
                        });
                    }, function (response) {
                        console.log('There was an error in diagnosisFollowup.js!');
                        console.log(response);
                    });
                }
            };

            $scope.toggleSymptom = function toggleSymptom(symptom) {
                var selectedIds;

                selectedIds = _.pluck(additionalEvidence, 'id');
                var idx = selectedIds.indexOf(symptom.id);

                if (idx > -1) {
                    additionalEvidence.splice(idx, 1);
                } else {
                    additionalEvidence.push(symptom);
                }
            };

            $scope.removeErrorMessage = function removeErrorMessage() {
                $scope.diagnosisFollowupValidationError = false;
                $scope.animateShake = '';
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

angular.module('fixme').directive('fmSettings', function ($cookies, $mdToast) {
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
                $cookies.putObject($scope.user.email, $scope.data);
                $scope.validationErrorAgeGender = false;

                var toast;
                toast = $mdToast.simple().textContent('Success! Go to DIAGNOSE ME page to begin').action('DIAGNOSE ME!').highlightAction(true).position('bottom right').hideDelay(60000);

                $mdToast.show(toast).then(function (response) {
                    if (response == 'ok') {
                        $scope.showContent('symptomPicker');
                    }
                });
            };

            var validateAgeIsAReasonableNumber = function validateAgeIsAReasonableNumber(age) {};
        }
    };
});
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

angular.module('fixme').directive('fmSymptomPicker', function ($$infermedicaEndpoints) {
    return {
        templateUrl: 'app/templates/pages/symptomPicker.html',
        restrict: 'E',
        controller: function controller($scope, $q, $http, $cookies, $timeout, $$Infermedica, $$pageState, $mdToast) {
            $scope.validationError = false;
            $scope.validationErrorAgeGender = false;

            //on page startup, get data
            $$infermedicaEndpoints.symptoms().then(function (response) {
                $scope.symptoms = response.data;
            }, function (response) {
                console.log('There was an error in symptomPicker.js!' + response);
            });

            $scope.selectedSymptoms = [];

            //function called when text changes in autocomplete
            //TODO: if it doesn't exist, allow user to search

            $scope.searchSymptoms = function (searchText) {
                $scope.validationError = false;
                return $$Infermedica.searchIntermedicaData($scope.symptoms, searchText).then(function (items) {
                    return items;
                }, function (err) {
                    console.log('There was an error searching for data in symptomPicker.js: ' + err);
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

            $scope.submitChiefComplaint = function () {
                var genderAndAgeExist = $cookies.getObject($scope.user.email);

                if (!genderAndAgeExist) {
                    $scope.validationErrorAgeGender = true;
                    var toast;
                    toast = $mdToast.simple().textContent('Save my gender and age').action('SETTINGS').highlightAction(true).position('bottom right').hideDelay(25000);

                    $mdToast.show(toast).then(function (response) {
                        if (response == 'ok') {
                            $scope.showContent('settings');
                        }
                    });
                } else if ($scope.selectedSymptoms.length == 0) {
                    $scope.validationError = true;
                    $scope.animateShake = "shake";
                    setTimeout(function () {
                        $scope.animateShake = "";
                    }, 1000);
                } else {
                    $scope.validationError = false;
                    var sex = $cookies.getObject($scope.user.email).gender;
                    var age = $cookies.getObject($scope.user.email).age;
                    var Diagnosis = $$Infermedica.createInitialDiagnosis(sex, age, $scope.selectedSymptoms);

                    $$infermedicaEndpoints.diagnosis(Diagnosis).then(function (response) {
                        var followup = response.data.question;
                        $$Infermedica.setCurrentFollowup(followup);

                        $timeout(function () {
                            $scope.currentFollowup = followup;
                        });

                        $$pageState.updatePageStage('diagnosisFollowup');
                    }, function (response) {
                        console.log('There was an error in symptomPicker.js');
                        console.log(response);
                    });
                }
            };
        }
    };
});
//# sourceMappingURL=fixme.js.map
