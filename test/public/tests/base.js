module("MooModel.Base");

var Post = new Class({
  Extends: MooModel.Base,
  ClassMethods: MooModel.Base.__classMethods,
  
  Validations: {
    name: 'size', required: true, message: "must set the size of the egg"
  }
});

test("initialization", function(){
  var base = new MooModel.Base({ id: 101, title: "Infinity" });
  same(base.get('title'), "Infinity");
  same(base.get('id'), 101)
});

test("classmethods", function(){
  var post = new Post({id: 1, name: "bean", description: "lorem"})
  Post.add(post);
  same(Post.find(1), post);
});
