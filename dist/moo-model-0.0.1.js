/*  MooModel JavaScript library, version 0.0.1
 *  (c) 2010 Anup Narkhede & Richard Hooker
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
});

/*
MooModel Dependency

Script: ObservableHash.js
  A Hash, but observable!

License: MIT-style license.

Copyright: Copyright (c) 2008 [Thomas Aylott](http://subtlegradient.com). */

(function(){

  var HashClass = new Class({

    initialize: function(data){
      this.merge(data);

    },
    merge: function(data){
      this.$data = new Hash($merge(this.$data, data));
      return this.$data;
    }

  });

  hash_methods = {};

  Hash.getKeys(Hash).each(function(key){

    hash_methods[key] = function(){
      var result = this.$data[key].apply(this.$data, arguments);
      if( result== this.$data)
        return this;
      return result;
    };

  });

  HashClass.implement(hash_methods);

  this.HashClass = HashClass;
})();

/*
  MooModel Dependency

  Script: ObservableData.js
  A bunch of methods that you can implement on your own classes that provide a standard interface to Observable classes.

License: MIT-style license.

Copyright: Copyright (c) 2008 [Thomas Aylott](http://subtlegradient.com). */

var ObservableData = {

  set: function(key,value){
    if(this.get(key) == value)
      return this;

    if(this.has && !this.has(key)){
      this.fireEvent('add:'+key, [value, key])
        .fireEvent('add', [value, key]);
    }

    this.fireEvent('set:'+key, [value, key])
      .fireEvent('set', [value, key]);

    this.$data.set(key,value);
    return this;
  },

  get: function(key){
    this.fireEvent('get:'+key, key)
      .fireEvent('get', key);
    return this.$data.get(key)
  },

  erase: function(key){
    this.fireEvent('erase:'+key, key)
      .fireEvent('erase', key);

    this.$data.erase(key);
    return this;
  },

  observeAdd: function(key,fn){
    if($type(key)=='function')
      return this.addEvent('add', key);

    return this.addEvent('add:'+key, fn)
  },

  observeGet: function(key,fn){
    if($type(key)=='function')
      return this.addEvent('get', key);

    return this.addEvent('get:'+key, fn)
  },

  observeSet: function(key,fn){
    if($type(key)=='function')
      return this.addEvent('set', key);

    return this.addEvent('set:'+key, fn)
  },

  observeErase: function(key,fn){
    if($type(key)=='function')
      return this.addEvent('erase', key);

    return this.addEvent('erase:'+key, fn)
  }
};

/*
  MooModel Dependency
  Script: ObservableHash.js
  A Hash, but observable!

License: MIT-style license.

Copyright: Copyright (c) 2008 [Thomas Aylott](http://subtlegradient.com).

*/


var ObservableHash = new Class({

  Extends:HashClass,
  Implements:Events

});
ObservableHash.implement(ObservableData);


/*
  MooTools Extends mutator

  Override MooTools Extends mutator to provide classmethods inheritance
*/

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

/*
  ClassMethods Mutator
  Provides easy syntax for ClassMethods declaration
*/

Class.Mutators.ClassMethods = function(methods){
  this.__classMethods = $extend(this.__classMethods || {}, methods);
  this.extend(methods);
};

/*
  MooModel Dependency

 * A port of the Rails/ActiveSupport Inflector class
 * http://api.rubyonrails.org/classes/ActiveSupport/Inflector.html
 */

var inflections = inflections = {
    plurals: [],
    singulars: [],
    uncountables: [],
    humans: []
};

var PLURALS = inflections.plurals,
    SINGULARS = inflections.singulars,
    UNCOUNTABLES = inflections.uncountables,
    HUMANS = inflections.humans;

/**
 * Specifies a new pluralization rule and its replacement. The rule can either
 * be a string or a regular expression. The replacement should always be a
 * string that may include references to the matched data from the rule.
 */
var plural = function (rule, replacement) {
    inflections.plurals.unshift([rule, replacement]);
}

/**
 * Specifies a new singularization rule and its replacement. The rule can either
 * be a string or a regular expression. The replacement should always be a
 * string that may include references to the matched data from the rule.
 */
var singular = function (rule, replacement) {
    inflections.singulars.unshift([rule, replacement]);
}

/**
 * Add uncountable words that shouldn't be attempted inflected.
 */
var uncountable = function (word) {
    inflections.uncountables.unshift(word);
}

/**
 * Specifies a new irregular that applies to both pluralization and
 * singularization at the same time. This can only be used for strings, not
 * regular expressions. You simply pass the irregular in singular and plural
 * form.
 *
 * Examples:
 *  irregular("octopus", "octopi");
 *  irregular("person", "people");
 */
var irregular = function (s, p) {
    if (s.substr(0, 1).toUpperCase() == p.substr(0, 1).toUpperCase()) {
        plural(new RegExp("(" + s.substr(0, 1) + ")" + s.substr(1) + "$", "i"), '$1' + p.substr(1));
        plural(new RegExp("(" + p.substr(0, 1) + ")" + p.substr(1) + "$", "i"), '$1' + p.substr(1));
        singular(new RegExp("(" + p.substr(0, 1) + ")" + p.substr(1) + "$", "i"), '$1' + s.substr(1));
    } else {
        plural(new RegExp(s.substr(0, 1).toUpperCase() + s.substr(1) + "$"), p.substr(0, 1).toUpperCase() + p.substr(1));
        plural(new RegExp(s.substr(0, 1).toLowerCase() + s.substr(1) + "$"), p.substr(0, 1).toLowerCase() + p.substr(1));
        plural(new RegExp(p.substr(0, 1).toUpperCase() + p.substr(1) + "$"), p.substr(0, 1).toUpperCase() + p.substr(1));
        plural(new RegExp(p.substr(0, 1).toLowerCase() + p.substr(1) + "$"), p.substr(0, 1).toLowerCase() + p.substr(1));
        singular(new RegExp(p.substr(0, 1).toUpperCase() + p.substr(1) + "$"), s.substr(0, 1).toUpperCase() + s.substr(1));
        singular(new RegExp(p.substr(0, 1).toLowerCase() + p.substr(1) + "$"), s.substr(0, 1).toLowerCase() + s.substr(1));
    }
}

/**
 * Specifies a humanized form of a string by a regular expression rule or by a
 * string mapping. When using a regular expression based replacement, the normal
 * humanize formatting is called after the replacement.
 */
var human = function (rule, replacement) {
    inflections.humans.push([rule, replacement]);
}

plural(/$/, "s");
plural(/s$/i, "s");
plural(/(ax|test)is$/i, "$1es");
plural(/(octop|vir)us$/i, "$1i");
plural(/(alias|status)$/i, "$1es");
plural(/(bu)s$/i, "$1ses");
plural(/(buffal|tomat)o$/i, "$1oes");
plural(/([ti])um$/i, "$1a");
plural(/sis$/i, "ses");
plural(/(?:([^f])fe|([lr])f)$/i, "$1$2ves");
plural(/(hive)$/i, "$1s");
plural(/([^aeiouy]|qu)y$/i, "$1ies");
plural(/(x|ch|ss|sh)$/i, "$1es");
plural(/(matr|vert|ind)(?:ix|ex)$/i, "$1ices");
plural(/([m|l])ouse$/i, "$1ice");
plural(/^(ox)$/i, "$1en");
plural(/(quiz)$/i, "$1zes");

singular(/s$/i, "")
singular(/(n)ews$/i, "$1ews")
singular(/([ti])a$/i, "$1um")
singular(/((a)naly|(b)a|(d)iagno|(p)arenthe|(p)rogno|(s)ynop|(t)he)ses$/i, "$1$2sis")
singular(/(^analy)ses$/i, "$1sis")
singular(/([^f])ves$/i, "$1fe")
singular(/(hive)s$/i, "$1")
singular(/(tive)s$/i, "$1")
singular(/([lr])ves$/i, "$1f")
singular(/([^aeiouy]|qu)ies$/i, "$1y")
singular(/(s)eries$/i, "$1eries")
singular(/(m)ovies$/i, "$1ovie")
singular(/(x|ch|ss|sh)es$/i, "$1")
singular(/([m|l])ice$/i, "$1ouse")
singular(/(bus)es$/i, "$1")
singular(/(o)es$/i, "$1")
singular(/(shoe)s$/i, "$1")
singular(/(cris|ax|test)es$/i, "$1is")
singular(/(octop|vir)i$/i, "$1us")
singular(/(alias|status)es$/i, "$1")
singular(/^(ox)en/i, "$1")
singular(/(vert|ind)ices$/i, "$1ex")
singular(/(matr)ices$/i, "$1ix")
singular(/(quiz)zes$/i, "$1")
singular(/(database)s$/i, "$1")

irregular("person", "people");
irregular("man", "men");
irregular("child", "children");
irregular("sex", "sexes");
irregular("move", "moves");
irregular("cow", "kine");

uncountable("equipment");
uncountable("information");
uncountable("rice");
uncountable("money");
uncountable("species");
uncountable("series");
uncountable("fish");
uncountable("sheep");
uncountable("jeans");

/**
 * Returns the plural form of the word in the string.
 */
pluralize = function (word) {
    var wlc = word.toLowerCase();

    for (var i = 0; i < UNCOUNTABLES.length; i++) {
        var uncountable = UNCOUNTABLES[i];
        if (wlc == uncountable) {
            return word;
        }
    }

    for (var i = 0; i < PLURALS.length; i++) {
        var rule = PLURALS[i][0],
            replacement = PLURALS[i][1];
        if (rule.test(word)) {
            return word.replace(rule, replacement);
        }
    }
}

/**
 * Returns the singular form of the word in the string.
 */
singularize = function (word) {
    var wlc = word.toLowerCase();

    for (var i = 0; i < UNCOUNTABLES.length; i++) {
        var uncountable = UNCOUNTABLES[i];
        if (wlc == uncountable) {
            return word;
        }
    }

    for (var i = 0; i < SINGULARS.length; i++) {
        var rule = SINGULARS[i][0],
            replacement = SINGULARS[i][1];
        if (rule.test(word)) {
            return word.replace(rule, replacement);
        }
    }
}

/**
 * Capitalizes the first word and turns underscores into spaces and strips a
 * trailing "Key", if any. Like +titleize+, this is meant for creating pretty
 * output.
 *
 * Examples:
 *   "employeeSalary" => "employee salary"
 *   "authorKey"       => "author"
 */
humanize = function (word) {
    for (var i = 0; i < HUMANS.length; i++) {
        var rule = HUMANS[i][0],
            replacement = HUMANS[i][1];
        if (rule.test(word)) {
            word = word.replace(rule, replacement);
        }
    }

    return split(word, " ").toLowerCase();
}

/**
 * Split a camel case word in its terms.
 */
split = function (word, delim) {
    delim = delim || " ";
    var replacement = "$1" + delim + "$2";
    return word.
        replace(/([A-Z]+)([A-Z][a-z])/g, replacement).
        replace(/([a-z\d])([A-Z])/g, replacement);
}

/**
 * Converts a CamelCase word to underscore format.
 */
underscore = function (word) {
    return split(word, "_").toLowerCase();
}

/**
 * Converts a CamelCase word to dash (lisp style) format.
 */
dash = dasherize = function (word) {
    return split(word, "-").toLowerCase();
}

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

/*
  Persistance Mutator to attach a persistance object
*/
Class.Mutators.Persistence = function(options){
  this.model_name = options.resource_name;
  this.route = options.route;
  this.persistence = options.uses;
  this.extend(options.uses);
};

/*
  RestPersistance Adapter
*/

MooModel.RestPersistence = {
  create: function(resource, callback){
    this.jsonRequest('post', resource.collection_path(), resource, callback);
  },

  update: function(resource, callback){
    this.jsonRequest('update', resource.resource_path(), resource, callback);
  },

  destroy: function(resource, callback){
    this.jsonRequest('delete', resource.resource_path(), resource, callback);
  },

  jsonRequest: function(method, url, resource, callback){
    var self = this;
    var request_method;

    switch(method){
      case 'delete':
        request_method = 'DELETE';
        break;
      case 'update':
        request_method = 'PUT';
        break;
      case 'post':
        request_method = 'POST';
        break;
    }

    var result = new Request.JSON({
      url: url,
      onSuccess: function(data){
        self.refreshAttributes(result, method, resource, data, callback);
      },
      onFailure: function(data){
        self.refreshAttributes(result, method, resource, data, callback);
      }
    }).post($merge(resource.attributes.$data, { _method: request_method }));

  },

  refreshAttributes: function(request, method, resource, data, callback){

    if(request.status == 200){

      if(method!='delete'){
        $each(data, function(a,b){
          resource.set(b, data[b]);
        });
      }

      object = resource.constructor.find(resource.id());

      if(object!=undefined)
        resource.constructor.remove(object.id());

      if(method!='delete')
        resource.constructor.add(resource);
    }else if(request.status == 422){
      $each(JSON.parse(data.responseText), function(error){
        resource.errors.add(error[0], error[1]);
      });
    }

    if(callback)
      callback.call(resource);
  },

  resource_path: function(resource){
    if(resource.constructor.route == undefined)
      return ['', pluralize(resource.constructor.model_name), resource.id()].join('/');
    else
      return [resource.constructor.route, resource.id()].join('/');
  },

  collection_path: function(resource){
    if(resource.constructor.route == undefined)
      return ['', pluralize(resource.constructor.model_name)].join('/');
    else
      return resource.constructor.route;
  }
};

/*
  MooModel.Validations
*/

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
          case 'length': (new MooModel.Validations.Length(object)).validate(i);
          break;
        }
      });
    }
  },

  invalid: function(){
    !this.valid();
  }
});

/*
  MooModel.Validations.Presence
*/

MooModel.Validations.Presence = new Class({
  initialize: function(object){
    this.object = object;
  },
  validate: function(validation){
    value = this.object.get(validation.attribute);
    if (((value == null) && (validation.allow_null == true)) || ((value == '') && (validation.allow_blank == true)))
      return;

    if((value == null) || (value == '')){
      this.object.errors.add(validation.attribute, (validation.message || "can't be blank"), {});
    }
  }
});

/*
  MooModel.Validations.Numericality
*/

MooModel.Validations.Numericality = new Class({
  initialize: function(object){
    this.object = object;
  },
  validate: function(validation){
    value = this.object.get(validation.attribute);

    if((isNaN(value)) || ((value ==null) && validation.allow_null == false) || ((value == '') && validation.allow_blank == false))
      this.object.errors.add(validation.attribute, (validation.message || 'should be a number'), {});
  }
});

/*
  MooModel.Validations.Custom
*/

MooModel.Validations.Custom = new Class({
  initialize: function(object){
    this.object = object;
  },
  validate: function(validation){
    value = this.object.get(validation.attribute);
    if (((value == null) && (validation.allow_null == true)) || ((value == '') && (validation.allow_blank == true)))
      return;

    if((value != null) && (value.match(validation.regex) == null)){
      this.object.errors.add(validation.attribute, validation.message, {});
    }
  }
});

/*
  MooModel.Validations.Within
*/

MooModel.Validations.Within = new Class({
  initialize: function(object){
    this.object = object;
  },
  validate: function(validation){
    value = this.object.get(validation.attribute);
    if (((value == null) && (validation.allow_null == true)) || ((value == '') && (validation.allow_blank == true)))
      return;

    if((value > validation.max) || (value < validation.min))
      this.object.errors.add(validation.attribute, (validation.message || 'out of range'), {});
  }
});

/*
  MooModel.Validations.Length
*/

MooModel.Validations.Length = new Class({
  initialize: function(object){
    this.object = object;
  },
  validate: function(validation){
    if(((this.object.get(validation.attribute) == null) && (validation.allow_null == true)) || ((this.object.get(validation.attribute) == '') && (validation.allow_blank == true)))
      return;
    value = this.object.get(validation.attribute).length;
    if(validation.is != undefined){
      if(value != validation.is)
        add_error(this, validation.message);
    }else if(validation.minimum != undefined){
      if(value < validation.minimum)
        add_error(this, validation.message);
    }else if(validation.maximum != undefined){
      if(value > validation.maximum)
        add_error(this, validation.message);
    }else if(validation.within != undefined){
      if((value > validation.within[1]) || (value < validation.within[0]))
        add_error(this, validation.message);
    }
    add_error = function(object, message){
      object.object.errors.add(validation.attribute, (message || "has invalid length"), {});
    }
  }
});

/*
  MooModel.Validations.Inclusion
*/

MooModel.Validations.Inclusion = new Class({
  initialize: function(object){
    this.object = object;
  },
  validate: function(validation){
    value = this.object.get(validation.attribute);
    if (((value == null) && (validation.allow_null == true)) || ((value == '') && (validation.allow_blank == true)))
      return;

    if(!validation.options.contains(value))
      this.object.errors.add(validation.attribute, (validation.message || 'is not allowed'), {});
  }
});

/*
  MooModel.Validations.Exclusion
*/

MooModel.Validations.Exclusion = new Class({
  initialize: function(object){
    this.object = object;
  },
  validate: function(validation){
    value = this.object.get(validation.attribute);
    if (((value == null) && (validation.allow_null == true)) || ((value == '') && (validation.allow_blank == true)))
      return;

    if(validation.options.contains(value))
      this.object.errors.add(validation.attribute, (validation.message || 'is not allowed'), {});
  }
});


/*
  Validations mutator
*/

Class.Mutators.Validations = function(validations){
  this.validations = (this.validations || []).extend(validations);
  this.implement(validations);
};

/*
  MooModel.Errors
*/

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
});
/*
  MooModel.Base
*/

MooModel.Base = new Class({
  Implements: [MooModel.Validations, MooModel.InstanceMethods],
  ClassMethods: $merge(Events.prototype, MooModel.CollectionMethods),
  Validations: {}
});

