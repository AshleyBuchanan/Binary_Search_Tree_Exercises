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

    }

    /** findRecursively(val): search the tree for a node with value val.
     * return the node, if found; else undefined. Uses recursion. */

    findRecursively(val) {

    }

    /** dfsPreOrder(): Traverse the array using pre-order DFS.
     * Return an array of visited nodes. */

    dfsPreOrder() {

    }

    /** dfsInOrder(): Traverse the array using in-order DFS.
     * Return an array of visited nodes. */

    dfsInOrder() {

    }

    /** dfsPostOrder(): Traverse the array using post-order DFS.
     * Return an array of visited nodes. */

    dfsPostOrder() {

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

console.log(binarySearchTree.root.val);
console.log(binarySearchTree.root.right.val);
console.log(binarySearchTree.root.left.val);
console.log(binarySearchTree.root.left.right.val);

module.exports = BinarySearchTree;
