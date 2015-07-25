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
        console.log(newIngredient.name);
        this.dessert.ingredientes.push(newIngredient);
        console.log(this.dessert.ingredientes[0].name);
    };
});


app.controller('AddIngredientController',function(){
    this.ingredient = {};
    this.editIngredient = function(edited){
        //TODO
    };

    this.clearIngredient = function(){
        this.ingredient = {};
        console.log('clean');
    };
});





