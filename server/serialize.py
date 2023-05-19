from flask_marshmallow import Marshmallow
from marshmallow_sqlalchemy import SQLAlchemyAutoSchema
from marshmallow import fields
from models import app, db

ma = Marshmallow(app)


class FoodSchema(ma.Schema):
    class Meta:
        fields = ('id', 'name', 'calories', 'macros', 'meal_category')


class JournalEntrySchema(ma.Schema):
    class Meta:
        fields = ('id', 'date', 'meal_id', 'food_id', 'user_id')


class UserSchema(ma.Schema):
    journal_entries = fields.Nested(JournalEntrySchema, many=True)

    class Meta:
        fields = ('id', 'email', 'name', 'journal_entries')











