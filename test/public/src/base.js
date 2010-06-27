MooModel.Base = new Class({
  ClassMethods: $merge(MooModel.CollectionMethods, MooModel.RestPersistance),
  Implements: MooModel.Validations,

  initialize: function(attrs){
    this.attributes = new ObservableHash(attrs);
  },

  get: function(key){
    return this.attributes.get(key)
  },

  set: function(key, value){
    return this.attributes.set(key, value)
  },

  erase: function(key){
    return this.attributes.erase(key)
  },

  id: function(){
    return this.get('id') || null
  }
});
