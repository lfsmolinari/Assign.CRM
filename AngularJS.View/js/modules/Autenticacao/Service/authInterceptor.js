angular.module('inspinia')
.factory('authInterceptor', ['authToken','$injector',function (authToken, $injector) {
    return{
        request: function (config) {
            var token = authToken.getToken();

            if(token)
                config.headers.Authorization = 'Bearer ' + token;
            return config;
            
        },
        responseError: function (response) {
            if(response.status === 401){
                authToken.logout();
                $injector.get('$state').go("login");
                throw "401 (Unauthorized)";
            }
            if(response.status === 403){
                $injector.get('$location').path("/accessDenied");
                throw "403 (Forbidden)";
            }
            //return response;
        }
    }
}]);
