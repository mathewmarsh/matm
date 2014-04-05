#!/usr/bin/python

from random import randint
import itertools

def roll(dice = 1, sides = 20):
    try: return [randint(1, sides) for i in range(dice)]
    except: return []

def dice (sides): return lambda rolls: [randint(1, sides) for i in range(rolls)]
d4 = dice(4)
d6 = dice(6)
d8 = dice(8)
d10 = dice(10)
d12 = dice(12)
d20 = dice(20)

statroll = d6(4)
statroll.remove(min(statroll))
# or
removelow = lambda roll: [die for die in roll if die != min(roll)]


def get_modifier (score):
    if score < 10:
        return 0
    return score / 2 - 5
pcs = {}

def new_score ():
    n = sum(removelow(d6(4)))
    if n >= 9:
        return n
    else:
        return new_score()

def pc ():
    stats = {
            "STR":new_score(),
            "DEX":new_score(),
            "CON":new_score(),
            "INT":new_score(),
            "WIS":new_score(),
            "CHA":new_score()
            }
    return stats
a = pc()
for i in a.items():
    print i

"""
for i in range(6):
    a,b,c,d,e,f = sum(removelow(d6(4))),sum(removelow(d6(4))),sum(removelow(d6(4))),sum(removelow(d6(4))),sum(removelow(d6(4))),sum(removelow(d6(4)))
    stats = {
            "STR":{"score":a,"mod":get_modifier(a)},
            "DEX":{"score":b,"mod":get_modifier(b)},
            "CON":{"score":c,"mod":get_modifier(c)},
            "INT":{"score":d,"mod":get_modifier(d)},
            "WIS":{"score":e,"mod":get_modifier(e)},
            "CHA":{"score":f,"mod":get_modifier(f)},
            }
    pcs[i] = stats




for k, v in pcs.items():
    print "Player", k
    for skill, score in v.items():
        print "\t", skill, "\t", score, "\t"
        """
