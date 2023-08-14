from user_agents import parse
from flask import Blueprint, request
import jwt, json
from .utils import *
from flask_cors import cross_origin
from fpdf import FPDF


connexion = MongoClient(get_env_value('DATABASE_URL'))  # Initialise la connexion à la base de données MongoDB
db = connexion['PhonePrice']  # Sélectionne la base de données 'PhonePrice+'
phone = db['phone']


# Création d'un Blueprint pour les requêtes relatives aux contacts
REQUEST = Blueprint('phone', __name__)

@REQUEST.route('/pdf', methods=['POST'])
@cross_origin()
def create_pdf():
    try:
        pdf = FPDF()
        pdf.add_page()
        pdf.set_font("Arial", size = 15)
        pdf.cell(200, 10, txt = "GeeksforGeeks",
                ln = 1, align = 'C')
        pdf.cell(200, 10, txt = "A Computer Science portal for geeks.",
                ln = 2, align = 'C')
        pdf.output("GFG.pdf")
        return success_response(code=200)
    except Exception as error:
        return error_response(message=str(error), code=500)  # Retourne une réponse d'erreur avec le message d'erreur
