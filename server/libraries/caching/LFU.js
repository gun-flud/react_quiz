
// LFU

class Node {
    constructor(key, value) {
        this.key = key;
        this.value = value;

        this.frequency = 1;

        this.next = null;
        this.prev = null;
    }
}

export class LFUCache {
    constructor(capacity) {
        this.capacity = capacity;

        this.cache = new Map();
        this.freqList = new Map();

        this.minFrequency = 0;
    }

    put(key, value) {
        if (this.capacity === 0) return;

        if (this.cache.has(key)) {
            const node = this.cache.get(key);
            node.value = value;

            this.updateFrequency(node); //
        } else {
            if (this.cache.size >= this.capacity) {
                const minFreqValues = this.freqList.get(this.minFrequency);
                const valueToDelete = minFreqValues.tail.prev;

                this.remove(valueToDelete);

                this.cache.delete(valueToDelete.key);
            }

            // adding to Linked-list
            const node = new Node(key, value);
            this.minFrequency = 1;

            // adding to hash-map
            this.cache.set(key, node);

            this.add(node, this.minFrequency);
        }
    }

    add(node, frequency) {
        if (!this.freqList.has(frequency)) {
            const head = new Node(0, 0);
            const tail = new Node(0, 0);
            head.next = tail;
            tail.prev = head;

            this.freqList.set(frequency, { head, tail });
        }

        const freqValues = this.freqList.get(frequency);
        const firstEl = freqValues.head.next;
        freqValues.head.next = node;
        node.prev = freqValues.head;
        node.next = firstEl;
        firstEl.prev = node;
    }

    get(key) {
        if (!this.cache.has(key)) return -1;

        const node = this.cache.get(key);
        this.updateFrequency(node);

        return node.value;
    }

    remove(node) {
        const previousVal = node.prev;
        const nextVal = node.next;
        previousVal.next = nextVal;
        nextVal.prev = previousVal;
    }

    updateFrequency(node) {
        const oldFreq = node.frequency;
        node.frequency++;

        this.remove(node);

        if (this.freqList.get(oldFreq).head.next === this.freqList.get(oldFreq).tail) {
            this.freqList.delete(oldFreq);

            if (this.minFrequency === oldFreq) {
                this.minFrequency++;
            }
        }

        this.add(node, node.frequency);
        //додати мінімальну фріквенсі
        //додати фріквенсі ноде
    }
}


// const cache = new LFUCache(2);

// cache.put(1, 1);
// cache.put(2, 2);
// console.log(cache.get(1) + " ");
// cache.put(3, 3);
// console.log(cache.get(2) + " ");
// cache.put(4, 4);
// console.log(cache.get(3) + " ");
// console.log(cache.get(4) + " ");
// cache.put(5, 5);