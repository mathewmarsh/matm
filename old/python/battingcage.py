#!/usr/bin/python
import random
def newdeck():
    faces = [14,13,12,11,10,9,8,7,6,5,4,3,2]
    suits = ['S','H','D','C']
    unsorted = []
    for suit in suits:
        for face in faces:
            unsorted.insert(1,face)
    return unsorted

a = newdeck()
random.shuffle(a)
random.shuffle(a)
random.shuffle(a)

p1 = a[0:26]
p2 = a[26:]

def battle(d1, d2):
    a = 0
    b = 0
    for i in range(2):
        a += d1.pop()
        b += d2.pop()

    print "\t\t",a,"\t",b

    if a > b:
        win (d1,a,b)
        print "+",len(d1),">>",len(d2),"-"
        print "p1: ",a,b
    elif a < b:
        win (d2, b, a)
        print "-",len(d1),"<<",len(d2),"+"
    else:
        d1.insert(0,a)
        d2.insert(0,b)
        print " ",len(d1),"==",len(d2),""
    random.shuffle(d1)
    random.shuffle(d2)

def win(deck, a, b):
    deck.insert(0,a)
    deck.insert(0,b)

def draw(d1, d2):
    for i in range(5):
        if len(d1) != 10 and len(d2) != 10:
            battle(d1,d2)
        else:
            print "Game Over"
            break


draw(p1, p2)
