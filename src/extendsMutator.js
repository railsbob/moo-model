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

