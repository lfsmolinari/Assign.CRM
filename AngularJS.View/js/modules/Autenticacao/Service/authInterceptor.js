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
            }
            return response;
        }
    }
}]);
