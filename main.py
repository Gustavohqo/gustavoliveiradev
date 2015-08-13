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

class Request(ndb.Model):
    name = ndb.StringProperty(indexed=False)
    request_quant = ndb.FloatProperty(indexed=False)
    metric = ndb.StringProperty(indexed=False)
    total_cost = ndb.FloatProperty(indexed=False)

class Dessert(ndb.Model):
    """Model Sobremesa"""
    name = ndb.StringProperty(indexed=False)
    ingredient = ndb.StructuredProperty(Ingredient, repeated=True)
    numb_of_portions = ndb.IntegerProperty(indexed=False)
    portion_cost = ndb.FloatProperty(indexed=False)
    cooker_name = ndb.StringProperty(indexed=False)

class Client(ndb.Model):
    """Model Cliente"""
    name = ndb.StringProperty(indexed=False)
    telephone = ndb.StringProperty(indexed=False)
    request_dest = ndb.StringProperty(indexed=False)


class DessertService(webapp2.RequestHandler):
    def get(self):
        dessertList = json.dumps([dessert.to_dict() for dessert in Dessert.query().fetch()])
        self.response.write(dessertList)

    def post(self):
        logging.debug("LOG: POST-")
        dessert = json.loads(self.request.body)

        newDessert = Dessert()
        newDessert.name = dessert["name"]

        self.response.write(newDessert.name)

class MainClient(webapp2.RequestHandler):
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
 ('/Client', MainClient),
 ('/IngredientView', IngredientService),
 ('/RequestView', RequestService),
], debug=True)