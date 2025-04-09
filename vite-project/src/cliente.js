
class Stack {
    constructor() {
      this.items = [];
    }
    push(item) {
      this.items.push(item);
    }
    pop() {
      return this.items.pop();
    }
    toArray() {
      return [...this.items];
    }
  }
  
  class Queue {
    constructor() {
      this.items = [];
    }
    enqueue(item) {
      this.items.push(item);
    }
    dequeue() {
      return this.items.shift();
    }
    toArray() {
      return [...this.items];
    }
  }
  
  class Cliente {
    constructor(nombre, tipo) {
      this.nombre = nombre;
      this.tipo = tipo;
      this.consultas = new Queue();
      this.reclamos = new Stack();
    }
  }
  
  export default Cliente;
  