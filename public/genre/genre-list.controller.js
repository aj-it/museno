(function () {
    'use strict';

    angular
        .module('app.genre')
        .controller('GenreController', GenreController);

    GenreController.$inject = ['GenreService', '$uibModal'];

    function GenreController(GenreService, $uibModal) {
        var vm = this;

        vm.title = 'Liste des Genres';
        vm.genres = [];

        vm.addGenre = addGenre;
        vm.editGenre = editGenre;
        vm.deleteGenre = deleteGenre;

        activate();

        /**
         * Charge la liste des genres.
         *
         * @return void
         */
        function activate() {
            GenreService.query(function (response) {
                vm.genres = response.data;
            });
        }

        /**
         * Ouvre la fenêtre d'ajout d'un genre.
         *
         *@return void
         */
        function addGenre() {
            $uibModal.open({
                templateUrl: 'genre/genre-modal.html',
                bindToController: true,
                controller: 'GenreModalController',
                controllerAs: 'vm',
                resolve: {
                    genres: function () {
                        return vm.genres;
                    },
                    genre: null
                }
            });
        }

        /**
         * Ouvre la fenêtre d'édition d'un genre.
         *
         * @param genre
         * @return void
         */
        function editGenre(genre) {
            $uibModal.open({
                templateUrl: 'genre/genre-modal.html',
                bindToController: true,
                controller: 'GenreModalController',
                controllerAs: 'vm',
                resolve: {
                    genres: function () {
                        return vm.genres;
                    },
                    genre: Object.assign({}, genre)
                }
            });
        }

        /**
         * Ouvre la fenêtre de confirmation de suppression d'un genre.
         *
         * @param genre
         * @return void
         */
        function deleteGenre(genre) {
            $uibModal.open({
                templateUrl: 'genre/genre-confirm.html',
                bindToController: true,
                controller: 'GenreModalController',
                controllerAs: 'vm',
                resolve: {
                    genres: function () {
                        return vm.genres;
                    },
                    genre: genre
                }
            });
        }
    }
})();
