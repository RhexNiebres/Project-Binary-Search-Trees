class Node {
    constructor(data, left = null, right = null) {
      this.data = data;
      this.left = left;
      this.right = right;
    }
  }
  
  // Tree Class
  class Tree {
    constructor(array) {
      this.root = this.buildTree([...new Set(array)].sort((a, b) => a - b));
    }

    // Build a balanced binary tree
    buildTree(array) {
        if (array.length === 0) return null;
    
        const mid = Math.floor(array.length / 2);
        const root = new Node(array[mid]);
    
        root.left = this.buildTree(array.slice(0, mid)); // Left subtree
        root.right = this.buildTree(array.slice(mid + 1)); // Right subtree
    
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
  
}


  