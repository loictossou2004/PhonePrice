"""A Python Flask REST API BoilerPlate (CRUD) Style"""

import argparse
import os
from flask import Flask, jsonify, make_response, session
from flask_cors import CORS
from modules.phone import REQUEST
from modules.categories import CATEGORIES_REQUEST
from modules.utils import error_response, success_response
import dotenv

APP = Flask(__name__)  # Crée une instance de l'application Flask
CORS(APP, origins="*")

### swagger specific ###
@APP.errorhandler(400)
def bad_request(error):
    return error_response(message=str(error), code=400)

@APP.errorhandler(500)
def server_error(error):
    return error_response(message=str(error), code=500)

@APP.route('/', methods=['GET'])
def api_home():
    return success_response(message="Welcome to the API Server for Phone Pricing Services")

APP.register_blueprint(REQUEST, url_prefix='/api/phone')
APP.register_blueprint(CATEGORIES_REQUEST, url_prefix='/api/categories')

if __name__ == '__main__':

    PORT = int(os.environ.get('PORT', 5000))
    CORS = CORS(APP, resources={r"/*": {'origins':"*", 'methods': '*'}})
    dotenv.load_dotenv()
    APP.run(host='0.0.0.0', port=PORT, debug=True)