var app = angular.module('app',[]);

/*
*
*  CLIENT VIEW
*
*  */
app.controller('ClientControler', function($http){
    var self = this;
    this.clientList = [];

    $http.get('/Client').success(function(data){
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
    this.newRequestFlag = false;
    this.client.resquestList = [];
    $scope.cost = 0.0;

    this.setNewRqstFlag = function(){
        if(!this.newRequestFlag) {
            this.newRequestFlag = true;
            document.getElementByClass("ingredientButtonPlus").className +=" ingredientButtonMinor";
        }else{
            this.newRequestFlag=false;
        }

        console.log(this.newRequestFlag);
    };

    this.getCost = function() {
        var cost = 0.0;
        for(var i = 0; i < this.client.resquestList.length; i++){
            console.log("custo dos pedidos: ", this.client.resquestList[i].request.total_cost);
            var unit_cost =
            cost = cost + (this.client.resquestList[i].request.total_cost/this.client.resquestList[i].quantity);
        }

        console.log("custo dos pedidos: ", cost);
        cost = cost/this.client.portionAmount;
        return cost;
    };

    this.addClient = function() {
        console.log("LOG: addClient function");
        $http.post('/Client', this.client).success(function(data){
            console.log(data);
            console.log("Objeto enviado!");
        });
    };

    this.addRequest = function(newRequest){
        console.log(newRequest.request.name);
        console.log(newRequest.quantity);
        this.client.resquestList.push(newRequest);
        console.log(this.client.resquestList[0].request.name);
        $scope.cost = this.getCost();
    };
});

/*
*
*  CONTROLLER TO ADD A REQUEST TO A CLIENT AT CLIENT VIEW
*
* */
app.controller('AddToRequestController',function($scope,$http){
    var self = this;
    this.myRqst = {};
    this.requestList = [];
    this.addRequestFlag = false;

    this.selectRequest = function(){
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

    $http.get('/RequestView').success(function(data){
        for(var i = 0; i < data.length ; i ++){
            self.resquestList.push(data[i]);
        }
    });



});


/*
*
*  CONTROLLER FOR REQUEST VIEW
*
**/
app.controller('AddRequestController',function($scope,$http,$q){
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









