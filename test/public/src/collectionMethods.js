MooModel.CollectionMethods = {
  collection: [],
  add: function(object){
    this.collection.push(object);
    // should check if it already exists
  },
  all: function(){
    return this.collection;
  },
  detect: function(id) {
    var model;
    $each(this.collection, function(i) {
      if (i.id() == id) {
         model = i;
      }
    });
    return model;
  },

  find: function(id) {
    return this.detect(id);
  },

  first: function() {
    return this.collection[0] || null;
  },

  last: function(){
    return this.collection.getLast();
  },

  random: function(){
    return this.collection.getRandom();
  }
}
