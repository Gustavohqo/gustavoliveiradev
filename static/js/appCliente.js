var app = angular.module('app',[]);

app.controller('AddClientController', function($http,$scope){
    this.client={};

    this.addClient = function() {
        console.log("LOG: addClient function");
        //angular.toJson(this.client);
        $http.post('/Client', this.client).success(function(data){
            console.log(data);
            console.log("Cliente enviado!");
        });

    };
});






