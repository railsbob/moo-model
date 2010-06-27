/*
Script: ObservableData.js
  A bunch of methods that you can implement on your own classes that provide a standard interface to Observable classes.

License:
  MIT-style license.

Copyright:
  Copyright (c) 2008 [Thomas Aylott](http://subtlegradient.com).

*/


var ObservableData = {
  
  // return the ObservableData
  set: function(key,value){
    if(this.get(key) == value)
      return this;
    
    if(this.has && !this.has(key))
    this.fireEvent('add:'+key, [value, key])
      .fireEvent('add', [value, key]);
    
    this.fireEvent('set:'+key, [value, key])
      .fireEvent('set', [value, key]);
    
    this.parent(key,value);
    return this;
  },
  
  // return the value
  get: function(key){
    this.fireEvent('get:'+key, key)
      .fireEvent('get', key);
    
    return this.parent(key);
  },
  
  // return the ObservableData
  erase: function(key){
    this.fireEvent('erase:'+key, key)
      .fireEvent('erase', key);
    
    this.parent(key);
    return this;
  },
  
  
  
  observeAdd: function(key,fn){
    if($type(key)=='function')
      return this.addEvent('add', key);
    
    return this.addEvent('add:'+key, fn)
  },
  
  observeGet: function(key,fn){
    if($type(key)=='function')
      return this.addEvent('get', key);
    
    return this.addEvent('get:'+key, fn)
  },
  
  observeSet: function(key,fn){
    if($type(key)=='function')
      return this.addEvent('set', key);
    
    return this.addEvent('set:'+key, fn)
  },
  
  observeErase: function(key,fn){
    if($type(key)=='function')
      return this.addEvent('erase', key);
    
    return this.addEvent('erase:'+key, fn)
  }
  
  
};
