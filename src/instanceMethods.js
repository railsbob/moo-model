MooModel.InstanceMethods = {
  initialize: function(attrs){
    this.attributes = new ObservableHash(attrs);
    this.errors = new MooModel.Errors(this);
    this.changed_attributes = new Hash();
  },

  get: function(key){
    return this.attributes.get(key);
  },

  set: function(key, value){
    current_value = this.attributes.get(key);
    if(current_value != value){
      this.changed_attributes[key] = [current_value, value];
    }
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

  changed: function(){
    return this.changed_attributes.getKeys();
  },

  has_changed: function(attr){
    if(attr!=undefined){
      return this.changed_attributes.has(attr);
    }else{
      return this.changed_attributes.getKeys().length > 0;
    }
  },

  attribute_changes: function(attr){
    if(attr!=undefined)
      return this.changed_attributes[attr];
    else
      return this.changed_attributes;
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
      this.changed_attributes.empty();
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