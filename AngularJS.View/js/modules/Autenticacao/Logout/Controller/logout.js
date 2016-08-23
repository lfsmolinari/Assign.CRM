angular.module('inspinia')
.controller('LogoutCtrl', ['$scope', 'authToken', '$state',
function ($scope, authToken, $state) {
    authToken.logout();
    $state.go('login');
}]);
