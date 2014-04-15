/*jshint eqnull:true, expr:true*/

var _ = { };

(function() {

  // Returns whatever value is passed as the argument. This function doesn't
  // seem very useful, but remember it--if a function needs to provide an
  // iterator when the user does not pass one in, this will be handy.
  _.identity = function(val) {
    return val;
  };

  /**
   * COLLECTIONS
   * ===========
   *
   * In this section, we'll have a look at functions that operate on collections
   * of values; in JavaScript, a 'collection' is something that can contain a
   * number of values--either an array or an object.
   */

  // Return an array of the first n elements of an array. If n is undefined,
  // return just the first element.
  _.first = function(array, n) {
    return n === undefined ? array[0] : array.slice(0, n);
  };

  // Like first, but for the last elements. If n is undefined, return just the
  // last element.
  _.last = function(array, n) {
    if (n === undefined) {
      return array[array.length - 1];
    } else {
      if (n < 1) {
        return [];
      } else {
        return array.slice(-n);
      }
    }
  };

  // Call iterator(value, key, collection) for each element of collection.
  // Accepts both arrays and objects.
  //
  // Note: _.each does not have a return value, but rather simply runs the
  // iterator function over each item in the input collection.
  _.each = function(collection, iterator) {
    if (!(collection.length === undefined)) {
      for (var i = 0; i < collection.length; i++) {
        iterator(collection[i], i, collection);
      }
    } else {
      for (var key in collection) {
        iterator(collection[key], key, collection);
      }
    }
  };

  // Returns the index at which value can be found in the array, or -1 if value
  // is not present in the array.
  _.indexOf = function(array, target){
    // TIP: Here's an example of a function that needs to iterate, which we've
    // implemented for you. Instead of using a standard `for` loop, though,
    // it uses the iteration helper `each`, which you will need to write.
    var result = -1;

    _.each(array, function(item, index) {
      if (item === target && result === -1) {
        result = index;
      }
    });

    return result;
  };

  // Return all elements of an array that pass a truth test.
  _.filter = function(collection, test) {
    var result = [];
    _.each(collection, function(value, key, collection) {
      if (test(value, key, collection)) {
        result.push(value);
      }
    });
    return result;
  };

  // Return all elements of an array that don't pass a truth test.
  _.reject = function(collection, test) {
    return _.filter(collection, function(value, key, collection) {
      return !test(value, key, collection);
    });
  };

  // Produce a duplicate-free version of the array.
  _.uniq = function(array) {
    var result = [];
    _.each(array, function(value, key, collection) {
      if (collection.indexOf(value) === key) {
        result.push(value);
      }
    });
    return result;
  };


  // Return the results of applying an iterator to each element.
  _.map = function(array, iterator) {
    // map() is a useful primitive iteration function that works a lot
    // like each(), but in addition to running the operation on all
    // the members, it also maintains an array of results.
    var result = [];
    _.each(array, function(value, key, collection) {
      result.push(iterator(value, key, collection));
    });
    return result;
  };

  /*
   * TIP: map is really handy when you want to transform an array of
   * values into a new array of values. _.pluck() is solved for you
   * as an example of this.
   */

  // Takes an array of objects and returns and array of the values of
  // a certain property in it. E.g. take an array of people and return
  // an array of just their ages
  _.pluck = function(array, propertyName) {
    // TIP: map is really handy when you want to transform an array of
    // values into a new array of values. _.pluck() is solved for you
    // as an example of this.
    return _.map(array, function(value){
      return value[propertyName];
    });
  };

  // Calls the method named by methodName on each value in the list.
  // Note: you will nead to learn a bit about .apply to complete this.
  _.invoke = function(collection, functionOrKey, args) {
    return _.map(collection, function(value) {
      if (typeof(functionOrKey) === "function") {
        return functionOrKey.apply(value, args);
      } else {
        return value[functionOrKey].apply(value, args);
      }
    });
  };

  // Reduces an array or object to a single value by repetitively calling
  // iterator(previousValue, item) for each item. previousValue should be
  // the return value of the previous iterator call.
  //
  // You can pass in an initialValue that is passed to the first iterator
  // call. If initialValue is not explicitly passed in, it should default to the
  // first element in the collection.
  //
  // Example:
  //   var numbers = [1,2,3];
  //   var sum = _.reduce(numbers, function(total, number){
  //     return total + number;
  //   }, 0); // should be 6
  _.reduce = function(collection, iterator, accumulator) {
    if (accumulator === undefined) {
      if (!(collection.length === undefined)) {
        accumulator = collection[0];
      } else {
        accumulator = collection[Object.keys(collection)[0]]
      }
    }
    _.each(collection, function(value) {
      accumulator = iterator(accumulator, value);
    });
    return accumulator;
  };

  // Determine if the array or object contains a given value (using `===`).
  _.contains = function(collection, target) {
    // TIP: Many iteration problems can be most easily expressed in
    // terms of reduce(). Here's a freebie to demonstrate!
    return _.reduce(collection, function(wasFound, item) {
      if (wasFound) {
        return true;
      }
      return item === target;
    }, false);
  };


  // Determine whether all of the elements match a truth test.
  _.every = function(collection, iterator) {
    // TIP: Try re-using reduce() here.
    if (iterator === undefined) {
      iterator = _.identity;
    }
    return _.reduce(collection, function(resultSoFar, item) {
      return (resultSoFar && iterator(item)) ? true : false;
    }, true);
  };

  // Determine whether any of the elements pass a truth test. If no iterator is
  // provided, provide a default one
  _.some = function(collection, iterator) {
    // TIP: There's a very clever way to re-use every() here.
    if (iterator === undefined) {
      iterator = _.identity;
    }
    return !_.every(collection, function(item) {
      return !iterator(item);
    })
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
  //   var obj1 = {key1: "something"};
  //   _.extend(obj1, {
  //     key2: "something new",
  //     key3: "something else new"
  //   }, {
  //     bla: "even more stuff"
  //   }); // obj1 now contains key1, key2, key3 and bla
  _.extend = function(obj) {
    _.each(arguments, function(arg) {
      _.each(arg, function(value, key) {
        obj[key] = value;
      });
    });
    return obj;
  };

  // Like extend, but doesn't ever overwrite a key that already
  // exists in obj
  _.defaults = function(obj) {
    _.each(arguments, function(arg) {
      _.each(arg, function(value, key) {
        if (!(key in obj)) {
          obj[key] = value;
        }
      });
    });
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
    var alreadyCalled = false;
    var result;

    // TIP: We'll return a new function that delegates to the old one, but only
    // if it hasn't been called before.
    return function() {
      if (!alreadyCalled) {
        // TIP: .apply(this, arguments) is the standard way to pass on all of the
        // infromation from one function call to another.
        result = func.apply(this, arguments);
        alreadyCalled = true;
      }
      // The new function always returns the originally computed result.
      return result;
    };
  };

  // Memoize an expensive function by storing its results. You may assume
  // that the function takes only one argument and that it is a primitive.
  //
  // _.memoize should return a function that when called, will check if it has
  // already computed the result for the given argument and return that value
  // instead if possible.
  _.memoize = function(func) {
    var results = {};
    return function(val) {
      if (!(val in results)) {
        results[val] = func(val);
      }
      return results[val];
    };
  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  //
  // The arguments for the original function are passed after the wait
  // parameter. For example _.delay(someFunction, 500, 'a', 'b') will
  // call someFunction('a', 'b') after 500ms
  _.delay = function(func, wait) {
    var originalArgs = Array.prototype.slice.call(arguments, 2);
    setTimeout(function() {
      func.apply(this, originalArgs);
    }, wait);
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
    var arrayCopy = array.slice();
    // Fisher-Yates
    for (var i = arrayCopy.length - 1; i >= 0; i--) {
      var indexToSwitch = Math.floor(Math.random() * i);
      var temp = arrayCopy[i];
      arrayCopy[i] = arrayCopy[indexToSwitch];
      arrayCopy[indexToSwitch] = temp;
    }
    return arrayCopy;
  };


  /**
   * Note: This is the end of the pre-course curriculum. Feel free to continue,
   * but nothing beyond here is required.
   */


  // Sort the object's values by a criterion produced by an iterator.
  // If iterator is a string, sort objects by that property with the name
  // of that string. For example, _.sortBy(people, 'name') should sort
  // an array of people by their name.
  _.sortBy = function(collection, iterator) {
    if (!Array.isArray(collection)) {
      // Converts to array of values
      collection = _.map(collection, _.identity);
    }
    if (typeof(iterator) !== "function") {
      var key = iterator;
      iterator = function(obj) {
        return obj[key];
      };
    }
    // Quicksort:
    if (collection.length <= 1) {
      return collection;
    }
    var pivotIndex = Math.floor(Math.random() * collection.length);
    var pivot = iterator(collection[pivotIndex]);
    var less = [];
    var equal = [];
    var greater = [];
    _.each(collection, function(value) {
      var iterated = iterator(value);
      if (iterated === pivot) {
        equal.push(value);
      } else if (iterated < pivot || pivot === undefined) {
        less.push(value);
      } else if (iterated > pivot || iterated === undefined) {
        greater.push(value);
      }
    });
    less = _.sortBy(less, iterator);
    greater = _.sortBy(greater, iterator);
    return less.concat(equal, greater);
  };

  // Zip together two or more arrays with elements of the same index
  // going together.
  //
  // Example:
  // _.zip(['a','b','c','d'], [1,2,3]) returns [['a',1], ['b',2], ['c',3], ['d',undefined]]
  _.zip = function() {
    var getLength = function(x) {return x.length;};
    var maxLength = Math.max.apply(null, _.map(arguments, getLength));
    var result = [];
    for (var i = 0; i < maxLength; i++) {
      result.push(_.map(arguments, function(arg) {
        return arg[i];
      }));
    }
    return result;
  };

  // Takes a multidimensional array and converts it to a one-dimensional array.
  // The new array should contain all elements of the multidimensional array.
  //
  // Hint: Use Array.isArray to check if something is an array
  _.flatten = function(nestedArray) {
    if (!Array.isArray(nestedArray)) {
      return nestedArray;
    } else {
      return _.reduce(nestedArray, function(accumulator, value) {
        return accumulator.concat(_.flatten(value));
      }, []);
    }
  };

  // Takes an arbitrary number of arrays and produces an array that contains
  // every item shared between all the passed-in arrays.
  _.intersection = function() {
    var arrays = arguments;
    return _.filter(arrays[0], function(itemInFirstArray) {
      return _.every(arrays, function(arr) {
        return _.some(arr, function(item) {
          return item === itemInFirstArray;
        });
      });
    });
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array) {
    var subtractedArrays = Array.prototype.slice.call(arguments, 1);
    return _.filter(array, function(itemInFirstArray) {
      return _.every(subtractedArrays, function(arr) {
        return !_.some(arr, function(item) {
          return item === itemInFirstArray;
        });
      });
    });
  };


  /**
   * MEGA EXTRA CREDIT
   * =================
   */

  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time.
  //
  // See the Underbar readme for details.
  
  // Note on implementation:
  // When a call is scheduled, it is possible for the throttled funciton to
  // be successfully called manually before the scheduled call is executed,
  // due to the delayed nature of setTimeout. In this case, the scheduled call
  // will reschedule to the next available time. Hence in the following
  // situation:
  //
  // (time = 0 ms)
  //   f = _.throttle(g, 100);
  //   f(); // Call 1
  // (time = 50 ms)
  //   f(); // Call 2
  // (time = 102 ms)
  //   f(); // Call 3
  //
  // Even if the call to g scheduled by Call 2 is delayed so that it occurs
  // after Call 3, there will still be three calls to g at time = 0 ms, ~100 ms,
  // and ~200 ms, which matches the "correct" behavior of the scheduled call
  // occurring first.
  _.throttle = function(func, wait) {
    var timeLastCalled = 0;
    var isScheduled = false;
    var lastResult;
    var throttledFunc = function() {
      var throttledFuncArgs = arguments;
      var currentTime = new Date().getTime();
      if (currentTime - timeLastCalled >= wait) {
        timeLastCalled = currentTime;
        lastResult = func.apply(this, throttledFuncArgs);
      } else if (!isScheduled) {
        isScheduled = true;
        setTimeout(function() {
          isScheduled = false;
          throttledFunc.apply(this, throttledFuncArgs);
        }, wait - (currentTime - timeLastCalled));
      }
      return lastResult;
    }
    return throttledFunc;
  };

}).call(this);
