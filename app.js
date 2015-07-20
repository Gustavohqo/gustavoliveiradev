/**
 * Created by Gustavo on 30/06/2015.
 */
(function() {
    var user;

    var app = angular.module('teste', []);

    app.controller('UserTest', function(){
        user = $http.get('/testPage');
    });

})();




