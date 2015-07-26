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


app.controller('AddIngredientController',function($scope,$http){
    this.ingredientAdded= {};
    this.addIngredientFlag = false;
    this.ingredientList = [];
    this.myIngdnt = null;
    this.ingredientAmount = null;

    $http.get('/Ingredient').success(function(data){
        $scope.ingredientList = data;
        if($scope.ingredientList.length === 0) {
            console.log('data = 0');
            $scope.ingredientList = [{name:'Teste1', cost:2.00}, {name:'Teste2',cost:1.70}, {name:'Teste3', cost: 1.95}];
        }
    });

    this.addToDessert = function(){
        if( this.ingredientAmount !== null) {
            this.ingredientAdded.ingredient = this.myIngdnt;
            this.ingredientAdded.ingredientAmount = this.ingredientAmount;
            return this.ingredientAdded;
        }
    };

    this.selectIngredient = function(){
        if(this.myIngdnt === null) {
            this.addIngredientFlag = false;
            this.clearIngredient();
        }else{
            this.addIngredientFlag=true;
        }
        console.log('flag: ', this.addIngredientFlag)
    };

    this.editIngredient = function(edited){
        //TODO
    };

    this.clearIngredient = function(){
        this.addIngredientFlag = false;
        this.myIngdnt = null;
        this.ingredientAmount = null;
        this.ingredientAdded = {};
        console.log('clean');
    };
});





