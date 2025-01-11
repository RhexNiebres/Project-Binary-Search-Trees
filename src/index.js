class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}


class Tree {
  constructor(array) {
    this.root = this.buildTree([...new Set(array)].sort((a, b) => a - b));
  }

  // Build a balanced binary tree
  buildTree(array) {
    if (array.length === 0) return null;

    const mid = Math.floor(array.length / 2);
    const root = new Node(array[mid]);

    root.left = this.buildTree(array.slice(0, mid));
    root.right = this.buildTree(array.slice(mid + 1)); 

    return root;
  }

  // Utility function to display the tree in level order
  levelOrderTraversal(root = this.root) {
    if (!root) return [];

    const queue = [root];
    const result = [];

    while (queue.length > 0) {
      const node = queue.shift();
      result.push(node.data);

      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }

    return result;
  }

  insert(value) {
    this.root = this._insertNode(this.root, value);
  }

  // Helper function for insertion
  _insertNode(node, value) {
    if (node === null) {
      return new Node(value);
    }

    if (value < node.data) {
      node.left = this._insertNode(node.left, value);
    } else if (value > node.data) {
      node.right = this._insertNode(node.right, value);
    }

    return node;
  }

  deleteItem(value) {
    this.root = this._deleteNode(this.root, value); 
  }


  _deleteNode(node, value) {
    if (node === null) {
      return node;
    }

    if (value < node.data) {
      node.left = this._deleteNode(node.left, value); 
    } else if (value > node.data) {
      node.right = this._deleteNode(node.right, value); 
    } else {
      if (node.left === null && node.right === null) {
        return null; 
      } else if (node.left === null) {
        return node.right; 
      } else if (node.right === null) {
        return node.left;
      } else {
        let minNode = this._findMinNode(node.right);
        node.data = minNode.data; 
        node.right = this._deleteNode(node.right, minNode.data); 
      }
    }

    return node; 
  }

  find(value) {
    return this._findNode(this.root, value);
  }
  
  _findNode(node, value) {
    if (node === null) {
      return null;
    }

    if (value < node.data) {
      return this._findNode(node.left, value);
    } 
    else if (value > node.data) {
      return this._findNode(node.right, value);
    } 
    else {
      return node;
    }
  }

  levelOrder(callback) {
    if (typeof callback !== 'function') {
      throw new Error("Callback function is required.");//throw error
    }
  
    if (this.root === null) {
      return; 
    }
  
    let queue = [this.root]; //list of nodes
    
    while (queue.length > 0) {
      let currentNode = queue.shift(); //gets first noode in queue
  
      callback(currentNode);
  
      // if node has child nodes add it to the queue
      if (currentNode.left) {
        queue.push(currentNode.left);
      }
      if (currentNode.right) {
        queue.push(currentNode.right);
      }
    }
  }
  
  inOrder(callback) {
    if (typeof callback !== 'function') {
      throw new Error("Callback function is required.");
    }
  
    const traverse = (node) => {
      if (node === null) return;

      traverse(node.left);

      callback(node);
  
      traverse(node.right);
    };
    traverse(this.root);
  }
  
  preOrder(callback) {
    if (typeof callback !== 'function') {
      throw new Error("Callback function is required.");
    }
  

    const traverse = (node) => {
      if (node === null) return;
  
      callback(node);
  
      traverse(node.left);
                     
      traverse(node.right);
    };
    traverse(this.root);
  }
  
  postOrder(callback) {
    if (typeof callback !== 'function') {
      throw new Error("Callback function is required.");
    }

    const traverse = (node) => {
      if (node === null) return;

      traverse(node.left);

      traverse(node.right);

      callback(node);
    };
    traverse(this.root);
  }
  
  height(node) {
    if (node === null) {
      return -1; 
    }
  
    const leftHeight = this.height(node.left);
    const rightHeight = this.height(node.right);
  
    return Math.max(leftHeight, rightHeight) + 1;
  }

  depth(node) {
    if (node === null || this.root === null) {
      return -1; 
    }
  
    let current = this.root;
    let depth = 0;

    while (current !== null) {
      if (node.data === current.data) {
        return depth; 
      } else if (node.data < current.data) {
        current = current.left;
      } else {
        current = current.right; 
      }
      depth++;
    }
    return -1;
  }
  
  isBalanced() {//checks if the tree is ba;lance
    const checkBalance = (node) => {
      if (node === null) {
        return 0; 
      }
  

      const leftHeight = checkBalance(node.left);
      const rightHeight = checkBalance(node.right);
  
      if (//checks if the left or right have defference in height
        leftHeight === -1 ||
        rightHeight === -1 ||
        Math.abs(leftHeight - rightHeight) > 1
      ) {
        return -1; // Mark the tree as unbalanced
      }
  
      // return if the height of node balance
      return Math.max(leftHeight, rightHeight) + 1;
    };
  
    //start at root
    return checkBalance(this.root) !== -1;
  }
  
  rebalance() {
    const inOrderTraversal = (node, result = []) => {//helper function to get sorted array
      if (node === null) return result;

      inOrderTraversal(node.left, result);

      result.push(node.data);

      inOrderTraversal(node.right, result);
  
      return result;
    };
  
    const sortedValues = inOrderTraversal(this.root);
  
    this.root = this.buildTree(sortedValues);//build tree
  }
  
}

const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};                                                                                                                                    
