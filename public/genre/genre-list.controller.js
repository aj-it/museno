(function () {
    'use strict';

    angular
        .module('app.genre')
        .controller('GenreController', GenreController);

    GenreController.$inject = ['GenreService', '$uibModal', '$scope'];

    function GenreController(GenreService, $uibModal, $scope) {
        var vm = this;

        vm.title = 'Liste des Genres';
        vm.genres = [];
        vm.maxSize, vm.totalItem, vm.currentPage, vm.previousPage, vm.itemPerPage;

        vm.paginate = paginate;
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
                console.log(response);
                // Chargement de liste.
                vm.genres = response.data;

                // Initialisation de la pagination
                vm.totalItem = response.total;
                vm.maxSize = response.per_page;
                vm.itemPerPage = response.per_page;
                vm.currentPage = response.current_page;
                vm.previousPage = vm.currentPage;
            });
        }

        function paginate() {
            // Contrôle de la pagination.
            if (vm.currentPage == vm.previousPage)  {
                return false;
            }

            // Appel du service.
            GenreService.query({
                page: vm.currentPage
            },function (response) {
                // Chargement de liste.
                vm.genres = response.data;

                // Actualisation de la pagination
                vm.totalItem = response.total;
                vm.maxSize = response.per_page;
                vm.itemPerPage = response.per_page;
                vm.previousPage = vm.currentPage;
                vm.currentPage = response.current_page;
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
                    genre: null,
                    title: function () {
                        return 'Ajouter un genre';
                    }
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
                    genre: Object.assign({}, genre),
                    title: function () {
                        return 'Modifier le genre ' + genre.name;
                    }
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
                    genre: genre,
                    title: function () {
                        return 'Supprimer le genre ' + genre.name;
                    }
                }
            });
        }
    }
})();
