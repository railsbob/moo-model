test("It should validate presence of attributes", function(){

  var Person = new Class({
    Extends: MooModel.Base,
    ClassMethods: MooModel.Base.__classMethods,

    Validations: [{ attribute: 'name', type: 'presence', message: "is required" }]
  });

  person = new Person({id: 1, name: 'railsbob', description: "lorem", number: 100, age: 10});

  person.set('name', null);
  same(person.valid(), false);
  same(person.errors.on('name'), ['is required']);

  person.set('name', '');
  same(person.valid(), false);
  same(person.errors.on('name'), ['is required']);
});