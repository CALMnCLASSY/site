print("your_app_module.py: Starting...")
from flask import Flask, render_template, request, redirect, url_for, jsonify
print("your_app_module.py: Flask imported.")
from flask_mail import Mail, Message
from bs4 import BeautifulSoup
import feedparser

app = Flask(__name__)
print("your_app_module.py: Flask app created.")

# Configure Flask-Mail
app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 587
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USERNAME'] = 'calmnclassydev@gmail.com'
app.config['MAIL_PASSWORD'] = 'orbn gmyr ecpe fkgo'

mail = Mail(app)
RSS_FEED_URL = 'https://techcrunch.com/feed/'

def extract_image(description):
    soup = BeautifulSoup(description, 'html.parser')
    img = soup.find('img')
    return img['src'] if img else None

@app.route('/')
def home():
    return render_template('home.html')


@app.route('/about')
def about():
    feed = feedparser.parse('https://www.theverge.com/rss/index.xml')
    if 'entries' in feed:
        return render_template('about.html', feed=feed.entries[:3])
    else:
        return render_template('about.html', feed=[])  # Pass an empty list if no entries


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

@app.route('/blog')
def blog():
    feed = feedparser.parse('https://www.theverge.com/rss/index.xml')
    posts = []
    for entry in feed.entries[:5]:  
        posts.append({
            'title': entry.title,
            'link': entry.link,
            'summary': entry.summary,
            'image': extract_image(entry.description) 
        })
    return render_template('blog.html', posts=posts)


if __name__ == '__main__':
    app.run(debug=True)
