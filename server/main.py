from flask import Flask, flash, abort, g, jsonify, render_template, request, redirect, url_for
import json
import datetime
import smtplib
import os
from models import app, db
from serialize import FoodSchema, JournalEntrySchema, UserSchema
with app.app_context():
    db.create_all()

# initiating my serializers
food_schema = FoodSchema()
journal_schema = JournalEntrySchema()
user_schema = UserSchema()

@app.route('/')
def home(page=1):  # put application's code here
    return render_template('index.html')


# simple add_meal route
@app.route('/add', methods = ['POST'])
def meal():  # put application's code here
    name = request.json['name']


# test dummy data for api
@app.route('/food')
def food(page=1):  # put application's code here
    return {"foods": ["Chicken", "BEEF", "PORK"]}



if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=1133)

