print("your_app_module.py: Starting...")
from flask import Flask, render_template, request, redirect, url_for, jsonify
print("your_app_module.py: Flask imported.")
from flask_mail import Mail, Message
from bs4 import BeautifulSoup
import feedparser

app = Flask(__name__)
print("your_app_module.py: Flask app created.")

# Set secret key for session management
app.config['SECRET_KEY'] = 'c95bab89d38495607082f8bc63b4b64a32e77e7823ac029f375d68d7c37100c4'

# Configure Flask-Mail
app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 587
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USERNAME'] = 'joshuajoee204@gmail.com'
app.config['MAIL_PASSWORD'] = 'orbn gmyr ecpe fkgo'

mail = Mail(app)
RSS_FEED_URL = 'https://techcrunch.com/feed/'

@app.route('/')
def home():
    # Fetch RSS feed for the blog section
    try:
        feed = feedparser.parse(RSS_FEED_URL)
        if 'entries' in feed and feed.entries:
            return render_template('home.html', feed=feed.entries[:3])
        else:
            return render_template('home.html', feed=[])
    except Exception as e:
        print(f"Error fetching RSS feed: {e}")
        return render_template('home.html', feed=[])

def extract_image(description):
    soup = BeautifulSoup(description, 'html.parser')
    img = soup.find('img')
    return img['src'] if img else None

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

@app.route('/solutions')
def solutions():
    return render_template('solutions.html')

@app.route('/team')
def team():
    return render_template('team.html')

@app.route('/careers')
def careers():
    return render_template('careers.html')


@app.route('/send_message', methods=['POST'])
def send_message():
    name = request.form['name']
    email = request.form['email']
    message = request.form['message']

    msg = Message("New Message from CalmnClassy Dev",
                  sender="noreply@calmnclassy.dev",
                  recipients=["joshuajoee204@gmail.com"])
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

@app.route('/case-studies')
def case_studies():
    return render_template('case_studies.html')

@app.route('/whitepapers')
def whitepapers():
    return render_template('whitepapers.html')

@app.route('/webinars')
def webinars():
    return render_template('webinars.html')

@app.route('/documentation')
def documentation():
    return render_template('documentation.html')

@app.route('/privacy')
def privacy():
    return render_template('privacy.html')

@app.route('/terms')
def terms():
    return render_template('terms.html')

@app.route('/cookies')
def cookies():
    return render_template('cookies.html')


if __name__ == '__main__':
    app.run(debug=True)
