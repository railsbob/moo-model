var Post = new Class({
  Name: 'post',
  Extends: MooModel.Base,
  ClassMethods: {}
});
var post = new Post({id: 1, name: "bean", description: "lorem"});

test("It should observe set event", function(){
  var changed = false;
  post.set('name', 'bean');
  same(changed, false);
  post.attributes.observeSet('name', function(){
    changed = true;
  });
  post.set('name', 'pulp');
  same(changed, true);
});

test("It should observe get event", function(){
  var post = new Post({id: 1, name: "bean", description: "lorem"})
  var changed = false;
  post.get('name');
  same(changed, false);
  post.attributes.observeGet('name', function(){
    changed = true;
  });
  post.get('name');
  same(changed, true);
});

test("It should observe erase event", function(){
  var post = new Post({id: 1, name: "bean", description: "lorem"})
  var changed = false;
  post.erase('name');
  same(changed, false);
  post.attributes.observeErase('name', function(){
    changed = true;
  });
  post.erase('name');
  same(changed, true);
});

