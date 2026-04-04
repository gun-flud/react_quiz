class Node {
    constructor(value, priority) {
        this.val = value;
        this.priority = priority;

        this.next = null;
        this.prev = null;

        this.minIndex = null;
        this.maxIndex = null;
    }
}

class BidirectionalQueue {
    constructor() {
        //heap
        this.minHeap = [0];
        this.maxHeap = [0];

        //linked list
        this.head = new Node(0, 0);
        this.tail = new Node(0, 0);

        this.head.next = this.tail;
        this.tail.prev = this.head;
    }

    enqueue(value, priority) {
        const node = new Node(value, priority);

        //Linked list insert
        const nextEl = this.head.next;
        this.head.next = node;
        nextEl.prev = node;
        node.prev = this.head;
        node.next = nextEl;

        //MIN queue insert
        this.minHeap.push(node);

        let index = this.minHeap.length - 1;

        let prevIndex = Math.floor(index / 2);
        while (
            index > 1 &&
            this.minHeap[index].priority < this.minHeap[prevIndex].priority
        ) {
            this.#minNodeChanger(index, prevIndex);

            index = prevIndex;
            prevIndex = Math.floor(index / 2);
        }

        node.minIndex = index;

        //MAX queue insert
        this.maxHeap.push(node);

        index = this.maxHeap.length - 1;

        prevIndex = Math.floor(index / 2);
        while (
            index > 1 &&
            this.maxHeap[index].priority > this.maxHeap[prevIndex].priority
        ) {
            this.#maxNodeChanger(index, prevIndex)

            index = prevIndex;
            prevIndex = Math.floor(index / 2);
        }

        node.maxIndex = index;

        return 1;
    }

    #minNodeChanger(index, prevIndex) {
        const temp = this.minHeap[index];
        this.minHeap[index] = this.minHeap[prevIndex];
        this.minHeap[prevIndex] = temp;

        this.minHeap[index].minIndex = index;
        this.minHeap[prevIndex].minIndex = prevIndex;

    }

    #maxNodeChanger(index, prevIndex) {
        const temp = this.maxHeap[index];
        this.maxHeap[index] = this.maxHeap[prevIndex];
        this.maxHeap[prevIndex] = temp;

        this.maxHeap[index].maxIndex = index;
        this.maxHeap[prevIndex].maxIndex = prevIndex;
    }

    peek(type) {
        // show the first el based on criteria
        switch (type) {
            case "highest":
                return this.minHeap[1]?.val;

            case "lowest":
                return this.maxHeap[1]?.val;

            case "newest": {
                const node = this.head.next;
                return node !== this.tail ? node.val : null;
            }

            case "oldest": {
                const node = this.tail.prev;
                return node !== this.head ? node.val : null;
            }

            default:
                return "Command isn't correct";
        }
    }

    dequeue(type) {
        // return and del the first el based on criteria
        switch (type) {
            case "highest": {
                // queue
                if (this.minHeap.length === 1) return;
                //if (this.minHeap.length === 2) return this.minHeap.pop().val;

                const node = this.minHeap[1];

                if (this.minHeap.length === 2) {
                    this.minHeap.pop()
                } else {
                    this.minHeap[1] = this.minHeap.pop();
                    this.minHeap[1].minIndex = 1
                    this.moveMinHeap(1);
                };

                // max-heap
                let i = node.maxIndex;

                if (i === this.maxHeap.length - 1) {
                    this.minHeap.pop().val;
                }else {
                    this.maxHeap[i] = this.maxHeap.pop();
                    this.maxHeap[i].maxIndex = i;
                };

                this.moveMaxHeap(i);

                //linked list
                this.#deleteListNode(node);

                return node.val;
            }

            case "lowest": {
                if (this.maxHeap.length === 1) return;

                const node = this.maxHeap[1];

                if (this.maxHeap.length === 2) {
                    this.maxHeap.pop()
                } else {
                    this.maxHeap[1] = this.minHeap.pop();
                    this.maxHeap[1].maxIndex = 1
                    this.moveMaxHeap(1);
                };

                // min-heap
                let i = node.minIndex;

                if (i === this.minHeap.length - 1) {
                    this.minHeap.pop();
                }else {
                    this.minHeap[i] = this.minHeap.pop();
                    this.minHeap[i].minIndex = i;
                };

                this.moveMinHeap(i);

                //linked list
                this.#deleteListNode(node);

                return node.val;
            }

            case "oldest": 
            case "newest": {
                const node = type === "oldest" ?
                this.tail.prev : this.head.next;

                if (node === this.tail || node === this.head) return;

                this.#deleteListNode(node);

                let i = node.minIndex;

                if (i === this.minHeap.length - 1) {
                    this.minHeap.pop();
                }else {
                    this.minHeap[i] = this.minHeap.pop();
                    this.minHeap[i].minIndex = i;
                };

                this.moveMinHeap(i);

                i = node.maxIndex;

                if (i === this.maxHeap.length - 1) {
                    this.maxHeap.pop();
                }else {
                    this.maxHeap[i] = this.maxHeap.pop();
                    this.maxHeap[i].maxIndex = i;
                };

                this.moveMaxHeap(i);

                return node.val;
            }

            default:
                return "Command isn't correct";
        }
    }

    moveMaxHeap (i) {
        while(i * 2 < this.maxHeap.length) {
            if (
                (i * 2 + 1) < this.maxHeap.length &&
                this.maxHeap[i].priority < this.maxHeap[i * 2 + 1].priority &&
                this.maxHeap[i * 2 + 1].priority > this.maxHeap[i * 2].priority
            ) {

                this.#maxNodeChanger(i, i * 2 + 1);

                i = i * 2 + 1;
            } else if ( this.maxHeap[i].priority < this.maxHeap[i * 2].priority) {
                
                this.#maxNodeChanger(i, i * 2);

                i = i * 2;
            } else {
                break;
            }
        }
    }

    moveMinHeap (i) {
        while (
            i * 2 < this.minHeap.length
        ) {
            if (
                (i * 2 + 1) < this.minHeap.length &&
                this.minHeap[i].priority > this.minHeap[i * 2 + 1].priority &&
                this.minHeap[i * 2 + 1].priority < this.minHeap[i * 2].priority
                ) {
                    
                    this.#minNodeChanger(i, i * 2 + 1);

                    i = i * 2 + 1;

                } else if (this.minHeap[i].priority > this.minHeap[i * 2].priority) {
                    
                    this.#minNodeChanger(i, i * 2);

                    i = i * 2;
                } else {
                    break;
                }
        }
    }

    #deleteListNode (node) {
        const nextEl = node.next;
        const prevEl = node.prev;
        nextEl.prev = prevEl;
        prevEl.next = nextEl;
    }
}

// const bq = new BidirectionalQueue();
// bq.enqueue("Task A", 10);
// bq.enqueue("Task B", 5); 
// bq.enqueue("Task C", 15);
// bq.enqueue("Task D", 2);
// bq.enqueue("Task MAX", 40);
// bq.enqueue("Task E", 30);
// bq.enqueue("Task Need", 20);
// bq.enqueue("Task Need", 35);
// // bq.enqueue("Task Need", 1);

// // console.log(bq.peek("lowest")); // max
// // console.log(bq.peek("highest")); // d
// // console.log(bq.peek("newest")); 
// // console.log(bq.peek("oldest"));
// // console.log(bq.dequeue("highest")); // d
// // console.log(bq.dequeue("lowest")); // max

// // console.log(bq.peek("lowest"));

// // console.log(bq.peek("highest")); // B
// // // console.log(bq.peek("newest")); // D
// console.log(bq.dequeue("oldest"));



