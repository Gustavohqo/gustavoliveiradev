/**
 * Created by Gustavo on 30/06/2015.
 */


var app = angular.module('app',[]);

/*
*
*  DESSERT VIEW
*
*  */
app.controller('DessertControler', function($http,$scope){
    var self = this;
    this.dessertList = [];
    $scope.currentPage= 1;

    $http.get('/Dessert').success(function(data){
        for(var i = 0; i < data.length ; i ++){
            self.dessertList.push(data[i]);
        }
        console.log(data.length);
    });
});

/*
*
*  ADD_DESSERT VIEW
*
*  */
app.controller('AddDessertController', function($http,$scope){
    this.dessert = {};
    this.newIngredientFlag = false;
    this.ingredient_list = [];
    $scope.cost = 0.0;
    $scope.portion_amount = 0;

    this.setNewIngrtFlag = function(){
        if(!this.newIngredientFlag) {
            this.newIngredientFlag = true;
        }else{
            this.newIngredientFlag=false;
        }

        console.log(this.newIngredientFlag);
    };

    this.getCost = function() {
        var cost = 0.0;
        for(var i = 0; i < this.ingredient_list.length; i++){
            console.log("custo da sobremesa: ", this.ingredient_list[i].ingredient.total_cost);
            var unit_cost =
            cost = cost + (this.ingredient_list[i].ingredient.total_cost/this.ingredient_list[i].quantity);
        }

        console.log("custo da sobremesa: ", cost);
        cost = cost/$scope.portion_amount;
        return cost;
    };

    this.getIngredientRefer = function(){
        var newIngList = [];
        for(var i = 0; i < this.ingredient_list.length; i++){
            console.log(this.ingredient_list[i].ingredient.key);
            console.log(this.ingredient_list[i].quantity);
            var newIng = {};
            newIng.key = this.ingredient_list[i].ingredient.key;
            newIng.quantity = this.ingredient_list[i].quantity;
            newIngList.push(newIng)    ;
        }

        return newIngList;
    };

    this.addDessert = function() {
        console.log("LOG: addDessert function");
        this.dessert.portion_amount =$scope.portion_amount;
        this.dessert.portion_cost = $scope.cost;
        this.dessert.ingredient_list = this.getIngredientRefer();
        //angular.toJson(this.dessert);
        $http.post('/Dessert', this.dessert).success(function(data){
            console.log(data);
            console.log("Objeto enviado!");
        });
    };

    this.addIngredient = function(newIngredient){
        console.log(newIngredient.ingredient.name);
        console.log(newIngredient.quantity);
        this.ingredient_list.push(newIngredient);
        console.log(this.ingredient_list[0].ingredient.key);
        $scope.cost = this.getCost();
        console.log("custo da sobremesa: ", $scope.cost);
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


    this.loadPage = function() {
        $http.get('/IngredientView').success(function (data) {
            for (var i = 0; i < data.length; i++) {
                self.ingredientList.push(data[i]);
                console.log(data[i]);
            }
        });
    }

    this.loadPage();

    this.delete = function(ingredient) {
        var ingToDelete = ingredient;
        this.key = ingredient.key;
        console.log(ingToDelete);
        $http.delete('/IngredientView/'+ingToDelete.key).success(function(data){
            self.ingredientList = [];
            for(var i = 0; i < data.length; i++) {
                self.ingredientList.push(data[i]);
            }
        });

    };

   this.addIngredient = function(){
       this.ingredient.metric = $scope.metric.name;
       $http.post('/IngredientView',this.ingredient).success(function(data){
           self.ingredientList = [];
           for(var i = 0; i < data.length; i++) {
                console.log("Entrou, data: ", data[i]);
                self.ingredientList.push(data[i]);
                console.log(data[i]);
            }
           self.ingredientList = [];
           self.loadPage();
       });
   };

});

