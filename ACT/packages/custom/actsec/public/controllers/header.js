'use strict';

angular.module('mean.system').controller('HeaderController', ['$scope', '$rootScope', 'Menus', 'MeanUser', '$state', '$location', 'USERS',
    function($scope, $rootScope, Menus, MeanUser, $state, $location, USERS) {

        var vm = this;

        vm.menus = {};
        vm.hdrvars = {
            authenticated: MeanUser.loggedin,
            user: MeanUser.user,
            isAdmin: MeanUser.isAdmin
        };

        // Default hard coded menu items for main menu
        var defaultMainMenu = [];

        // Query menus added by modules. Only returns menus that user is allowed to see.
        function queryMenu(name, defaultMenu) {

            Menus.query({
                name: name,
                defaultMenu: defaultMenu
            }, function(menu) {
                vm.menus[name] = menu;
            });
        }

        // Query server for menus and check permissions
        // queryMenu('main', defaultMainMenu);
        // queryMenu('account', []);

        $scope.isCollapsed = false;

        $rootScope.$on('loggedin', function() {
            // queryMenu('main', defaultMainMenu);

            vm.hdrvars = {
                authenticated: MeanUser.loggedin,
                user: MeanUser.user,
                isAdmin: MeanUser.isAdmin
            };
        });

        vm.logout = function() {
            MeanUser.logout();
        };

        vm.toLogout = function() {
            $location.path('/logout');
        }

        $rootScope.$on('logout', function() {
            vm.hdrvars = {
                authenticated: false,
                user: {},
                isAdmin: false
            };
            // queryMenu('main', defaultMainMenu);
            $location.path('/login');
        });

        vm.profileManage = function() {
            $location.path(USERS.URL_PATH.USER_PROFILE_MANAGE);
        };

        vm.viewAll = function() {
            $location.path(USERS.URL_PATH.USER_PROFILE);
        };
    }
]);
