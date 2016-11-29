angular.module('inspinia')
.service('security', function ($http) {
  var service = this
   var validateByAND = function (rolesInString, userRoles) {
        if (!rolesInString) return true;
        var roles = rolesInString.split('+');
        for (var i = 0; i < roles.length; i++) {

            if (!Enumerable.From(userRoles).Any(function (x) { return x.toLowerCase() === roles[i].trim().toLowerCase() })) {
                return false;//if user doesn't have each role from roles (rolesInString separated by plus sign)
            }
        }
        return true;
    };
    service.Login = function (model) {
        return executeAPI($http, 'POST', URI_Node + 'Autenticacao/Login', model)
    };

    service.AddUsuario = function (model) {
        return executeAPI($http, 'POST', URI_Node + 'Autenticacao', model)
    };
    service.hasRole = function(roles, session){
        var hasAccess = false;
        if (roles && roles.length > 0) {
            hasAccess = Enumerable.From(roles).Any(function (role) {
                return validateByAND(role, session.get().user.Roles);
            });
        } else {
            hasAccess = true;
        }
        return hasAccess;

    }
})
