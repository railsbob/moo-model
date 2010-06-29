var Person = new Class({
  Extends: MooModel.Base,
  ClassMethods: MooModel.Base.__classMethods,
  
  Validations: [
                { attribute: 'name', type: 'presence', message: "is required" },
                { attribute: 'number', type: 'numericality', required: false, message: "should be a number" }
               ]
});

person = new Person({id: 1, name: 'railsbob', description: "lorem", number: 100});

test("It should validate presence of attributes", function(){
  person.set('name', null);
  same(person.valid(), false);
  same(person.errors.on('name'), ['is required']);

  person.set('name', '');
  same(person.valid(), false);
  same(person.errors.on('name'), ['is required']);
});