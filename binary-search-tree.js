class Node {
    constructor(val, left = null, right = null) {
        this.val = val;
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
            this.root = new Node(val);
            return this;
        }
        while (currentNode) {
            if (val === currentNode.val) return this;

            if (val < currentNode.val) {
                if (currentNode.left === null) {
                    currentNode.left = new Node(val);
                }
                currentNode = currentNode.left;
            } else {
                if (currentNode.right === null) {
                    currentNode.right = new Node(val);
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
                    n.left = new Node(val);
                } else {
                    helper(n.left)
                }

            } else if (val > n.val) {

                if (n.right === null) {
                    n.right = new Node(val);
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
            console.log(`val:${val} <-> currentNode.val:${currentNode.val}`)
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

    }

    /** Further Study!
     * remove(val): Removes a node in the BST with the value val.
     * Returns the removed node. */

    remove(val) {

    }

    /** Further Study!
     * isBalanced(): Returns true if the BST is balanced, false otherwise. */

    isBalanced() {

    }

    /** Further Study!
     * findSecondHighest(): Find the second highest value in the BST, if it exists.
     * Otherwise return undefined. */

    findSecondHighest() {

    }
}

const binarySearchTree = new BinarySearchTree();
binarySearchTree.insertRecursively(15);
binarySearchTree.insertRecursively(20);
binarySearchTree.insertRecursively(10);
binarySearchTree.insertRecursively(12);
binarySearchTree.insertRecursively(1);
binarySearchTree.insertRecursively(5);
binarySearchTree.insertRecursively(50);


console.log(binarySearchTree.root.val);
console.log(binarySearchTree.root.right.val);
console.log(binarySearchTree.root.left.val);
console.log(binarySearchTree.root.left.right.val);


console.log(binarySearchTree.findRecursively(99));

console.log(binarySearchTree.dfsInOrder());
console.log(binarySearchTree.dfsPostOrder());
console.log(binarySearchTree.dfsPreOrder());


module.exports = BinarySearchTree;
