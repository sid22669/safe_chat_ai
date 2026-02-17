import pandas as pd
import joblib
import os
import re
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import SGDClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import classification_report

def preprocess(text: str) -> str:
    """Lowercase, remove URLs, emails, punctuation, extra spaces."""
    text = text.lower()
    text = re.sub(r'http\S+|www\.\S+', '', text)
    text = re.sub(r'\S+@\S+', '', text)
    text = re.sub(r'[^a-z\s]', '', text)
    text = re.sub(r'\s+', ' ', text).strip()
    return text

def train():
    df = pd.read_csv('data/dataset.csv')
    df['clean_text'] = df['text'].apply(preprocess)

    X_train, X_test, y_train, y_test = train_test_split(
        df['clean_text'], df['label'], test_size=0.2, random_state=42, stratify=df['label']
    )

    vectorizer = TfidfVectorizer(max_features=5000, ngram_range=(1, 2))
    X_train_tfidf = vectorizer.fit_transform(X_train)
    X_test_tfidf = vectorizer.transform(X_test)

    model = SGDClassifier(loss='modified_huber', class_weight='balanced', random_state=42)
    model.fit(X_train_tfidf, y_train)

    y_pred = model.predict(X_test_tfidf)
    print(classification_report(y_test, y_pred))

    os.makedirs('model', exist_ok=True)
    joblib.dump(model, 'model/model.pkl')
    joblib.dump(vectorizer, 'model/vectorizer.pkl')
    print("Model and vectorizer saved to model/")

if __name__ == '__main__':
    train()
