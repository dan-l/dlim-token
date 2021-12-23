from flask import Flask, request
import logging
import os


from app.routes import blueprint_routes

app = Flask(__name__)

#Config
app.config.from_object('config')

if not app.config['INFURA_HTTP_PROVIDER_ENDPOINT']:
  raise Exception('INFURA_HTTP_PROVIDER_ENDPOINT is not defined')


# Blueprint
app.register_blueprint(blueprint_routes, url_prefix='/api/v1')


