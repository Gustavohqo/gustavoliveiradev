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
    portion_amount = ndb.IntegerProperty(indexed=False)
    portion_cost = ndb.FloatProperty(indexed=False)
    cooker_name = ndb.StringProperty(indexed=False)


class Client(ndb.Model):
    """Model Cliente"""
    name = ndb.StringProperty(indexed=False)
    telephone = ndb.StringProperty(indexed=False)
    request = ndb.StructuredProperty(Request, repeated=True)


class Request(ndb.Model):
    name = ndb.StringProperty(indexed=False)
    total_amount = ndb.FloatProperty(indexed=False)
    metric = ndb.StringProperty(indexed=False)
    total_cost = ndb.FloatProperty(indexed=False)


class DessertService(webapp2.RequestHandler):
    def get(self):
        dessert_list = json.dumps([dessert.to_dict() for dessert in Dessert.query().fetch()])
        self.response.write(dessert_list)

    def get_ingredient_list(self, data):

        ing = []
        for ingredient in data:
            ing.append(ingredient)
        return ing

    def post(self):
        logging.debug("LOG: POST- On DessertService")
        dessert = json.loads(self.request.body)
        #
        # newDessert = Dessert()
        # newDessert.name = dessert["name"]
        # newDessert.ingredient_list = self.___get_ingredient_list(dessert["ingredient_list"])
        # newDessert.cooker_name = dessert["cooker_name"]
        # newDessert.numb_of_portions = dessert["portion_amount"]
        # newDessert.portion_cost = dessert["portion_cost"]
        #
        # newDessert.put()
        logging.debug(dessert["ingredient_list"])

    # ___get_ingredient_list = get_ingredient_list


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

        self.response.write(newClient.name)


class IngredientService(webapp2.RequestHandler):
    def get(self):
        ingredientList = json.dumps([ing.to_dict() for ing in Ingredient.query().fetch()])
        self.response.write(ingredientList)

    def post(self):
        newIngredient = json.loads(self.request.body)
        ingredient = Ingredient()
        ingredient.name = newIngredient["name"]
        ingredient.total_amount = newIngredient["total_amount"]
        ingredient.metric = newIngredient["metric"]
        ingredient.total_cost = newIngredient["total_cost"]
        ingredient.put()


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


app = webapp2.WSGIApplication([
 ('/Dessert', DessertService),
 ('/Client', ClientService),
 ('/IngredientView', IngredientService),
 ('/RequestView', RequestService),
], debug=True)