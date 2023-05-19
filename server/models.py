from flask_login import UserMixin, login_user, LoginManager, login_required, current_user, logout_user
from flask_sqlalchemy import SQLAlchemy
from flask import Flask, render_template, request, redirect, url_for
from flask_bootstrap import Bootstrap
from sqlalchemy.orm import relationship
from sqlalchemy_utils import  ChoiceType


## CHOICES IMPORT
## https://sqlalchemy-utils.readthedocs.io/en/latest/data_types.html#module-sqlalchemy_utils.types.choice

app = Flask(__name__)
app.config['SECRET_KEY'] = '8BYkEfbA606donzWlsih'
Bootstrap(app)
app = Flask(__name__)

## CONNECT TO DB
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///posts.db'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///users.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)




## CREATE DATABASE
with app.app_context():
    db.create_all()