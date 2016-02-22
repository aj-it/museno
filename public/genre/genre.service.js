(function () {
    'use strict';

    angular
        .module('app.genre')
        .factory('GenreService', GenreService);

    GenreService.$inject = ['$resource'];

    function GenreService($resource) {
        var service = $resource('api/genre/', {}, {
            query: {method: 'GET'},
            save: {method: 'POST'},
            update: {method: 'PUT'},
            delete: {method: 'DELETE'}
        });

        return service;
    }

})();
