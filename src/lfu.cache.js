const { DoublyLinkedList } = require('./ds/linkedlist');

class MultiList {
  constructor() {
    this._length = 0;
    this.lists = new Map;
    this.minIndex = Infinity;
  }

  get length() {
    return this._length;
  }

  listAtIndex(i) {
    if (!this.lists.has(i)) {
      this.lists.set(i, new DoublyLinkedList());
    }

    return this.lists.get(i);
  }

  push(value, i, toHead) {
    this.minIndex = Math.min(this.minIndex, i);
    return this.listAtIndex(i).push(value, toHead);
  }

  pop(node, fromHead) {
    const n = this.listAtIndex(node.value.count).pop(node);
    if (!this.listAtIndex(node.value.count).length) {

    }

  }
}

class LFUCache {
  constructor(capacity) {
    this.capacity = capacity;
    this.lists = new Map();
    this.keys = {};
  }

  _entry(key, value, count = 0) {
    return { count, key, value };
  }

  getListForIndex(i) {
    if (!this.lists.has(i)) {
      this.lists.set(i, new DoublyLinkedList());
    }

    return this.lists.get(i);
  }

  set(key, value) {
    this.keys[key] = this.getListForIndex(0).push({ key, value, count: 0 }, true);
  }

  get(key) {
    if (!this.keys[key]) {
      return null;
    }
    const n = this.keys[key];
    // get the list where the node sits
    const fromList = this.getListForIndex(n.value.count);
    // remove it from the list
    fromList.pop(n);
    // if the list is empty remove it
    if (!fromList.length) {
      this.lists.delete(n.value.count);
    }
    // increment the count
    n.value.count++;
    // insert the node at the list of the index
    this.keys[key] = this.getListForIndex(n.value.count).push(n.value);
    // return the value in the value of the node
    return this.keys[key].value.value;
  }
}
