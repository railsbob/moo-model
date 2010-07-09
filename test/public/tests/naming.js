test("Naming", function(){

  var Person = new Class({
    Name: 'person',
    Extends: MooModel.Base,
    ClassMethods: {}
  });

  equals(Person.model_name, 'person');
});