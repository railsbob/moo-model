module("MooModel.Validations.Length");

test("It should validate length for a particular value", function(){
  var Person = new Class({
    Extends: MooModel.Base,
    Validations: [{ attribute: 'name', type: 'length', is: 14  }]
  });

  person = new Person({id: 1, name: 'Attila the Hun'});
  same(person.valid(), true);
});

test("It should validate length with allow_null", function(){
  var Person = new Class({
    Extends: MooModel.Base,
    Validations: [{ attribute: 'name', type: 'length', is: 14, allow_null: true  }]
  });

  person = new Person({id: 1, name: null});
  same(person.valid(), true);
});

test("It should validate length with allow_blank", function(){
  var Person = new Class({
    Extends: MooModel.Base,
    Validations: [{ attribute: 'name', type: 'length', is: 14, allow_blank: true  }]
  });

  person = new Person({id: 1, name: ''});
  same(person.valid(), true);
});

test("It should validate length using minimum", function(){
  var Person = new Class({
    Extends: MooModel.Base,
    Validations: [{ attribute: 'name', type: 'length', minimum: 10 }]
  });

  person = new Person({id: 1, name: 'Attila'});
  same(person.valid(), false);

  person = new Person({id: 1, name: 'Attila the Hun'});
  same(person.valid(), true);
});

test("It should validate length using maximum", function(){
  var Person = new Class({
    Extends: MooModel.Base,
    Validations: [{ attribute: 'name', type: 'length', maximum: 14 }]
  });

  person = new Person({id: 1, name: 'Attila the Hun'});
  same(person.valid(), true);

  person = new Person({id: 1, name: 'Attila the Hun dude'});
  same(person.valid(), false);
});

test("It should validate length within a given range", function(){
  var Person = new Class({
    Extends: MooModel.Base,
    Validations: [{ attribute: 'name', type: 'length', within: [10, 14] }]
  });

  person = new Person({id: 1, name: 'Attila the Hun'});
  same(person.valid(), true);

  person = new Person({id: 1, name: 'Attila the Hun dude'});
  same(person.valid(), false);

  person = new Person({id: 1, name: 'Attila'});
  same(person.valid(), false);
});

test("It should optionally validate length using minimum", function(){
  var Person = new Class({
    Extends: MooModel.Base,
    Validations: [{ attribute: 'name', type: 'length', minimum: 10, allow_null: true }]
  });

  person = new Person({id: 1, name: 'Attila'});
  same(person.valid(), false);

  person = new Person({id: 1, name: null});
  same(person.valid(), true);
});

test("It should optionally validate length using maximum", function(){
  var Person = new Class({
    Extends: MooModel.Base,
    Validations: [{ attribute: 'name', type: 'length', maximum: 14, allow_null: true }]
  });

  person = new Person({id: 1, name: 'Attila the Hun'});
  same(person.valid(), true);

  person = new Person({id: 1, name: null});
  same(person.valid(), true);
});

test("It should optionally validate length within a given range", function(){
  var Person = new Class({
    Extends: MooModel.Base,
    Validations: [{ attribute: 'name', type: 'length', within: [10, 14], allow_null: true }]
  });

  person = new Person({id: 1, name: null});
  same(person.valid(), true);
});
