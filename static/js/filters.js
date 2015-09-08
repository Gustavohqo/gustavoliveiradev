/**
 * Created by Gustavo on 08/09/2015.
 */
var app = angular.module('app.filters',[]);


app.filter('phone', phone);
phone.$inject = [];

function phone($filter){
    return function(number){
            number = number.toString();
           if( number.length < 11){
               return number;
           } else {
               state = number.slice(0,2);
               tel = number.slice(2);

               number = '(' +state + ')';
               tel = tel.slice(0,5) + '-' + tel.slice(5);

               number = number + tel;
               return number;
           }
    }
}
