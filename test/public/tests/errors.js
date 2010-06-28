module("MooModel.Errors");

var post = new Post({id: 1, name: "bean", description: "lorem"});

test("MooModel.Errors", function(){
  var errors = new MooModel.Errors();
  equals(errors.size(), 0);
  same(errors.on("name"), []);
  same(errors.on("description"), []);
});

test("Test functions [add, all, clear, each, on, size] on object.errors", function(){
  post.errors.add('name', 'is incorrect', {});
  same(post.errors.on('name'), ['is incorrect']);

  post.errors.add('description', 'should be short', {});
  same(post.errors.all(), { name: ['is incorrect'], description: ['should be short'] });

  var count = 0
  post.errors.each(function(){
    count++;
  });
  same(count, 2);

  same(post.errors.size(), 2);

  post.errors.clear();
  same(post.errors.size(), 0);
});
