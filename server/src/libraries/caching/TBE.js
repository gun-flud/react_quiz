class Node {
    constructor(value, deleteTime) {
        this.value = value;
        this.deleteTime = deleteTime;
    }
}
export class TBECache {
    constructor(timelimit) {
        this.cache = new Map();
        this.timestamp = timelimit;

        const timer = setInterval(() => {
            this.garbadgeCollect();
        }, this.timestamp);
    }

    put(key, value) {
        const deleteTime = Date.now() + this.timestamp;
        const node = new Node(value, deleteTime);
        this.cache.set(key, node);
        return node.value;
    }

    get(key) {
        if (!this.cache.has(key)) return -1;

        const node = this.cache.get(key);

        if (Date.now() >= node.deleteTime) {
            this.cache.delete(key);
            return -1;
        }
        return node.value;
    }

    garbadgeCollect() {
        let deleteCounLog = 0;

        for (const [key, node] of this.cache) {
            if (Date.now() >= node.deleteTime) {
                this.cache.delete(key);
                deleteCounLog++;
            }
        }

        if (deleteCounLog > 0) {
            console.log("GarbageCollector deleted: ", deleteCounLog);
        }
    }
}

// const cache = new TBECache(10000);

// console.log('Cache:', cache);
// console.log('Put (1, 1):', cache.put(1, 1));
// console.log('Put (2, 2):', cache.put(2, 2));
// console.log('Put (3, 3):', cache.put(3, 3));
// console.log('Put (2, 2):', cache.put(4, 4));
// console.log('Put (2, 2):', cache.put(4, 5));
// console.log('Get (1):', cache.get(3));
