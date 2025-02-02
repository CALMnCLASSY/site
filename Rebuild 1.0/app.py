from flask import Flask, render_template, request, redirect, url_for, jsonify
from flask_mail import Mail, Message
import feedparser

app = Flask(__name__)

# Configure Flask-Mail
app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 587
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USERNAME'] = 'calmnclassydev@gmail.com'  # Replace with your email
app.config['MAIL_PASSWORD'] = 'orbn gmyr ecpe fkgo'  # Replace with your app password

mail = Mail(app)
RSS_FEED_URL = 'https://techcrunch.com/feed/'

@app.route('/')
def home():
    return render_template('home.html')


@app.route('/about')
def about():
    return render_template('about.html')


@app.route('/services')
def services():
    return render_template('services.html')


@app.route('/contact')
def contact():
    return render_template('contact.html')


@app.route('/send_message', methods=['POST'])
def send_message():
    name = request.form['name']
    email = request.form['email']
    message = request.form['message']

    msg = Message("New Message from CalmnClassy Dev",
                  sender="noreply@calmnclassy.dev",
                  recipients=["calmnclassydev@gmail.com"])
    msg.body = f"Name: {name}\nEmail: {email}\n\nMessage:\n{message}"

    mail.send(msg)

    print("Message sent successfully")
    return jsonify({"success": True})

@app.route('/rss')
def rss():
    feed = feedparser.parse(RSS_FEED_URL)
    return render_template('rss.html', feed=feed.entries)


if __name__ == '__main__':
    app.run(debug=True)
