MooModel.InstanceMethods = {
  initialize: function(attrs){
    this.attributes = new ObservableHash(attrs);
    this.errors = new MooModel.Errors(this);
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
  },

  new_record: function(){
    return(this.id() == null);
  },

  resource_path: function(){
    return this.constructor.resource_path(this);
  },

  collection_path: function(){
    return this.constructor.collection_path(this);
  },

  save: function(callback){
    if (this.valid()) {
      var method = this.new_record() ? "create" : "update";
      this.call_persist_method(method, callback);
    } else if (callback) {
      callback(false);
    }
    return this;
  },

  remove: function(callback){
    this.constructor.remove(this.id());
  },

  destroy: function(callback){
    this.call_persist_method("destroy", callback);
  },

  // TODO: call persistance method only if configured
  call_persist_method: function(method, callback){
    if(method == 'create'){
      this.constructor.add(this);
      // TODO: Not sure if this is the best approach
      if(this.persistance != undefined)
        this.persistance.create(this, callback);
    }else if(method == 'destroy'){
      this.constructor.remove(this.id());
      if(this.persistance != undefined)
       this.persistance.destroy(this, callback);
    }
  }
};