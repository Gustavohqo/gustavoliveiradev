var app = angular.module('app',["app.filters","ui.mask"]);

/*
*
*  CLIENT VIEW
*
*  */
app.controller('ClientControler', function($http){
    var self = this;
    this.clientList = [];

    // GET
    $http.get('/Client').success(function(data){
        for(var i = 0; i < data.length ; i ++){
            self.clientList.push(data[i]);
        }
    });

    // DELETE
    this.deleteClient = function(key){
        $http.delete('/Client/' + key).success(function(data){
            self.clientList = [];
            for(var i = 0; i < data.length ; i ++){
                self.clientList.push(data[i]);
            }
        });
    }
});

/*
*
*  ADD_CLIENT VIEW
*
*  */
app.controller('AddClientController', function($http,$scope, $window){
    this.client = {};
    this.client.telephone = null;
    this.addClient = function() {
        $http.post('/Client', this.client).success(function(data){
            console.log(data);
        });
        $window.location.href = "/client"
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









