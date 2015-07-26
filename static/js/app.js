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


app.controller('AddIngredientController',function($scope,$http){
    this.ingredient = {};
    this.addIngredientFlag = false;
    this.ingredientList = [];

    $http.get('/Ingredient').success(function(data){
        $scope.ingredientList = data;
        if($scope.ingredientList.length === 0) {
            console.log('data = 0');
            $scope.ingredientList = ['Feijao', 'Farinha', 'Arroz'];
        }
    });

    this.selectIngredient = function(){
        if(this.myIngdnt === null) {
            this.addIngredientFlag = false;
        }else{
            this.addIngredientFlag=true;
        }
        console.log('flag: ', this.addIngredientFlag)
    }

    this.myIngdnt = null;

    this.editIngredient = function(edited){
        //TODO
    };

    this.clearIngredient = function(){
        this.ingredient = {};
        console.log('clean');
    };
});





