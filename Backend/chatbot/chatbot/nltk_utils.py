import nltk
import numpy as np
nltk.download('punkt_tab')
nltk.data.path.append('C:/Users/Lenovo/AppData/Roaming/nltk_data/nltk/tokenize')
from nltk.stem.porter import PorterStemmer
stemmer=PorterStemmer()

def tokenize(sentence):
    return nltk.word_tokenize(sentence)

def stem(word):
    return stemmer.stem(word.lower())

def bag_of_words(tokenizes_sentence,all_words):
    tokenizes_sentence=[stem(w) for w in tokenizes_sentence ]
    bag = np.zeros(len(all_words),dtype=np.float32)
    for index , w in enumerate(all_words):
        if w in tokenizes_sentence:
            bag[index]=1.0
    return bag

    

#words = ["Organize","organizes","organizing"]
#stemmed_words=[stem(w) for w in words]
#print(stemmed_words)

#a="How are you baby ?"
#print(a)
#a=tokenize(a)
#print(a)
