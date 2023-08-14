# Import des packages
import os
from flask import jsonify
from pymongo import MongoClient

# Fonction pour obtenir une valeur d'une variable d'environnement
def get_env_value(key):
    return os.getenv(key, None)

# Connexion à la base de données
connexion_to_db = MongoClient(get_env_value('DATABASE_URL'), connect=False, timeoutMS=100000)
database = connexion_to_db['PhonePrice']



# Fonction pour générer une réponse réussie
def success_response(status=True, message=None, data={}, code=200):
    return jsonify({
        "status": status,
        "message": message,
        "data": data
    }), code

# Fonction pour générer une réponse d'erreur
def error_response(status=False, message=None, data={}, code=400):
    return jsonify({
        "status": status,
        "message": message,
        "data": data
    }), code
