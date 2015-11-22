function Heap(init) {
  this._heap = [];
}

function getWhitespaces (n) {
  var w = [];
  for (var i = 0; i < n ; i++) {
    w.push('  ');
  }
  return w.join('');
}

Heap.prototype.print = function (n, level) {
  n = n || 0;
  level = level || 1;
  var children = this.getNodeChildren(n);
  console.log(getWhitespaces(level) + '|' + this._heap[n]);
  level++;
  for(var i = 0; i < children.length; i++){
    if (children[i] === undefined) return;
    this.print(children[i], level);
  }
};

Heap.prototype.getTreeHeight = function () {
  return Math.log(this._heap.length) / Math.log(2);
};

Heap.prototype.getNodeChildren = function (n) {
  var child1 = (n * 2) + 1;
  var child2 = (n * 2) + 2;

  if (child1 > this._heap.length-1) child1 = undefined;
  if (child2 > this._heap.length-1) child2 = undefined;

  return [child1, child2];
};

Heap.prototype.getNodeParent = function (n) {
  if (n === 0) return undefined;

  var parent = Math.floor((n - 1) / 2);

  return parent < 0 ? 0 : parent;
};

Heap.prototype.swapNodeWithParent = function (n) {
  var parent = this.getNodeParent(n);
  if (parent === undefined) return;
  var tmp = this._heap[parent];
  this._heap[parent] = this._heap[n];
  this._heap[n] = tmp;
};

Heap.prototype.add = function (val) {
  this._heap.push(val);
  this.restoreHeapProperty(this._heap.length - 1);
  this.print();
};

Heap.prototype.restoreHeapProperty = function (i) {
  var parent = this.getNodeParent(i);
  if(parent === undefined) return;
  if(this._heap[i] > this._heap[parent]) this.swapNodeWithParent(i);
  this.restoreHeapProperty(parent);
};
