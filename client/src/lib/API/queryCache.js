class Node {
    constructor(key, value) {
        this.key = key || null;
        this.value = value || null;
        this.prev = null;
        this.next = null;
    }
}

class LRUCache {
    constructor(capacity) {
        this.cache = new Map();
        this.capacity = capacity;

        this.head = new Node(0, 0);
        this.tail = new Node(0, 0);

        this.head.next = this.tail;
        this.tail.prev = this.head;
    }

    add(node) {
        const firstEl = this.head.next;

        this.head.next = node;
        node.prev = this.head;
        node.next = firstEl;
        firstEl.prev = node;
    }

    remove(node) {
        const previousVal = node.prev;
        const nextVal = node.next;

        previousVal.next = nextVal;
        nextVal.prev = previousVal;
    }

    put(key, value) {
        if (this.cache.has(key)) {
            const oldNode = this.cache.get(key);
            this.remove(oldNode);

            this.cache.delete(key);
        }

        if (this.cache.size >= this.capacity) {
            const nodeToRemove = this.tail.prev;
            this.remove(nodeToRemove);

            this.cache.delete(nodeToRemove.key);
        }

        const node = new Node(key, value);
        this.cache.set(key, node);
        this.add(node);

    }

    get(key) {
        if (this.head.next === this.tail) return;
        if (!this.cache.has(key)) return;

            const node = this.cache.get(key);

            this.remove(node);
            this.add(node);

        return node.value;
    }
// if I have data changed 
    invalidate(key) {
        if (this.cache.has(key)) {
            const oldNode = this.cache.get(key);

            this.remove(oldNode);
            this.cache.delete(key);
        }
    }
    has (key) {
        return this.cache.has(key);
    }
}

const maxCacheSize = parseInt(import.meta.env.VITE_MAX_CACHE_SIZE, 10) || 50;
export default new LRUCache(maxCacheSize);
