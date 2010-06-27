MooModel.Errors = new Class({
  add: function(atttribute, message, options){
    var message = $defined(message) ? message : "invalid";
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
  }
})