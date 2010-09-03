/*
 Collection Methods
*/

MooModel.CollectionMethods = {
  collection: [],
  add: function(object){
    if(!object.new_record()){
      existing_object = this.detect(object.id());
      if(!existing_object){
        this.collection.push(object);
        this.fireEvent('add', object);
      }
    }
  },

  remove: function(id){
    object = this.detect(id);
    this.collection.erase(object);
    this.fireEvent('remove', object);
  },

  all: function(){
    return this.collection;
  },

  detect: function(id) {
    var model;
    if(this.collection.length > 0)
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
  },

  count: function(){
    return this.collection.length;
  },

  observeAdd: function(callback){
    return this.addEvent('add', callback);
  },

  observeRemove: function(callback){
    return this.addEvent('remove', callback);
  }
}

