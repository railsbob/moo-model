MooModel.Base = new Class({
  ClassMethods: $merge(MooModel.CollectionMethods, MooModel.RestPersistance),
  Implements: MooModel.Validations,

  initialize: function(attrs){
    this.attributes = attrs || {};
  },

  id: function(){
    return this.attributes.id || null
  }
});
