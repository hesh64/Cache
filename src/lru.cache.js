const { DoublyLinkedList } = require('./ds/linkedlist');

class LRUCache {
  constructor(capacity = 5) {
    this.capacity = capacity;
    this.list = new DoublyLinkedList((n) => {
      return `(${ n.key }, ${ n.value })`;
    });
    this.nodes = {};
  }

  set(key, value) {
    this.nodes[key] = this.list.push({ key, value });
    if (this.list.length > this.capacity) {
      const n = this.list.pop(true);
      const { key } = n.value;
      delete this.nodes[key];
    }
  }

  get(key) {
    if (!this.nodes[key]) {
      return null;
    }
    const n = this.nodes[key];
    this.list.pop(n);
    this.nodes[key] = this.list.push(n.value);
    return n.value.value;
  }

  toString() {
    return `
Capacity: ${ this.capacity }
Used: ${ this.list.length }
${ this.list.toString() }`;
  }
}

function Test() {
  const lru = new LRUCache(5);
  console.log(lru.toString());
  lru.set('a', 'a');
  lru.set('b', 'a');
  console.log(lru.toString());
  console.log(lru.list.toString());
  console.log(lru.get('a'));
  console.log(lru.list.toString());
  lru.set('c', 'a');
  lru.set('d', 'a');
  lru.set('e', 'a');
  lru.set('f', 'a');

  console.log(lru.list.toString());
}

Test();
