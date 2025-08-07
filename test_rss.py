import feedparser

def test_rss():
    try:
        feed = feedparser.parse('https://techcrunch.com/feed/')
        print(f"Feed entries: {len(feed.entries)}")
        if feed.entries:
            print(f"First entry: {feed.entries[0].title}")
            print(f"Published: {feed.entries[0].get('published', 'No date')}")
        else:
            print("No entries found")
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    test_rss()
