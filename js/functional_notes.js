// "functional programming is hip, javascript is hip"
// Pure, Functional Programming / Javascript (notes)!
// by Christian Johansen

/*********************
 *      FUNCTIONS
 *********************/

//                          Function Declarations

function add(a, b) {       
    console.log(a + b);
}
/** Above simple function and is the most straightforward way to create a 
function in javascript.**/

//                          Function Expressions

var add = function (a, b) {     // notice 'function()' is simply an object
    console.log(a + b);         // <-- this is a side-effect (1)
}   // just to be clear as I'll use this term throughout my notes, =)

/** One interesting thing about functions in javascript is that they are 
    objects, first-class objects to be exact. This is huge because it opens up 
    many possibilities, namely functional programming. This isn't supported by 
    Java.

    (1) A side-effect means a function will achieve more than produce the 
        return value when called. Any easy way of looking at it is,
        anything that happens that isn't the return value, is a side-effect. 
**/


//                              Pure Function

var add = function (a, b) {
    return a + b;
}

/** A pure function does not have side-effects. Pass it in some data and it
    gives you some data back. This makes them easier to test cause you can feed
    them some data and assert on the values given back. You dont have to check
    external things. This is ideal. However if you where you create an entire 
    program using only pure functions, what would you have? A function that 
    does nothing. So you have to have at least some impure functions in order
    for something to happen.
    We can chunk / split our implementation up into many pure functions and then
    have a few functions with side-effects in one place to contain the madness.
*/


//                          Higher-Order Function

function makeAdder(base) {
    return function (num) {
        return base + num;
    };
}

var add2 = makeAddr(2);
add2(3);    // 5
add2(7);    // 9

/**
    A higher-order functions are simple functions that either returns a another
    function, or accepts one or more functions as it's input arguments. 
*/

// this may be familiar to web/frontend devs
var el = document.getElementId("btn");

el.addEventListener("click", function (event) {
    // ...
});

// possibly more familiar (jQuery)
$("input[type=submit]").on("click", function (event) {      
    // ..
});


/** And that pretty much sums up the basic building blocks used in FP  **/


//                                  Loops

// This guy, a typical imperative interation structure...
for (var i = 0; i < 1; ++1) {
    // ...
}

// ...and his friends.
while (l--) {
    // ...
}

// What are loops used for?

// Enumerating arrays/lists
for (var i = 0, l = arr.length; i < l; ++i) {
    console.log(arr[i]);
}

/** The most typical form of enumerating imperatively is by iterating through
each of the items in an array and then causing side-effects. You get the point.
**/

// Extracting stuff from lists
var names = [];
for (var i = 0, l = tweets.length; i < l; ++i) {
    names.push(tweeps[i].name); 
}

// Aggregating list contents (into another data structure)
var html = "";
for (var i = 0, l = items.length; i < l; ++i) {
    html += "<li>" + items[i] + "</li>"; 
}

this.list.innerHTML = html;

// What's the problem with these?

// 'for each item ...'
for (var i = 0, l = arr.length; i < l; ++i) { // very detailed in mechanics
    console.log(arr[i]); // get each item, then cause side-effects
}

// What's the alternatives?

// Array.prototype.forEach
arr.forEach(function (item) { // higher abstraction
    console.log(item);
});

/** Instead of looping through the array yourself, you put the looping logic
into the array and the array calls your function once for each item. 

The two examples are similar in size. However the biggest difference between 
the two is the comparison on what each one focuses on. 

The top example is very much focused on the mechanics of the looping:
    loop/iteration variable, i
    loop condition, 
    up the index, 
    access the array at...

All sorts of mechanics related to looping, whereas the point of the loop is to cause side-effects to each item.

The second code example is simple, "for each do this" its very intentional difference between these two. Two, brings us on to more intersting abstractions.
It operates at a higher abstraction level than the loop. This can produce a way
for even better abstractions.

Higher abstractions are nice for certain situations.

WHY ARE YOU LOOPING?
    Side-effects
    Transformation
    Filtering   E.g. you want to take a list of users and just get the names of 
                           users who's birthday's are coming up.
    Combining items
    Other? (I'm sure there are lots of examples.
**/

//                                  MAP 
// (or mapping items, it is the abstraction of the transformation use case.)

var names = [];

for (var i = 0, l = tweets.length; i < l; ++i) {
    names.push(tweeps[i].name); 
}

// Array.prototype.map
var names = tweeps.map(function (tweep) {
    return tweep.name;
});
/** This examples offers a higher abraction compared to its highly mechanical name. This abstraction allows for code that is terse and readable. 
Your code tells you right away what it's doing and doesn't distract you with
matters of temporary array variable, and the looping mechanics because we just went right for tweets.name; again it tells you right away what it's doing.
**/



//                              One-Liner!

var names = tweets.map(function (t) { return t.name; });

/** becuase this is a very short function, we can afford to use very short variable names without losing meaning means that I can put this on one line.
I've noticed a pattern when first writing a new piece of code, it usually as short as possible; in a 'does it work' sense. I'm not really a one line fanatic of the sort, but I think it says something interesting about this 
expressiveness in your api by what you can achieve in one line.
The fact that I can take a list of objects and turn them into strings in one
line--to me that is a good amount of expressiveness. 

It's really needless for that atomic operation to occupy more than one line in my program.
**/

// Mentioned on twitter, pretty horrible
var str = "Mentioned by ";

for (var i = 0, l = tweeps.length(); i < l; ++i) {
    str += tweeps[i]name;
    if (i < tweeps.length - 1) { str += ", "; }
}
/** This example is bad, theres lots of chances for you to commit 'off-by-one' errors, or other kind of nasty index related errors; with this kind of code. 

Instead it's good to break it up and try to think about what we're doing.

    1) Extract usernames
    2) Combine usernames
    3) Use a comma separator (I don't want to add something to each item, mutating the value. No, I want a separator in between.)
**/

// Putting Map to use
var str = "Mentioned by " + tweeps.map(function (t) {
    return t.name;
}).join(", ");

// Map the tweeps and then join them with a comma delimiter, but this isn't a 
// one-liner yet.

// Can we do better? Of course we can do better with higher order abrstraction!

// Extract a property
function prop(name) {
    return function (object) {
        return object[name];
    };
}

/** Its a function you pass in a name thats a string and returns a new function
that you can call with an object and then it will access that named property of that object. 
**/

// mentions
var str = "Mentioned by " + tweeps.map(prop("name")).join(", ");

/** produce the names and then join them together. I think this is a good level
of expressiveness. Now it should be mentioned if you are not used to this kind
of programming it may not seem very concise or readable, but once you understand how map works, the rest will be much easier to read.
**/

//                              Reduce
// (The grandfather of foreach and map and all the other iteration methods.)

// Total length (this code example is from node.js)
var totalLength = 0;

for (var i = 0; i < buffers.length; i++) {
    totalLengths += buffers[i].length;
}
/** Just a list of buffer that all have length and I want to know.
    
    STEPS:
        Extract bugger lengths
        Combine lengths to produce sum
**/

// Use the function, Luke
var totalLength = buffers.
    map(function (buffer) { return buffer.length; }),
    reduce(function (prev, curr) { return prev + curr; }, 0 //**notice the "0"?
);

/* ** the zero is the initial seed value and in the first call, reduce will take
that value and pass it into the 'prev' arg and the first item from the list into the 'curr' arg. The reduce return value is the sum of prev and curr, and that new value will be placed in the prev value. This way we fold the values from left to right and produce the sum.

    (reduce breakdown)
        [10, 5, 15, 10, 10]
        //=> 0, 10 => 10
        //=> 10, 5 => 15
        //=> 15, 15 => 30
        //=> 30, 10 => 40
        //=> 40, 10 => 50

But I'm not done yet.
**/

// This one...
function (prev, curr) { return prev + curr; }

// Looks a lot like
function add(a, b) {
    return a + b;
} 
// if there is already a named function that does the same thing, use it instead
// like so...

var totalLength = buffers.
    map(function (buffer) { return buffer.length; }),
    reduce(add);

// this one...
function (buffer) { return buffer.length; }

// looks a lot like
prop("length")

// Voila, that turns into...
var totalLength = buffers.
    map(prop("length")).
    reduce(add);

// One-Liner!
var totalLength = buffers.map(prop("length")).reduce(add);

/** The point being is by using iteration method instead of loops allows us to think in other levels of abstractions. No messy for loops or other messy low level process, unless you closely study it. That's always good to operate at a higher level. **/


//                          Async Flow Control

/** (everything that happens in the browser, happens in a single thread. typically things going on in teh browser is asynchronous.

    TASK
        Fetch multiple scripts
        Combine them
        Preserve script ordering
**/

// Like so
combine(['jquery.js',
         '/underscore.js',
         '/backbone.js'], function (content) {
             // content is now all the scripts combined, in order
         });

//TODO @20:50:00


/* The follow is from:
 * http://www.ibm.com/developerworks/library/wa-javascript/index.html
 */

//Listing 1. Factorial in procedural style
int factorial (int n)
{
  if (n <= 0)
    return 1;
  else
    return n * factorial (n-1);
}

// Listing 2. Factorial in functional style
factorial n, where n <= 0 	:= 1
factorial n    := foldr * 1 take n [1..]

// Listing 3. A typical function
function sum(x,y,z) {
  return (x+y+z);
}

// Listing 4. An anonymous Function
function(x,y,z) {
  return (x+y+z);
}

// Listing 5. Applying an anonymous function
var sum = function(x,y,z) {
  return (x+y+z);
}(1,2,3);
alert(sum);

/*
You could also use functions as values. You could have variables with functions as values assigned to them. In the last example, you could also do the following: 
Listing 6. Using function assignment */
var sum = function(x,y,z) {
  return (x+y+z);
}
alert(sum(1,2,3));

//Listing 10. Passing function as a parameter and applying it
var passFunAndApply = function (fn,x,y,z) { return fn(x,y,z); };

var sum = function(x,y,z) {
  return x+y+z;
};

alert( passFunAndApply(sum,3,4,5) ); // 12

/*
    Using functional concepts

    The previous section showed some programming concepts using the functional style. The examples are by no means complete coverage of all the concepts, nor are they in any order of importance, but are the relevant concepts for this discussion. 
    
    To quickly summarize, with the functional style in JavaScript:
        1) Functions need not have names all the time.
        2) Functions can be assigned to variables like other values.
        3) A function expression cqn be written and enclosed in parentheses 
           for application later.
        4) Functions can be passed as arguments to other functions.

    This section shows some examples of how you can use the concepts effectively to write good and elegant code in JavaScript. 
    
    (Using a functional style of JavaScript, you can do many other things that are out of the scope of this discussion.)
 */


