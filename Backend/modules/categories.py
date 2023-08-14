from user_agents import parse
from flask import Blueprint, request
import jwt, json
from .utils import *
from flask_cors import cross_origin
from fpdf import FPDF
from flask import abort, redirect, url_for
from bson import ObjectId

CATEGORIES = database["categories"]


# Création d'un Blueprint pour les requêtes relatives aux contacts
CATEGORIES_REQUEST = Blueprint('categories', __name__)


@CATEGORIES_REQUEST.route('', methods=['GET'])
def get_categories():
    try:
        data = []
        found_categories = list(CATEGORIES.find())
        if len(found_categories) == 0:
            return success_response(message="empty categories", data=data)
        for category in found_categories:
            data.append({
                'category': category.get('category'),
                'options': category.get('options'),
            })
        return success_response(data=data)
    except Exception as error:
        return error_response(message=str(error), code=500)


@CATEGORIES_REQUEST.route('/create', methods=['POST'])
@cross_origin()
def create_categories():
    try:
        data = request.get_json(force=True)
        if not data:
            return error_response(message="No data provided")
        
        category = data.get('category', '')
        options = data.get('options', {})
        if not category:
            return error_response(message="No category provided")
        category = category.lower()
        if category not in ["telephone", "battery",]:
            return error_response(message="Invalid category provided")
    
        if not options:
            return error_response(message="No options provided")

        found_category = CATEGORIES.find_one({'category': category})
        if not found_category:
            new_category = {
                'category': category,
                'options': {}
            }
            CATEGORIES.insert_one(new_category)
            found_category = CATEGORIES.find_one({"category": category})

        exist_options = found_category["options"]
        
        for key, value in options.items():
            if key not in exist_options:
                exist_options.update({key.lower(): value})

        CATEGORIES.update_one({'category': category}, {'$set': {'options': exist_options}})

        return success_response(code=200, data={
            'category': category,
            'options': exist_options
        })
    except Exception as error:
        return error_response(message=str(error), code=500)

@CATEGORIES_REQUEST.route('/update/<string:category>', methods=['PUT'])
@cross_origin()
def update_categories(category):
    try:
        to_update = {}
        data = request.get_json(force=True)
        if not data:
            return error_response(message=" No data provided")
        
        found_category = CATEGORIES.find_one({"category": category})
        if not found_category:
            return error_response(message="Categorie not found. Please proceed with creating a new category")

        exist_options = found_category["options"]


        if 'options' not in data:
            return error_response(message="Please provide options you want to update")
        
        new_options = data.get('options')

        for key, value in new_options.items():
            if key.lower() in exist_options:
                if exist_options[key.lower()] != value:
                    exist_options.update({key.lower(): value})
                    to_update.update({key.lower(): value})
            else:
                exist_options.update({key.lower(): value})
                to_update.update({key.lower(): value})

        if len(to_update) > 0:
            CATEGORIES.update_one({"category": category}, {"$set": {"options": exist_options}})
            return success_response(code=200, message="Categorie updated successfully", data={
                'category': category,
                'options': exist_options
            })
        
        return success_response(message="No changes were made")
    except Exception as error:
        return error_response(message=str(error), code=500)
    
@CATEGORIES_REQUEST.route('/delete/<string:category>', methods=['DELETE'])
def delete_categories(category):
    try:
        data = request.get_json(force=True)
        if not data:
            return error_response(message="No data provided")
        
        
        found_category = CATEGORIES.find_one({"category": category})
        if not found_category:
            return error_response(message="Categorie not found")
        
        exist_options = found_category["options"]

        options_to_delete = data.get('delete')

        if not options_to_delete:
            return error_response(message="Please provide options you want to delete")
        options_to_delete = [value.lower() for value in options_to_delete]
 

        new_options = {cle: valeur for cle, valeur in exist_options.items() if cle not in options_to_delete}


        CATEGORIES.update_one({"category": category}, {"$set": {"options": new_options}})
        return success_response(code=204)
    except Exception as error:
        return error_response(message=str(error), code=500)
