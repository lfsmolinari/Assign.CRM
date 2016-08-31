angular.module('inspinia')
.factory('authToken', function ($window, $location, $timeout) {
  var storage = $window.localStorage;
  var cachedToken;
  var cachedSession;
  var userSession = 'userSession';
  var userToken = 'userToken'
  var authToken = {
        setSession: function(session){
            cachedSession = JSON.stringify(session);
            storage.setItem(userSession, cachedSession);
            this.setToken(session.token);
        },
        get: function () {
            if(!cachedSession)
                cachedSession = storage.getItem(userSession);
            return JSON.parse(cachedSession);
        },
        setToken: function (token) {
            cachedToken = token;
            storage.setItem(userToken, token)
        },
        getToken: function () {
            if(!cachedToken)
                cachedToken = storage.getItem(userToken);
            return cachedToken
        },
        isAuthenticated: function () {
            return !!authToken.getToken();
        },
        logout:function () {
            cachedToken = null;
            storage.removeItem(userToken);
            storage.removeItem(userSession);
        },
        checkRouteRoles: function (state) {
            debugger;
            if (state.secure == undefined) {
                throw "State security is not defined, please configure the state properties [secure, roles, ...] in states.js";
            }
            var hasAccess = true;
            var srv = this;
            if (state.secure) {
                if (!this.isAuthenticated()) {
                    $location.path("/login");
                    return false;
                }
                else if (state.roles && state.roles.length > 0) {
                    hasAccess = Enumerable.From(state.roles).Any(function (role) { return srv.get().user.Roles.indexOf(role) !== -1; });
                }
            }
            if (!hasAccess) {
                $timeout(function(){
                    $location.path("/accessDenied");
                });
            }
            return hasAccess;
        },
  };
  return authToken;
});
