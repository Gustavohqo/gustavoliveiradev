var app = angular.module('app',[]);

/*
*
*  CLIENT VIEW
*
*  */
app.controller('ClientControler', function($http){
    var self = this;
    this.clientList = [];

    $http.get('/client').success(function(data){
        for(var i = 0; i < data.length ; i ++){
            self.clientList.push(data[i]);
        }
        console.log(data.length);
    });
});

/*
*
*  ADD_CLIENT VIEW
*
*  */
app.controller('AddClientController', function($http,$scope){
    this.client = {};


    this.addClient = function() {
        console.log("LOG: addClient function");
        $http.post('/client', this.client).success(function(data){
            console.log(data);
            console.log("Objeto enviado!");
        });
    };


});

/*
*
*  CONTROLLER FOR REQUEST VIEW
*
**/
app.controller('AddRequestController',function($scope,$http,$q){
    var self = this;
    this.request = {};
    this.requestList = [];

    $http.get('/request').success(function(data){
        for(var i = 0; i < data.length; i ++) {
            self.requestList.push(data[i]);
            console.log(data[i]);
        }
    });

   this.addRequest = function(){

       console.log(this.request.name);
       console.log(this.request.total_amount);

       console.log(this.request.total_cost);


       $http.post('/request',this.request).success(function(data){
           console.log(data);
           self.requestList.push(self.request);
       });
   };

});









