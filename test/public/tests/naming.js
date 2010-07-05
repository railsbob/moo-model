test("Naming", function(){

  var Person = new Class({
    Name: 'person',
    Extends: MooModel.Base,
    ClassMethods: MooModel.Base.__classMethods
  });

  same(Person.model_name, 'person');
});