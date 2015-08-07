/**
 * Created by Gustavo on 30/06/2015.
 */


var app = angular.module('app',[]);

app.controller('AddDessertController', function($http,$scope){
    this.dessert = {};
    this.newIngredientFlag = false;
    this.dessert.ingredientes = [];

    this.setNewIngrtFlag = function(){
        if(!this.newIngredientFlag) {
            this.newIngredientFlag = true;
            document.getElementByClass("ingredientButtonPlus").className +=" ingredientButtonMinor";
        }else{
            this.newIngredientFlag=false;
        }

        console.log(this.newIngredientFlag);
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
        this.dessert.ingredientes.push(newIngredient);
        console.log(this.dessert.ingredientes[0].ingredient.name);
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
      if(this.addIngredientFlag){
          this.addIngredientFlag = false;
      }else {
          this.addIngredientFlag = true;
      }
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
    this.metricList = ['Litro', 'Quilo', 'Unidade'];
    this.ingredient = {};

    var self = this;
    this.ingredientList = [];

    $http.get('/IngredientView').success(function(data){
        for(var i = 0; i < data.length; i ++) {
            self.ingredientList.push(data[i]);
            console.log(data[i]);
        }
    });

   this.addIngredient = function(){
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





