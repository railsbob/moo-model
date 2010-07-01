test('It should validate the numeric attribute with a given range', function(){

  var Person = new Class({
    Extends: MooModel.Base,
    ClassMethods: MooModel.Base.__classMethods,

    Validations: [{ attribute: 'age', type: 'within', min: 20, max: 25, required: true, message: 'out of range' }]
  });

  person = new Person({id: 1, age: 20});
  same(person.valid(), true);

  person.set('age', 19);
  same(person.valid(), false);
  same(person.errors.on('age'), ['out of range']);  

  person.set('age', 28);
  same(person.valid(), false);
  same(person.errors.on('age'), ['out of range']);

  person.set('age', 20);
  same(person.valid(), true);

  person.set('age', 25);
  same(person.valid(), true);

  person.set('age', 23);
  same(person.valid(), true);
});