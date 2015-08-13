var app = angular.module('app',[]);

app.controller('AddClientController', function($http,$scope){
    this.client = {};
    $scope.metric = {};
    var self = this;
    this.clientList = [];
    this.requestList = [];

   this.addClient = function(){
       this.client.metric = $scope.metric.name;
       console.log(this.client.name);
       console.log(this.client.telephone);


       $http.post('/Client', this.client).success(function(data){
           console.log(data);
           self.clientList.push(self.client);
       });
   };

    this.getCost = function() {
        var cost = 0.0;
        for(var i = 0; i < this.client.requestList.length; i++){
            console.log("valor do pedido: ", this.this.client.requestList[i].request.total_cost);
            var unit_cost =
            cost = cost + (this.client.requestList[i].request.total_cost/this.client.requestList[i].quantity);
        }

        console.log("valor do pedido: ", cost);
        cost = cost/this.client.portionAmount;
        return cost;
    };

    this.addRequest = function(newRequest){
        console.log(newRequest.request.name);
        console.log(newRequest.quantity);
        this.client.requestList.push(newRequest);
        console.log(this.client.requestList[0].request.name);
        $scope.cost = this.getCost();
    };
});

/*
*
*  CONTROLLER TO ADD A REQUEST TO A CLIENT AT CLIENT VIEW
*
* */
app.controller('AddClientController',function($scope,$http){
    var self = this;
    this.myRqst = {};
    this.requestList = [];
    this.addRequestFlag = false;

    this.selectDessert = function(){
      if(this.myRqst.request !== null){
          this.addRequestFlag = true;
      }else {
          this.addRequestFlag = false;
      }
    };

    this.clearRequest = function (){
        this.myRqst = {};
        this.addRequestFlag = false;
    };

    $http.get('/RequesttView').success(function(data){
        for(var i = 0; i < data.length ; i ++){
            self.requestList.push(data[i]);
        }
    });


});

/*
*
*  CONTROLLER FOR REQUEST VIEW
*
**/
app.controller('AddRequestController',function($scope,$http,$q){
  // this.metricList = [{representation:'L', name:'Litro'}, {representation:'Kg', name:'Quilo'}, {representation:'Un', name:'Unidade'}];
    this.request = {};
    $scope.metric = {};
    var self = this;
    this.requestList = [];

    $http.get('/RequestView').success(function(data){
        for(var i = 0; i < data.length; i ++) {
            self.requestList.push(data[i]);
            console.log(data[i]);
        }
    });

   this.addRequest = function(){
       this.request.metric = $scope.metric.name;
       console.log(this.request.name);
       console.log(this.request.metric);
       console.log(this.request.total_cost);
       console.log(this.request.request_quant);
       $http.post('/RequestView',this.request).success(function(data){
           console.log(data);
           self.requestList.push(self.request);
       });
   };

});









