import os
from flask import Flask, render_template, request, url_for, redirect
from flask_sqlalchemy import SQLAlchemy
from models import db, app

from sqlalchemy.sql import func





@app.route('/')
def home(page=1):  # put application's code here
    return render_template('index.html')





if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=8000)