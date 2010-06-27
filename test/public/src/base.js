MooModel.Base = new Class({
  ClassMethods: $merge(MooModel.CollectionMethods, MooModel.RestPersistance),
  Implements: MooModel.Validations,

  initialize: function(attrs){
    this.attributes = new ObservableHash(attrs);
  },

  get: function(key){
    return this.attributes.$data.get(key)
  },

  set: function(key, value){
    return this.attributes.$data.set(key, value)
  },

  id: function(){
    return this.attributes.id || null
  }
});
