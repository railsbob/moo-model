var Person = new Class({
  Extends: MooModel.Base,
  ClassMethods: MooModel.Base.__classMethods,
  
  Validations: [
                { attribute: 'name', type: 'presence', message: "is required" },
                { attribute: 'number', type: 'numericality', required: false, message: "should be a number" },
                { attribute: 'age', type: 'numericality', required: true, message: 'should be a number' },
                { attribute: 'employeeNumber', type: 'custom', required: false, regex: new RegExp(/^\d{5}$/), message: 'should be a 5 digit number' }
               ]
});

test("It should validate presence of attributes", function(){
  person = new Person({id: 1, name: 'railsbob', description: "lorem", number: 100, age: 10});

  person.set('name', null);
  same(person.valid(), false);
  same(person.errors.on('name'), ['is required']);

  person.set('name', '');
  same(person.valid(), false);
  same(person.errors.on('name'), ['is required']);
});

test('It should validate the numericality of attributes', function(){
  person = new Person({id: 1, name: 'railsbob', description: "lorem", number: 100, age: 20});

  same(person.valid(), true);
  person.set('number', '1000');
  same(person.valid(), true);

  person.set('number', 'hundered');
  same(person.valid(), false);
  same(person.errors.on('number'), ['should be a number']);
});

test('Numeric attributes can be required or optional', function(){
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

test('It should validate the attributes with a custom validation rule', function(){
  person = new Person({id: 1, name: 'railsbob', description: "lorem", number: 100, age: 25, employeeNumber: '11111' });

  same(person.valid(), true);
  person.set('employeeNumber', '123ASDF');
  same(person.valid(), false);
  same(person.errors.on('employeeNumber'), ['should be a 5 digit number']);
});