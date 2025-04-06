class Node {
    constructor(val, parent = null, left = null, right = null) {
        this.val = val;
        this.parent = parent;
        this.left = left;
        this.right = right;
    }
}

class BinarySearchTree {
    constructor(root = null) {
        this.root = root;
    }

    /** insert(val): insert a new node into the BST with value val.
     * Returns the tree. Uses iteration. */

    insert(val) {
        let currentNode = this.root;
        if (currentNode === null) {
            this.root = new Node(val, null);
            return this;
        }
        while (currentNode) {
            if (val === currentNode.val) return this;

            if (val < currentNode.val) {
                if (currentNode.left === null) {
                    currentNode.left = new Node(val, currentNode);
                }
                currentNode = currentNode.left;
            } else {
                if (currentNode.right === null) {
                    currentNode.right = new Node(val, currentNode);
                }
                currentNode = currentNode.right;
            }
        }
        return this;
    }

    /** insertRecursively(val): insert a new node into the BST with value val.
     * Returns the tree. Uses recursion. */

    insertRecursively(val) {
        let currentNode = this.root;
        if (currentNode === null) {
            this.root = new Node(val);
            return this;
        }

        function helper(n) {
            if (val < n.val) {

                if (n.left === null) {
                    n.left = new Node(val, n);
                } else {
                    helper(n.left)
                }

            } else if (val > n.val) {

                if (n.right === null) {
                    n.right = new Node(val, n);
                } else {
                    helper(n.right);
                }
            }
        }

        helper(currentNode)
        return this;
    }

    /** find(val): search the tree for a node with value val.
     * return the node, if found; else undefined. Uses iteration. */

    find(val) {
        let currentNode = this.root;
        if (currentNode === null) return 'undefined';

        while (currentNode) {
            if (currentNode.val === val) return currentNode;
            currentNode = val < currentNode.val
                ? currentNode.left
                : currentNode.right
        }
    }

    /** findRecursively(val): search the tree for a node with value val.
     * return the node, if found; else undefined. Uses recursion. */

    findRecursively(val) {
        let currentNode = this.root;
        if (currentNode === null) return 'undefined';

        function helper(n) {
            if (!n) return null
            if (val === n.val) return n

            if (val < n.val) {
                currentNode = helper(n.left)
            } else {
                currentNode = helper(n.right)
            }
        }
        helper(currentNode);
        return currentNode;
    }


    /** dfsPreOrder(): Traverse the array using pre-order DFS.
     * Return an array of visited nodes. */
    dfsPreOrder() {
        const path = [];
        function helper(node = this.root) {
            //pre-order
            path.push(node.val);
            if (node.left) helper(node.left);
            if (node.right) helper(node.right);
        }
        helper(this.root)
        return path;
    }



    /** dfsInOrder(): Traverse the array using in-order DFS.
     * Return an array of visited nodes. */

    dfsInOrder() {
        const path = [];
        function helper(node = this.root) {
            //in-order
            if (node.left) helper(node.left);
            path.push(node.val);
            if (node.right) helper(node.right);
        }
        helper(this.root)
        return path;
    }

    /** dfsPostOrder(): Traverse the array using post-order DFS.
     * Return an array of visited nodes. */

    dfsPostOrder() {
        const path = [];
        function helper(node = this.root) {
            //post-order
            if (node.left) helper(node.left);
            if (node.right) helper(node.right);
            path.push(node.val);
        }
        helper(this.root)
        return path;
    }

    /** bfs(): Traverse the array using BFS.
     * Return an array of visited nodes. */

    bfs() {
        const path = [];
        const queue = [];
        if (this.root) queue.push(this.root);

        while (queue.length) {
            const currentNode = queue.shift();
            path.push(currentNode.val);

            if (currentNode.left) queue.push(currentNode.left);
            if (currentNode.right) queue.push(currentNode.right);
        }
        return path;
    }

    /** Further Study!
     * remove(val): Removes a node in the BST with the value val.
     * Returns the removed node. */

    //this is to determine the best side to find a replacement for remove with two children.
    //min and max are for the same.
    maxDepth(node = this.root) {
        if (node === null) return 0;                                                //check if empty
        return 1 + Math.max(this.maxDepth(node.left), this.maxDepth(node.right));   //return the max between and return
    }
    findMin(node = this.root) {
        if (!node) return null;
        if (!node.left) return node;
        return this.findMin(node.left);
    }
    findMax(node = this.root) {
        if (!node) return null;
        if (!node.right) return node;
        return this.findMax(node.right);
    }
    remove(val) {
        let c = this.find(val);     //c is the currentNode. I shortened it so I could see what I was doing.
        let deletedNode = c;

        //no children
        if (!c.left && !c.right) {
            if (c.parent.left === c) c.parent.left = null;
            if (c.parent.right === c) c.parent.right = null;
            c = null;
            return deletedNode;
        }

        //one child
        if (c.right && !c.left) {
            c.right.parent = c.parent;
            if (c.parent.left === c) c.parent.left = c.right;
            if (c.parent.right === c) c.parent.right = c.right;
            c = null
            return deletedNode;
        }
        if (!c.right && c.left) {
            c.left.parent = c.parent;
            if (c.parent.left === c) c.parent.left = c.left;
            if (c.parent.right === c) c.parent.right = c.left;
            c = null;
            return deletedNode;
        }

        //two children
        if (c.left && c.right) {

            let candidate;

            //left side or right side (to assist in maintaining balance)
            if (this.maxDepth(c.left) > this.maxDepth(c.right)) {

                //detach candidate from it's parent
                candidate = this.findMax(c.left);

                if (candidate.parent.right === candidate) {
                    candidate.parent.right = candidate.left;
                    if (candidate.left) candidate.left.parent = candidate.parent;

                } else {
                    candidate.parent.left = candidate.left;
                    if (candidate.left) candidate.left.parent = candidate.parent;
                }

            } else {

                //detach candidate from it's parent
                candidate = this.findMin(c.right);

                if (candidate.parent.left === candidate) {
                    candidate.parent.left = candidate.right;
                } else {
                    candidate.parent.right = candidate.right;
                    if (candidate.parent.right) candidate.right.parent = candidate.parent;
                }
            }

            //inherit connections from target node
            candidate.parent = c.parent;
            candidate.left = c.left;
            candidate.right = c.right;

            if (candidate.left) candidate.left.parent = candidate;
            if (candidate.right) candidate.right.parent = candidate;

            //connect parent's reference
            if (c.parent) {
                if (c.parent.left === c) {
                    c.parent.left = candidate;
                } else {
                    c.parent.right = candidate;
                }

            } else {
                this.root = candidate;
            }

            c = null;
            return deletedNode;
        }
    }


    /** Further Study!
     * isBalanced(): Returns true if the BST is balanced, false otherwise. */

    isBalanced() {
        if (this.root === null) return false;
        if (this.root.left || this.root.right) {
            if (this.maxDepth(this.root.left) === this.maxDepth(this.root.right)) return true;
            return false;
        } else {
            return true;
        }
    }

    /** Further Study!
     * findSecondHighest(): Find the second highest value in the BST, if it exists.
     * Otherwise return undefined. */

    findSecondHighest() {
        if (this.root === null) return undefined;
        if (this.maxDepth() === 1) return undefined;
        const currentNode = this.findMax();
        const secondHighest = currentNode.left ? currentNode.left.val : currentNode.parent;
        return secondHighest.val;
    }
}

// const binarySearchTree = new BinarySearchTree();
// binarySearchTree
//     .insert(15)
//     .insert(20)
//     .insert(10)
//     .insert(12)
//     .insert(1)
//     .insert(5)
//     .insert(50)
//     .insert(60)
//     .insert(30)
//     .insert(25)
//     .insert(23)
//     .insert(24)
//     .insert(70);

// binarySearchTree.remove(10);
// console.log(binarySearchTree.root.left.val)             //(12); <-- this is incorrect. The idea is to balance the tree by taking from the longer leg. The answer should be (5)
// console.log(binarySearchTree.root.left.left.val)        //(1);
// //console.log(binarySearchTree.root.left.left.right.val)//(5);

// console.log('>>>>> here')
// binarySearchTree.remove(50);
// console.log(binarySearchTree.root.right.val)            //(20);
// console.log(binarySearchTree.root.right.right.val)      //(60); <-- this is incorrect. The idea is to balance the tree by taking from the longer leg. The answer should be (30)
// console.log(binarySearchTree.root.right.right.left)

// const binarySearchTree2 = new BinarySearchTree();
// binarySearchTree2
//     .insert(15)
//     .insert(20)
//     .insert(10)
//     .insert(12);
// console.log(binarySearchTree2.findSecondHighest())      //(15);


// binarySearchTree.insert(15);
// binarySearchTree.insert(20);
// binarySearchTree.insert(10);
// binarySearchTree.insert(12);
// binarySearchTree.insert(1);
// binarySearchTree.insert(5);
// binarySearchTree.insert(50);


// console.log(binarySearchTree.root.val);
// console.log(binarySearchTree.root.right.val);
// console.log(binarySearchTree.root.left.val);
// console.log(binarySearchTree.root.left.right.val);


// console.log(binarySearchTree.findRecursively(99));

// console.log(binarySearchTree.dfsInOrder());
// console.log(binarySearchTree.dfsPostOrder());
// console.log(binarySearchTree.dfsPreOrder());
// console.log(binarySearchTree.bfs());
// binarySearchTree.remove(20)
// binarySearchTree.remove(10)

// console.log(binarySearchTree.root.right.val)
// console.log(binarySearchTree.root.left.val)
module.exports = BinarySearchTree;
