/*
MooModel Dependency

Script: ObservableHash.js
  A Hash, but observable!

License: MIT-style license.

Copyright: Copyright (c) 2008 [Thomas Aylott](http://subtlegradient.com). */

(function(){
  
  var HashClass = new Class({
    
    // ExtendsNative:Hash
    initialize: function(data){
      this.merge(data);
      
    },
    merge: function(data){
      this.$data = new Hash($merge(this.$data, data));
      return this.$data;
    }
    
  });
  
  hash_methods = {};
  
  Hash.getKeys(Hash).each(function(key){
    
    hash_methods[key] = function(){
      var result = this.$data[key].apply(this.$data, arguments);
      if( result== this.$data)
        return this;
      return result;
    };
    
  });
  
  HashClass.implement(hash_methods);
  
  this.HashClass = HashClass;
})();

