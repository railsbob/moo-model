module("MooModel.Validations.Custom");

test('It should validate the attributes with a custom validation rule', function(){

  var Person = new Class({
    Extends: MooModel.Base,

    Validations: [{ attribute: 'employeeNumber', type: 'custom', required: false, regex: new RegExp(/^\d{5}$/), message: 'should be a 5 digit number' }]
  });

  person = new Person({id: 1, name: 'railsbob', description: "lorem", number: 100, age: 25, employeeNumber: '11111' });

  same(person.valid(), true);
  person.set('employeeNumber', '123ASDF');
  same(person.valid(), false);
  same(person.errors.on('employeeNumber'), ['should be a 5 digit number']);
});