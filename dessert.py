# from django.http.response import HttpResponse
#
# __author__ = 'Gustavo'
# import cgi
# import urllib
#
# from google.appengine.ext import ndb
#
# import webapp2
#
# class Ingredient(ndb.Model):
#     amount_per_recipe = ndb.BooleanProperty(indexed=False)
#     total_amount = ndb.BooleanProperty(indexed=False)
#     metric = ndb.StringProperty(indexed=False)
#     total_cost = ndb.BooleanProperty(indexed=False)
#     unit_cost = ndb.BooleanProperty(indexed=False)
#
# class Dessert(ndb.Model):
#     """Model Sobremesa"""
#     name = ndb.StringProperty(indexed=False)
#     ingredient = ndb.StructuredProperty(Ingredient, repeated=True)
#     numb_of_portions = ndb.IntegerProperty(indexed=False)
#     portion_cost = ndb.BooleanProperty(indexed=False)
#
# class Main(webapp2.RequestHandler):
#     def get(self):
#         self.response.write("Bem vindo")
#
#
# app = webapp2.WSGIApplication([
#     ('/', Main),
# ], debug=True)