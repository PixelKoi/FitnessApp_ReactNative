import datetime
from flask_login import UserMixin
from flask_sqlalchemy import SQLAlchemy
from flask import Flask
from flask_bootstrap import Bootstrap

app = Flask(__name__)
app.config['SECRET_KEY'] = '8BYkEfbA606donzWlsih'
Bootstrap(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///basic.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)


# Meal table stores different meal categories (Breakfast, Lunch, Dinner, Snacks)
class Meal(db.Model):
    __tablename__ = 'meals'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100))
4
# Food table contains information about individual foods, including name, calories, macros
class Food(db.Model):
    __tablename__ = 'foods'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100))
    calories = db.Column(db.Integer)
    macros = db.Column(db.String(100))

# JournalEntry is each journal, linking a specific meal, food, and user
class JournalEntry(db.Model):
    __tablename__ = 'journal_entries'
    id = db.Column(db.Integer, primary_key=True)
    date = db.Column(db.DateTime, default=datetime.datetime.now)
    meal_id = db.Column(db.Integer, db.ForeignKey('meals.id'))
    food_id = db.Column(db.Integer, db.ForeignKey('foods.id'))
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))

# One-To-Many relationship User with multiple journal entries.
class User(UserMixin, db.Model):
    __tablename__ = "users"
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(100), unique=True)
    name = db.Column(db.String(1000))
    journal_entries = db.relationship('JournalEntry', backref='user', lazy=True)


# Create database tables
with app.app_context():
    db.create_all()
