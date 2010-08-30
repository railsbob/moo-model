// Validation errors
MooModel.Errors = new Class({
  initialize: function(model){
    this.errors = {};
    this.model = model;
  },

  add: function(attribute, message, options){
    var message = $defined(message) ? message : "is invalid";
    
    if (!this.errors[attribute]) this.errors[attribute] = [];
    this.errors[attribute].push(message);
  },

  all: function(){
    return this.errors;
  },

  clear: function(){
    this.errors = {};
  },

  each: function(func) {
    for (var attribute in this.errors) {
      for (var i = 0; i < this.errors[attribute].length; i++) {
        func.call(this, attribute, this.errors[attribute][i]);
      }
    }
  },

  on: function(attribute) {
    return this.errors[attribute] || [];
  },

  size: function() {
    var count = 0;
    this.each(function() { count++; });
    return count;
  },
  
  empty: function(){
    return this.size() == 0
  }
});
