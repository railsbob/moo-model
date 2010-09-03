/*
 Instance Methods
*/
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
      this.changed_attributes[key] = current_value;
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

  changes: function(attr){
    instance = this;

    if(attr!=undefined)
      return [this.changed_attributes[attr], this.attributes.get(attr)];
    else{
      all_changes = new Hash();
      this.changed().each(function(attribute, index){
        all_changes[attribute] = [instance.changed_attributes[attribute], instance.attributes.get(attribute)];
      });
      return all_changes;
    }
  },

  reset: function(attr){
    instance = this;
    if(attr!=undefined){
      if(this.has_changed(attr))
        this.set(attr, this.changed_attributes[attr]);
        this.changed_attributes.erase(attr);
    }
    else{
      this.changed().each(function(attribute, index){
        instance.set(attribute, instance.changed_attributes[attribute]);
        instance.changed_attributes.erase(attribute);
      });
    }
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

  call_persist_method: function(method, callback){
    if(method == 'create'){
      if(this.constructor.persistence != undefined)
        this.constructor.persistence.create(this, callback);
    } else if(method == 'update'){
      if(this.constructor.persistence != undefined)
        this.constructor.persistence.update(this, callback);
    } else if(method == 'destroy'){
      if(this.constructor.persistence != undefined)
       this.constructor.persistence.destroy(this, callback);
    }
  }
};
