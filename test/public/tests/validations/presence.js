module("MooModel.Validations.Presence");

test("It should validate presence of attributes", function(){

  var Person = new Class({
    Extends: MooModel.Base,

    Validations: [{ attribute: 'name', type: 'presence' }]
  });

  person = new Person({id: 1, name: 'railsbob', description: "lorem", number: 100, age: 10});

  person.set('name', null);
  same(person.valid(), false);
  same(person.errors.on('name'), ["can't be blank"]);

  person.set('name', '');
  same(person.valid(), false);
  same(person.errors.on('name'), ["can't be blank"]);
});

test("It should validate presence of attributes with custom errors", function(){

  var Person = new Class({
    Extends: MooModel.Base,

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