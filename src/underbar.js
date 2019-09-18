
(function() {
  'use strict';

  window._ = {};

  // Returns whatever value is passed as the argument. This function doesn't
  // seem very useful, but remember it--if a function needs to provide an
  // iterator when the user does not pass one in, this will be handy.
_.identity = function(value){
    return value;
};

  /**
   * COLLECTIONS
   * ===========
   *
   * In this section, we'll have a look at functions that operate on collections
   * of values; in JavaScript, a 'collection' is something that can contain a
   * number of values--either an array or an object.
   *
   *
   * IMPORTANT NOTE!
   * ===========
   *
   * The .first function is implemented for you, to help guide you toward success
   * in your work on the following functions. Whenever you see a portion of the
   * assignment pre-completed, be sure to read and understand it fully before
   * you proceed. Skipping this step will lead to considerably more difficulty
   * implementing the sections you are responsible for.
   */

  // Return an array of the first n elements of an array. If n is undefined,
  // return just the first element.
  _.first = function(array, n) {
    return n === undefined ? array[0] : array.slice(0, n);
  };
  
//FIRST FROM BOOTCAMP/UNDERPANTS  
//   _.first = function(array, number){
//     //checks if array is an arr OR number under zero
//     if(!Array.isArray(array) || number < 0){
//     //returns empt arr    
//         return [];
//     //but if there if there is no number arg OR the number number arg isn't a num    
//     } else if(number === undefined || typeof number !== 'number'){
//         //return only first item in arr
//         return array[0];
//     }
//     //function returns slice performed on input arr from index 0 and number passed in
//     //since it will be 1 higher than the amnt of items to extract from begining of arr
//     //also covers returning entire arr if number > arr.length
//     return array.slice(0, number);
// };

  // Like first, but for the last elements. If n is undefined, return just the
  // last element.
_.last = function(array, number){
    //checks if array is an arr OR number under zero
    if(!Array.isArray(array) || number < 0){
    //returns empt arr    
        return [];
    //but if there is no number arg OR the number number arg isn't a num    
    } else if(number === undefined || typeof number !== 'number'){
        //return only last item in arr
        return array[array.length - 1];
        //if number greater than arr.length
    } else if(number > array.length){
        //return entire arr
        return array;
    }
    //return slice on array with the start/first set to number subtracted
    //from the length in the array so it starts to include the item at that number index
    return array.slice(array.length - number);
};

  // Call iterator(value, key, collection) for each element of collection.
  // Accepts both arrays and objects.
  //
  // Note: _.each does not have a return value, but rather simply runs the
  // iterator function over each item in the input collection.
  _.each = function(collection, func) {
      if(Array.isArray(collection)){
      for(let i = 0; i < collection.length; i++){
          func(collection[i], i, collection);
      }
  } else {
      for (let k in collection){
          func(collection[k], k, collection);
      }
  }
  };

  // Returns the index at which value can be found in the array, or -1 if value
  // is not present in the array.
  _.indexOf = function(array, target){
    // TIP: Here's an example of a function that needs to iterate, which we've
    // implemented for you. Instead of using a standard `for` loop, though,
    // it uses the iteration helper `each`, which you will need to write.
    let result = -1;

    _.each(array, (item, index) => {
      if (item === target && result === -1) {
        result = index;
      }
    });

    return result;
  };

  // Return all elements of an array that pass a truth test.
_.filter = function(array, func){
       let newArr = [];
      _.each(array, (element, index, array) => {
        if (func(element, index, array)) {
          newArr.push(element);
        }
      })
      return newArr;
};

  // Return all elements of an array that don't pass a truth test.
  _.reject = function(collection, test) {
    //return the call of _.filter on the collection arg and a callback(e, i, c)
    return _.filter(collection, (element, index, collection) => {
    //returns an array of elements which when passed to the callback as args, 
    //the callback evaluates to false; 
      return !test(element, index, collection);
     });
  };

  // Produce a duplicate-free version of the array.
 _.uniq = function(array){
//new arr to be returned 
   let newArr = [];
  //loop over input arr
   for(let i = 0; i < array.length; i++){
  //if calling _.indexOf with the duplicate-free arr passed in and the current itt element passed in
  //equals -1/isn't already in the array, push it in
       if(_.indexOf(newArr, array[i]) === -1){
           newArr.push(array[i]);
       }
   }
  // console.log(newArr);
   return newArr;

   
 };


  // Return the results of applying an iterator to each element.
    // map() is a useful primitive iteration function that works a lot
    // like each(), but in addition to running the operation on all
    // the members, it also maintains an array of results.
     _.map = function(collection, func){
     let newArr = [];
     _.each(collection, (e, i, c) => {
         newArr.push(func(e, i, c));
     });
     return newArr;
   };

  /*
   * TIP: map is really handy when you want to transform an array of
   * values into a new array of values. _.pluck() is solved for you
   * as an example of this.
   */

  // Takes an array of objects and returns and array of the values of
  // a certain property in it. E.g. take an array of people and return
  // an array of just their ages
  _.pluck = function(collection, key) {
    
    //OPSPARK FUNCTION
    // TIP: map is really handy when you want to transform an array of
    // values into a new array of values. _.pluck() is solved for you
    // as an example of this.
    return _.map(collection, (item) => {
      return item[key];
    });
  };

//BOOTCAMP/UNDERPANTS  
//   _.pluck = function(array, prop){
//     //return array that is map called on input array
//     return _.map(array, (e, i, c) => {
//         //grab each e[prop];
//         return e[prop];
//     });
// };


  // Reduces an array or object to a single value by repetitively calling
  // iterator(accumulator, item) for each item. accumulator should be
  // the return value of the previous iterator call.
  //
  // You can pass in a starting value for the accumulator as the third argument
  // to reduce. If no starting value is passed, the first element is used as
  // the accumulator, and is never passed to the iterator. In other words, in
  // the case where a starting value is not passed, the iterator is not invoked
  // until the second element, with the first element as its second argument.
  //
  // Example:
  //   const numbers = [1,2,3];
  //   const sum = _.reduce(numbers, (total, number) => {
  //     return total + number;
  //   }, 0); // should be 6
  //
  //   const identity = _.reduce([5], (total, number) => {
  //     return total + number * number;
  //   }); // should be 5, regardless of the iterator function passed in
  //          No accumulator is given so the first element is used.
  _.reduce = function(collection, func, seed) {
        //call each
    _.each(collection, (e, i, c) => {
       //if seed is undefined
       if(seed === undefined){
            //seed set to first element
            seed = e;
       } 
       //else
       else {
      //set seed equal to the eval of func with seed, e, i passed in  
      seed = func(seed, e, i);
       }
    });
    //return final val of seed
    return seed;
  };

  // Determine if the array or object contains a given value (using `===`).
  _.contains = function(collection, target) {
    // TIP: Many iteration problems can be most easily expressed in
    // terms of reduce(). Here's a freebie to demonstrate!
    return _.reduce(collection, (wasFound, item) => {
      if (wasFound) {
        return true;
      }
      return item === target;
    }, false);
  };


  // Determine whether all of the elements match a truth test.

    // TIP: Try re-using reduce() here.
    _.every = function(collection, func){
    //test var to be switched to false if eval of func called on e is falsy 
    //returned at end
    let testVar = true;
   //edge case: if there is no function
    if(func === undefined){
    //iteratively loop over arr
    //would this have failed with a test for an object?/hardcoded for test?
        for(let i = 0; i < collection.length; i++){
            //if element at current index falsy, change variable
            if(!collection[i]){
                testVar = false;
              }
         }
    //default for !func edgecase     
    } else {
        //call each
        _.each(collection, (e, i, c) => {
        //if e is undefined OR
        //the result of func falled on the is falsy 
        if(e === undefined || !func(e, i, c)) {
             //testVar switches to false
             testVar = false;
            }
         });
    };
    //return final val of testv
    return testVar;
};


  // Determine whether any of the elements pass a truth test. If no iterator is
  // provided, provide a default one
_.some = function(collection, func){
     //test var to be switched to true if eval of func called on e is truthy 
    //returned at end
    let testVar = false;
   //edge case: if there is no function
    if(func === undefined){
    //iteratively loop over arr
        for(let i = 0; i < collection.length; i++){
            //if element at current index truthy, change variable
            if(collection[i]){
                testVar = true;
              }
         }
    //default for !func edgecase     
    } else {
        //call each
        _.each(collection, (e, i, c) => {
        //if the result of func falled on the is truthy 
        if(func(e, i, c)) {
             //testVar switches to true
             testVar = true;
            }
         });
    };
    //return final val of testv
    return testVar;
};


  /**
   * OBJECTS
   * =======
   *
   * In this section, we'll look at a couple of helpers for merging objects.
   */

  // Extend a given object with all the properties of the passed in
  // object(s).
  //
  // Example:
  //   const obj1 = {key1: "something"};
  //   _.extend(obj1, {
  //     key2: "something new",
  //     key3: "something else new"
  //   }, {
  //     bla: "even more stuff"
  //   }); // obj1 now contains key1, key2, key3 and bla
  _.extend = function (obj1, obj2, ...otherObjs){
    return Object.assign(obj1, obj2, ...otherObjs);
};

  // Like extend, but doesn't ever overwrite a key that already
  // exists in obj
  _.defaults = function(obj, ...otherObjs) {
    //target/input obj's keys
    let objKeys = Object.keys(obj);
     //create object using reduce called ...otherObjs,
    //of all key:val pairs that aren't in input obj
    //check against object.keys 
     let testObj = _.reduce(otherObjs, (seed, e, i) => {
    //loop over each individual obj
      for(let k in e){
      //if the input.ObjKeys arr includes the current key of
      //the current obj of the reduce ittration, AND it isn't already in the seed
      //add it to the seed obj
       if(objKeys.includes(k) === false && Object.keys(seed).includes(k) === false){
         seed[k] = e[k];
       };
      };
    //return seed
     return seed;
    }, {});
     //use obj.assign to take obj full of prop val not in test obj and set on
    //target of first input arg
    Object.assign(obj, testObj); 
    //return input obj
    return obj;
  };

  /**
   * FUNCTIONS
   * =========
   *
   * Now we're getting into function decorators, which take in any function
   * and return out a new version of the function that works somewhat differently
   */

  // Return a function that can be called at most one time. Subsequent calls
  // should return the previously returned value.
  _.once = function(func) {
    // TIP: These variables are stored in a "closure scope" (worth researching),
    // so that they'll remain available to the newly-generated function every
    // time it's called.
    let alreadyCalled = false;
    let result;

    // TIP: We'll return a new function that delegates to the old one, but only
    // if it hasn't been called before.
    return function() {
      if (!alreadyCalled) {
        // TIP: .apply(this, arguments) is the standard way to pass on all of the
        // information from one function call to another.
        result = func.apply(this, arguments);
        alreadyCalled = true;
      }
      // The new function always returns the originally computed result.
      return result;
    };
  };

  // Memorize an expensive function's results by storing them. You may assume
  // that the function only takes primitives as arguments.
  // memoize could be renamed to oncePerUniqueArgumentList; memoize does the
  // same thing as once, but based on many sets of unique arguments.
  //
  // _.memoize should return a function that, when called, will check if it has
  // already computed the result for the given argument and return that value
  // instead if possible.
  _.memoize = function(func) {
    //stores all functions that have already been called
    //cache
    let testObj = {};
  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  //
  // The arguments for the original function are passed after the wait
  // parameter. For example _.delay(someFunction, 500, 'a', 'b') will
  // call someFunction('a', 'b') after 500ms
  _.delay = function(func, wait) {
  };


  /**
   * ADVANCED COLLECTION OPERATIONS
   * ==============================
   */

  // Randomizes the order of an array's contents.
  //
  // TIP: This function's test suite will ask that you not modify the original
  // input array. For a tip on how to make a copy of an array, see:
  // http://mdn.io/Array.prototype.slice
  _.shuffle = function(array) {
    let newArr = [];
    let testNum = Math.floor(Math.random() * (array.length ));
    _.each(array, (e, i, c) => {
      if(i !== testNum || testNum === array.length - 1){
      newArr.splice(testNum, 0, e);
      // console.log(newArr);
      } 
      //THIS ELSE STATEMENT WORKS!!
      // else {
      //   newArr.splice(Math.floor(Math.random() * array.length), 0, e);
      // }
    });
    return newArr.slice();
  };


  /**
   * ADVANCED
   * =================
   *
   */

  // Calls the method named by functionOrKey on each value in the list.
  // Note: You will need to learn a bit about .apply to complete this.
  _.invoke = function(collection, functionOrKey, args) {
  };

  // Sort the object's values by a criterion produced by an iterator.
  // If iterator is a string, sort objects by that property with the name
  // of that string. For example, _.sortBy(people, 'name') should sort
  // an array of people by their name.
  _.sortBy = function(collection, iterator) {
  };

  // Zip together two or more arrays with elements of the same index
  // going together.
  //
  // Example:
  // _.zip(['a','b','c','d'], [1,2,3]) returns [['a',1], ['b',2], ['c',3], ['d',undefined]]
  _.zip = function(...arrs) {
    console.log('working on ZIP!!');
    let finArr = [];
  for(let i = 0; i < arrs.length; i++){
    console.log(i);
    let innerArr = [];
    for(let j = 0; j < arrs[i].length; j++ ){
      console.log('j', j);
      innerArr.push(arrs[i][j]);
    }
    finArr.push(innerArr);
  }
   console.log(finArr);
    return finArr;
   };

  // Takes a multidimensional array and converts it to a one-dimensional array.
  // The new array should contain all elements of the multidimensional array.
  //
  // Hint: Use Array.isArray to check if something is an array
  _.flatten = function(nestedArray, result) {
  };

  // Takes an arbitrary number of arrays and produces an array that contains
  // every item shared between all the passed-in arrays.
  _.intersection = function() {
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array) {
  };

  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time.  See the Underbar readme for extra details
  // on this function.
  //
  // Note: This is difficult! It may take a while to implement.
  _.throttle = function(func, wait) {
  };
}());
