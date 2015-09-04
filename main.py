import logging
from google.appengine.ext.db import to_dict

__author__ = 'Gustavo'
import cgi
import urllib

from google.appengine.ext import ndb
import json


import webapp2


class Ingredient(ndb.Model):
    name = ndb.StringProperty(indexed=False)
    total_amount = ndb.FloatProperty(indexed=False)
    metric = ndb.StringProperty(indexed=False)
    total_cost = ndb.FloatProperty(indexed=False)


class UsedIngredient(ndb.Model):
    ingredient = ndb.StructuredProperty(Ingredient, indexed=False)
    total_amount = ndb.FloatProperty(indexed=False)


class Dessert(ndb.Model):
    """Model Sobremesa"""
    name = ndb.StringProperty(indexed=False)
    ingredient_list = ndb.StructuredProperty(UsedIngredient, repeated=True)
    numb_of_portions = ndb.IntegerProperty(indexed=False)
    portion_cost = ndb.FloatProperty(indexed=False)
    cooker_name = ndb.StringProperty(indexed=False)

class Request(ndb.Model):
    name = ndb.StringProperty(indexed=False)
    total_amount = ndb.FloatProperty(indexed=False)
    metric = ndb.StringProperty(indexed=False)
    total_cost = ndb.FloatProperty(indexed=False)

class Client(ndb.Model):
    """Model Cliente"""
    name = ndb.StringProperty(indexed=False)
    telephone = ndb.StringProperty(indexed=False)


class Request(ndb.Model):
    name = ndb.StringProperty(indexed=False)
    total_amount = ndb.FloatProperty(indexed=False)
    metric = ndb.StringProperty(indexed=False)
    total_cost = ndb.FloatProperty(indexed=False)



class IngredientService(webapp2.RequestHandler):
    def get(self):
        ingredient = []
        for ing in Ingredient.query().fetch():
            temp = ing.to_dict()
            temp['key'] = ing.key.urlsafe()
            ingredient.append(temp)

        ingredientList = json.dumps(ingredient)
        self.response.write(ingredientList)

    def post(self):
        newIngredient = json.loads(self.request.body)
        ingredient = Ingredient()
        ingredient.name = newIngredient["name"]
        ingredient.total_amount = newIngredient["total_amount"]
        ingredient.metric = newIngredient["metric"]
        ingredient.total_cost = newIngredient["total_cost"]
        ingredient.put()


class DessertService(webapp2.RequestHandler):
    @classmethod
    def get_ingredient_list(cls, data):
        ing = []
        for ingredient in data:
            used_ingredient = UsedIngredient()
            logging.debug('Tamanho da Key: %d', len(ingredient['key']))
            used_ingredient.ingredient = ndb.Key(urlsafe=ingredient['key']).get()
            used_ingredient.total_amount = ingredient['quantity']
            ing.append(used_ingredient)

        return ing

    def get(self):
        dessert_list = json.dumps([dessert.to_dict() for dessert in Dessert.query().fetch()])
        self.response.write(dessert_list)

    def post(self):
        logging.debug("LOG: POST- On DessertService")
        dessert = json.loads(self.request.body)

        newDessert = Dessert()
        newDessert.name = dessert["name"]
        newDessert.cooker_name = dessert["cooker_name"]
        self.get_ingredient_list(dessert["ingredient_list"])
        newDessert.numb_of_portions = dessert["portion_amount"]
        newDessert.portion_cost = dessert["portion_cost"]

        newDessert.put()



class RequestService(webapp2.RequestHandler):
    def get(self):
        requestList = json.dumps([ing.to_dict() for ing in Request.query().fetch()])
        self.response.write(requestList)
    def post(self):
        newRequest = json.loads(self.request.body)
        request = Request()
        request.name = newRequest["name"]
        request.request_quant = newRequest["request_quant"]
        request.metric = newRequest["metric"]
        request.total_cost = newRequest["total_cost"]
        request.put()

class ClientService(webapp2.RequestHandler):
    def get(self):
        clientList = json.dumps([client.to_dict() for client in Client.query().fetch()])
        self.response.write(clientList)

    def post(self):
        logging.debug("LOG: POST-")
        client = json.loads(self.request.body)

        newClient= Client()
        newClient.name = client["name"]
        newClient.telephone = client["telephone"]
        newClient.put()
        self.response.write(newClient.name)


app = webapp2.WSGIApplication([
 ('/Dessert', DessertService),
 ('/Client', ClientService),
 ('/IngredientView', IngredientService),
 ('/RequestView', RequestService),
], debug=True)