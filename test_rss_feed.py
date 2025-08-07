#!/usr/bin/env python3

import feedparser

def test_rss_feed():
    print("Testing RSS feed...")
    
    # Test the RSS feed used in the app
    rss_url = 'https://www.theverge.com/rss/index.xml'
    
    try:
        feed = feedparser.parse(rss_url)
        
        if feed.entries:
            print(f"✅ RSS feed working! Found {len(feed.entries)} entries")
            print("\nFirst 3 articles:")
            for i, entry in enumerate(feed.entries[:3]):
                print(f"{i+1}. {entry.title}")
                print(f"   Published: {entry.published if hasattr(entry, 'published') else 'No date'}")
                print(f"   Link: {entry.link}")
                print()
        else:
            print("❌ No entries found in RSS feed")
            
    except Exception as e:
        print(f"❌ Error fetching RSS feed: {e}")

if __name__ == "__main__":
    test_rss_feed()
