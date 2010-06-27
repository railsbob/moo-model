module("MooModel.Base");

test("attr, attributes, changes, reset, save, destroy", function(){
  var base = new MooModel.Base({ title: "Infinity" });
  same(base.attributes, { title: "Infinity" });
});

test("classmethods", function(){
  var Post = new Class({
    Extends: MooModel.Base,
    ClassMethods: MooModel.Base.__classMethods
  });

  var post = new Post({id: 1, name: "bean", description: "lorem"})
  Post.add(post);

  same(Post.find(1), post);
});

test("validations", function(){
  
});