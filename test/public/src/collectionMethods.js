MooModel.CollectionMethods = {
  collection: [],
  add: function(object){
    existing_object = this.detect(object.id());
    if(!existing_object){
      this.collection.push(object);
    }
  },
  all: function(){
    return this.collection;
  },
  detect: function(id) {
    var model;
    $each(this.collection, function(i) {
      if (i.get('id') == id) {
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
