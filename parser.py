import requests
import re
from bs4 import BeautifulSoup
import json

quotes = []

def clean_tags(text) -> str:
    clear_text = re.sub(r'<[^>]+>', '', str(text))
    return clear_text

def clean_quotes(quotes) -> list:
    quotes_count = len(quotes)
    for i in range(quotes_count):
        quotes[i] = clean_tags(quotes[i])
    return quotes

def parse_quotes(url) -> str:
    html_text = requests.get(url).content
    soup = BeautifulSoup(html_text, 'html.parser')
    parsed_quotes = soup.find_all('div', {'class': 'quote__content'}, string=True)
    parsed_quotes = clean_quotes(parsed_quotes)
    return parsed_quotes

for i in range(6):
    url = "http://itmydream.com/character/maksim-lavrov/" + str(i) + "?per-page=10"
    quotes += parse_quotes(url)

with open('quotes.json', 'w', encoding='utf8') as f:
    json.dump(quotes, f, ensure_ascii=False)