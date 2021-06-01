class LinkedNode {
  constructor(value = null, next = null, prev = null) {
    this.value = value;
    this.next = next;
    this.prev = prev;
  }
}

class DoublyLinkedList {
  constructor(stringify) {
    this.head = null;
    this.tail = null;
    this._length = 0;
    this.stringify = stringify;
  }

  get length() {
    return this._length;
  }

  _insertAtHead(value) {
    const n = new LinkedNode(value);
    if (this.head) {
      n.next = this.head;
      this.head.prev = n;
    }
    this.head = n;
    return n;
  }

  _insertAtTail(value) {
    const n = new LinkedNode(value);
    if (this.tail) {
      n.prev = this.tail;
      this.tail.next = n;
    }

    this.tail = n;
    return n;
  }

  _removeFromHead() {
    const t = this.head;
    const next = t.next;

    next.prev = null;
    this.head.next = null;
    this.head = next;

    return t;
  }

  _removeFromEnd() {
    const t = this.tail;
    const prev = t.prev;

    prev.next = null;
    this.tail.prev = null;
    this.tail = prev;

    return t;
  }

  push(value, atHead = false) {
    if (this._length === 0) {
      this._length++;
      this.head = this.tail = new LinkedNode(value);
      return this.head;
    }
    else {
      this._length++;
      if (atHead) {
        return this._insertAtHead(value);
      }

      return this._insertAtTail(value);
    }
  }

  pop(fromHeadNode = false) {
    if (this.head && fromHeadNode === this.head) {
      fromHeadNode = true;
    }
    else if (this.tail && fromHeadNode === this.tail) {
      fromHeadNode = false;
    }
    if (!this.length) {
      return null;
    }
    if (this.length === 1) {
      const t = this.head;
      this.head = this.tail = null;
      this._length--;

      return t;
    }
    else if (fromHeadNode instanceof LinkedNode) {
      fromHeadNode.prev.next = fromHeadNode.next;
      fromHeadNode.next.prev = fromHeadNode.prev;
      return fromHeadNode;
    }
    else {
      this._length--;
      if (fromHeadNode) {
        return this._removeFromHead();
      }

      return this._removeFromEnd();
    }
  }

  toString(reversed = false) {
    if (this.length === 0) {
      return '';
    }
    const vals = [];
    let cur;
    if (reversed) {
      cur = this.tail;
      while (cur) {
        vals.push(this.stringify && this.stringify(cur.value) || cur.value);
        cur = cur.prev;
      }
    }
    else {
      cur = this.head;
      while (cur) {
        vals.push(this.stringify && this.stringify(cur.value) || cur.value);
        cur = cur.next;
      }
    }
    return vals.join(', ');
  }
}

function test() {
  const ll = new DoublyLinkedList();
  const f = ll.push(1);
  ll.push(2);
  const _ = ll.push(12);
  ll.push(31);
  ll.push(34);
  console.log(ll.toString());
  // console.log(ll.pop(true));
  // console.log(ll.pop(true));
  // console.log(ll.pop(true));
  // console.log(ll.pop(true));
  ll.pop(f);
  console.log(ll.toString());
  console.log(ll.toString(true));
  ll.pop(_);
  // console.log(ll.pop(true));
  // console.log(ll.pop(true));
  console.log(ll.toString());
  console.log(ll.toString(true));
}

test();

module.exports = {
  LinkedNode, DoublyLinkedList,
};
