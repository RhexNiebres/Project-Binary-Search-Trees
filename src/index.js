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
  
}
  