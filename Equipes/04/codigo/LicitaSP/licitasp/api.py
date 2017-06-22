# encoding: utf-8
import os
from datetime import datetime
from flask import Flask, jsonify, request, abort, make_response
from pymongo import MongoClient

api = Flask(__name__)

client = MongoClient()
db = client['licitasp']
acquisitions = db['acquisitions']

@api.route('/api/acquisitions', methods=['GET'])
def get_acquisitions():
    data = []
    if 'modality' in request.args:
        cursor = acquisitions.find({"modality": request.args['modality']}, {"_id": 0})
    elif 'organization' in request.args:
        cursor = acquisitions.find({"organization": request.args['organization']}, {"_id": 0})
    else:
        cursor = acquisitions.find({}, {"_id": 0})
        
    for acquisition in cursor:
        data.append(acquisition)
            
    return jsonify({'acquisitions': data})

api.run(host=os.getenv('IP', '0.0.0.0'),port=int(os.getenv('PORT', 8080)))