'use strict';

function MyArray (...args) {
  this.length = 0; 
  
  for( let i = 0; i < args.length; i++){
    this.push(args[i]);
  };
  };
  
  MyArray.prototype = new MyArrayProto();
  MyArray.isMyArray = function (obj) {
    return obj instanceof MyArray;
  }
  
  
  function MyArrayProto() {
    this.push = function(){
      if(arguments){
        for(let i = 0; i < arguments.length; i++){
          this[this.length++] = arguments[i];
        }
      }
      return this.length;
    }; 
    this.reduceRight = function(callback, initialValue){
      if(this.length === 0 && initialValue === undefined){
        throw new TypeError('Array is empty')
      }
      let lengthMinusOne = this.length - 1;
      let previousValue, startIndex;
      if(initialValue !== undefined){
        previousValue = initialValue;
        startIndex = this.length;
      }
      else {
        previousValue = this[lengthMinusOne];
        startIndex = lengthMinusOne;
      }
      if(lengthMinusOne > 0){
        for(let i = startIndex; i > 0; i--){
        previousValue = callback(previousValue, this[i-1], i, this);
        }
      }
    return previousValue;
  };
}
const myArr1 = new MyArray(100, 500, 900, 1000);

// debugger
console.log(myArr1.reduceRight((a, b) => a - b, 1000)); 
console.log(myArr1.reduceRight((a, b) => a + b, 100));
console.log(myArr1.reduceRight((a, b) => a + b));
console.log(myArr1.reduceRight((a, b) => a - b))