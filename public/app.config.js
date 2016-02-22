(function () {
    'use strict';

    // Declare app level module which depends on views, and components
    angular.module('app', [
        'ngRoute',
        'app.genre'
    ]).config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/genres', {
            templateUrl: 'genre/genre-list.html',
            controller: 'GenreController',
            controllerAs: 'vm'
        }).otherwise({redirectTo: '/'});
    }]);

})();
