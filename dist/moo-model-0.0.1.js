/*  js-model JavaScript library, version 0.0.1
 *  (c) 2010 Ben Pickles
 *
 *  Released under MIT license.
 */
MooModel.Base = new Class({
  ClassMethods: $merge(MooModel.CollectionMethods, MooModel.RestPersistance),
  Implements: [MooModel.Validations, MooModel.InstanceMethods],

  Validations: {}
});
Class.Mutators.ClassMethods = function(methods){
  this.__classMethods = $extend(this.__classMethods || {}, methods);
  this.extend(methods);
};

MooModel.CollectionMethods = {
  collection: [],
  add: function(object){
    if(!object.new_record()){
      existing_object = this.detect(object.id());
      if(!existing_object){
        this.collection.push(object);
      }
    }
  },

  remove: function(id){
    object = this.detect(id);
    this.collection.erase(object);
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
MooModel.Errors = new Class({
  initialize: function(model){
    this.errors = {};
    this.model = model;
  },

  add: function(attribute, message, options){
    var message = $defined(message) ? message : "is invalid";

    if (!this.errors[attribute]) this.errors[attribute] = [];
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
  },

  empty: function(){
    return this.size() == 0
  }
})
Class.Mutators.Extends = function(parent){
  this.parent = parent;
  this.prototype = Class.instantiate(parent);

  this.implement('parent', function(){
    var name = this.caller._name, previous = this.caller._owner.parent.prototype[name];
    if (!previous) throw new Error('The method "' + name + '" has no parent.');
    return previous.apply(this, arguments);
  }.protect());

  this.extend(parent.__classMethods);
};

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

  destroy: function(callback){
    this.call_persist_method("destroy", callback);
  },

  call_persist_method: function(method, callback){
    if(method == 'create'){
      this.constructor.add(this);
      MooModel.RestPersistance.create(this, callback);
    }else if(method == 'destroy'){
      this.constructor.remove(this.id());
      MooModel.RestPersistance.destroy(this, callback);
    }
  }
};
MooModel.Log = function() {
  if (window.console) window.console.log.apply(window.console, arguments);
};
/*  mooModel JavaScript library, version 0.0.1
 *  (c) 2010 Anup Narkhede, Richard Hooker
 *
 *  Released under MIT license.
 */
if (typeof MooModel == "undefined"){
  var MooModel = {};
};

MooModel = new Class({
  Implements: [Events, Options],
  options: {
  },
  initialize: function(){
  }
})
Class.Mutators.Name = function(name){
  this.model_name = name;
}
MooModel.RestPersistance = {
  create: function(resource, callback){
    this.jsonRequest('post', resource.collection_path(), resource, callback);
  },

  destroy: function(resource, callback){
    this.jsonRequest('delete', resource.resource_path(), resource, callback);
  },

  jsonRequest: function(method, url, resource, callback){
    if(method == 'delete'){
      new Request.JSON({ url: url, onSuccess: callback }).post($merge(resource.attributes.$data, {_method: 'DELETE'}));
    }else if(method == 'post'){
      new Request.JSON({ url: url, onSuccess: callback }).post(resource.attributes.$data);
    }
  },

  resource_path: function(resource){
    return ['', pluralize(resource.constructor.model_name), resource.id()].join('/');
  },

  collection_path: function(resource){
    return ['', pluralize(resource.constructor.model_name)].join('/');
  }
};
Class.Mutators.Validations = function(validations){
  this.validations = (this.validations || []).extend(validations);
  this.implement(validations);
};
MooModel.Validations = new Class({
  errors: function(){
    this.errors = new MooModel.Errors(this);
    return this.errors;
  },

  valid: function(){
    this.errors.clear();
    this._run_validate_callbacks();
    return this.errors.empty();
  },

  _run_validate_callbacks: function(){
    var object = this;
    validations = object.constructor.validations;
    if(validations != undefined){
      $each(validations, function(i){
        switch(i.type){
          case 'presence': (new MooModel.Validations.Presence(object)).validate(i);
          break;
          case 'numericality': (new MooModel.Validations.Numericality(object)).validate(i);
          break;
          case 'custom': (new MooModel.Validations.Custom(object)).validate(i);
          break;
          case 'within': (new MooModel.Validations.Within(object)).validate(i);
          break;
          case 'inclusion': (new MooModel.Validations.Inclusion(object)).validate(i);
          break;
          case 'exclusion': (new MooModel.Validations.Exclusion(object)).validate(i);
          break;
        }
      });
    }
  },

  invalid: function(){
    !this.valid();
  }
});
MooModel.Validations.Custom = new Class({
  initialize: function(object){
    this.object = object;
  },
  validate: function(validation){
    value = this.object.get(validation.attribute);

    if((validation.required == true) && (value == null))
      this.object.errors.add(validation.attribute, 'is required', {});

    if((value != null) && (value.match(validation.regex) == null)){
      this.object.errors.add(validation.attribute, validation.message, {});
    }
  }
});
MooModel.Validations.Exclusion = new Class({
  initialize: function(object){
    this.object = object;
  },
  validate: function(validation){
    value = this.object.get(validation.attribute);

    if(validation.options.contains(value))
      this.object.errors.add(validation.attribute, validation.message, {});
  }
});
MooModel.Validations.Inclusion = new Class({
  initialize: function(object){
    this.object = object;
  },
  validate: function(validation){
    value = this.object.get(validation.attribute);

    if(!validation.options.contains(value))
      this.object.errors.add(validation.attribute, validation.message, {});
  }
});
MooModel.Validations.Numericality = new Class({
  initialize: function(object){
    this.object = object;
  },
  validate: function(validation){
    value = this.object.get(validation.attribute);
    if((value == null) && (validation.required == true))
      this.object.errors.add(validation.attribute, 'is required', {});

    if(isNaN(value))
      this.object.errors.add(validation.attribute, validation.message, {});
  }
});
MooModel.Validations.Presence = new Class({
  initialize: function(object){
    this.object = object;
  },
  validate: function(validation){
    value = this.object.get(validation.attribute);
    if((value == null) || (value == '')){
      this.object.errors.add(validation.attribute, validation.message, {});
    }
  }
});
MooModel.Validations.Within = new Class({
  initialize: function(object){
    this.object = object;
  },
  validate: function(validation){
    value = this.object.get(validation.attribute);
    if((value == null) && (validation.required == true))
      this.object.errors.add(validation.attribute, 'is required', {});

    if((value > validation.max) || (value < validation.min))
      this.object.errors.add(validation.attribute, validation.message, {});
  }
});
