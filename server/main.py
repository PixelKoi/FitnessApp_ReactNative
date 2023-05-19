from flask import Flask, flash, abort, g, jsonify, render_template, request, redirect, url_for
import json
import datetime
import smtplib
import os
from models import app, db


@app.route('/')
def home(page=1):  # put application's code here
    return render_template('index.html')




if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=1133)

