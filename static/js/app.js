/**
 * Created by Gustavo on 30/06/2015.
 */


var app = angular.module('app',[]);

app.controller('AddDessertController', function($http,$scope){
    this.dessert={};
    this.newIngredientFlag = false;

    this.setNewIngrtFlag = function(flag){
        this.newIngredientFlag = flag;
        console.log(this.newIngredientFlag);
    };

    this.addDessert = function() {
        console.log("LOG: addDessert function");
        //angular.toJson(this.dessert);
        $http.post('/Dessert', this.dessert).success(function(data){
            console.log(data);
            console.log("Objeto enviado!");
        });

        //$http.get('/Dessert').success(function(data){
        //    console.log(data);
        //});



    };
});






