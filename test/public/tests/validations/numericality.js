module("MooModel.Validations.Numericality");

test('It should validate the numericality of attributes', function(){
  var Person = new Class({
    Extends: MooModel.Base,

    Validations: [
                  { attribute: 'number', type: 'numericality', required: false, message: "should be a number" },
                  { attribute: 'age', type: 'numericality', required: true, message: 'should be a number' }
                 ]
  });

  person = new Person({id: 1, name: 'railsbob', description: "lorem", number: 100, age: 20});

  same(person.valid(), true);
  person.set('number', '1000');
  same(person.valid(), true);

  person.set('number', 'hundered');
  same(person.valid(), false);
  same(person.errors.on('number'), ['should be a number']);
});

test('Numeric attributes can be required or optional', function(){
  var Person = new Class({
    Extends: MooModel.Base,

    Validations: [
                  { attribute: 'number', type: 'numericality', required: false, message: "should be a number" },
                  { attribute: 'age', type: 'numericality', required: true, message: 'should be a number' }
                 ]
  });

  person = new Person({id: 1, name: 'railsbob', description: "lorem", number: 100, age: 25});

  // age attribute cannot be null
  same(person.valid(), true);
  person.set('age', null);
  same(person.valid(), false);
  same(person.errors.on('age'), ['is required']);

  // number attribute can be null
  person.set('age', 26);
  person.set('number', null);
  same(person.valid(), true);
  same(person.errors.on('number'), []);
});
