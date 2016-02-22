(function () {
    'use strict';

    angular
        .module('app.genre')
        .controller('GenreModalController', GenreModalController);

    GenreModalController.$inject = ['GenreService', '$uibModalInstance', 'genres', 'genre'];

    function GenreModalController(GenreService, $uibModalInstance, genres, genre) {
        var vm = this;

        vm.genres = genres;
        vm.genre = genre;
        vm.errors = {};

        vm.saveGenre = saveGenre;
        vm.deleteGenre = deleteGenre;

        activate();

        function activate() {

        }

        /**
         * Enregistrer un genre.
         *
         * @param data
         * @return bool
         */
        function saveGenre(data) {
            vm.errors = {};

            if (data == null || data.name == null) {
                return false;
            }

            var Genre = new GenreService();
            Genre.name = data.name;

            if (data.id == null) {
                Genre.$save().then(
                    // success
                    function (response) {
                        $uibModalInstance.close();
                        vm.genres.push(response);
                    },
                    // failure
                    function (errors) {
                        vm.errors.name = errors.data.name;
                    });
            } else {

                Genre.id = data.id;
                Genre.$update().then(
                    // Success
                    function (response) {
                        vm.genres.map(function(genre, index) {
                            if (genre.id == data.id) {
                                vm.genres.splice(index, 1, response);
                            }
                        });
                        $uibModalInstance.close();
                    },
                    // Failure
                    function (errors) {
                        vm.errors.name = errors.data.name;
                    });
            }
        }

        /**
         * Supprimer un genre.
         *
         * @param data
         * @return void
         */
        function deleteGenre(data) {
            var Genre = new GenreService();
            Genre.$delete({id: data.id}).then(
                // Success
                function () {
                    var i = 0;
                    vm.genres.map(function(genre, index) {
                        if (genre.id == data.id) {
                            vm.genres.splice(index, 1);
                            return true;
                        }
                    });
                    $uibModalInstance.close();
                },
                // Failure
                function (errors) {
                    vm.errors.id = errors.data.id;
                });
        }
    }

})();
