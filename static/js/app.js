/**
 * Created by Gustavo on 30/06/2015.
 */


var app = angular.module('app',[]);

app.controller('AddDessertController', function($http,$scope){
    this.dessert = {};
    this.newIngredientFlag = false;
    this.dessert.ingredientList = [];
    $scope.cost = 0.0;

    this.setNewIngrtFlag = function(){
        if(!this.newIngredientFlag) {
            this.newIngredientFlag = true;
            document.getElementByClass("ingredientButtonPlus").className +=" ingredientButtonMinor";
        }else{
            this.newIngredientFlag=false;
        }

        console.log(this.newIngredientFlag);
    };

    this.getCost = function() {
        var cost = 0.0;
        for(var i = 0; i < this.dessert.ingredientList.length; i++){
            console.log("custo da sobremesa: ", this.dessert.ingredientList[i].ingredient.total_cost);
            var unit_cost =
            cost = cost + (this.dessert.ingredientList[i].ingredient.total_cost/this.dessert.ingredientList[i].quantity);
        }

        console.log("custo da sobremesa: ", cost);
        cost = cost/this.dessert.portionAmount;
        return cost;
    };

    this.addDessert = function() {
        console.log("LOG: addDessert function");
        //angular.toJson(this.dessert);
        $http.post('/Dessert', this.dessert).success(function(data){
            console.log(data);
            console.log("Objeto enviado!");
        });
    };

    this.addIngredient = function(newIngredient){
        console.log(newIngredient.ingredient.name);
        console.log(newIngredient.quantity);
        this.dessert.ingredientList.push(newIngredient);
        console.log(this.dessert.ingredientList[0].ingredient.name);
        $scope.cost = this.getCost();
    };
});

/*
*
*  CONTROLLER TO ADD A INGREDIENT TO A DESSERT AT DESSERT VIEW
*
* */
app.controller('AddToDessertController',function($scope,$http){
    var self = this;
    this.myIngdnt = {};
    this.ingredientList = [];
    this.addIngredientFlag = false;

    this.selectIngredient = function(){
      if(this.myIngdnt.ingredient !== null){
          this.addIngredientFlag = true;
      }else {
          this.addIngredientFlag = false;
      }
    };

    this.clearIngredient = function (){
        this.myIngdnt = {};
        this.addIngredientFlag = false;
    };

    $http.get('/IngredientView').success(function(data){
        for(var i = 0; i < data.length ; i ++){
            self.ingredientList.push(data[i]);
        }
    });



});

/*
*
*  CONTROLLER FOR INGREDIENT VIEW
*
**/
app.controller('AddIngredientController',function($scope,$http,$q){
   this.metricList = [{representation:'L', name:'Litro'}, {representation:'Kg', name:'Quilo'}, {representation:'Un', name:'Unidade'}];
    this.ingredient = {};
    $scope.metric = {};
    var self = this;
    this.ingredientList = [];

    $http.get('/IngredientView').success(function(data){
        for(var i = 0; i < data.length; i ++) {
            self.ingredientList.push(data[i]);
            console.log(data[i]);
        }
    });

   this.addIngredient = function(){
       this.ingredient.metric = $scope.metric.name;
       console.log(this.ingredient.name);
       console.log(this.ingredient.metric);
       console.log(this.ingredient.total_cost);
       console.log(this.ingredient.total_amount);
       $http.post('/IngredientView',this.ingredient).success(function(data){
           console.log(data);
           self.ingredientList.push(self.ingredient);
       });
   };

});





