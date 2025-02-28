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
    this.pop = function(){
      if(this.length === 0){
       return;
      }
      const lastItem = this[this.length-1];
      delete this[--this.length];
      return lastItem;
     };
   
     this.forEach = function(callback){
        for(let i = 0; i < this.length; i++){
         callback(this[i], i, this)
        }
     };
     this.some = function(callback){
       for(let i = 0; i < this.length; i++){
         if(callback(this[i], i, this)){
           return true;
         }
         return false;
     }
   };
   this.every = function (callback) {
     for(let i = 0; i < this.length; i++){
       if(!callback(this[i], i, this)){
         return false;
   }
     return true;
   }
   };
   this.map = function(callback){
     const result = new MyArray();
     for (let i = 0; i < this.length; i++){
       result.push(callback(this[i], i, this));
     }
     return result;
   };
   this.concat = function(...args){
     const res = this;
     for (let i = 0; i < args.length; i++){
       if (Array.isArray(args[i])){
         res.push(...args[i]);
       }
       else if (MyArray.isMyArray(args[i])){
         for(let j = 0; j < args[i].length; j++){
           res.push(args[i][j]);
         }
       }
       else {
         res.push(args[i]);
       }
     }
     return res;
   };
   this.reverse = function(){
     const lengthMinusOne = this.length - 1;
     for(let i = 0; i < Math.floor(this.length / 2); i++){
       // temp = this[i];
       // this[i]= this[lengthMinusOne - i];
       // this[lengthMinusOne - i] = temp;
       [this[i], this[lengthMinusOne - i]] =[this[lengthMinusOne - i], this[i]]
   
   
     }
     return this;
   }
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
  this.flat = function(depth = 1) {
    const result = new MyArray();
    for(let i = 0; i < this.length; i++) {
        if(MyArray.isMyArray(this[i])){
          if(depth > 0){
            result.concat(this[i].flat(depth - 1));
          }
          else{
            result.push(this[i]);
          }
        }
        else{
          result.push(this[i]);
        }

      }
    return result;
  };
}

const array3D = new MyArray(100, new MyArray(200, 300, new MyArray(400, 500, 600)));
const array4D = new MyArray(100, new MyArray(200, 300, new MyArray(400, 500, 600, new MyArray(700, 800, 900))));

console.log(array3D.flat());
console.log(array3D.flat(2));
console.log(array4D.flat(2));
console.log(array4D.flat(3));
