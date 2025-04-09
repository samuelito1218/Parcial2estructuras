import { createSlice } from '@reduxjs/toolkit';




class Node {
    constructor(value) {
      this.value = value;
      this.next = null;
    }
  }
  
  class LinkedList {
    constructor() {
      this.head = null;
      this.tail = null;
    }
  
    enqueue(cliente) {
      const node = new Node(cliente);
      if (!this.head) {
        this.head = this.tail = node;
      } else {
        this.tail.next = node;
        this.tail = node;
      }
    }
  
    dequeue() {
      if (!this.head) return null;
      const value = this.head.value;
      this.head = this.head.next;
      if (!this.head) this.tail = null;
      return value;
    }
  
    toArray() {
      const array = [];
      let current = this.head;
      while (current) {
        array.push(current.value);
        current = current.next;
      }
      return array;
    }
  
    findByName(nombre) {
      let current = this.head;
      while (current) {
        if (current.value.nombre.toLowerCase().includes(nombre.toLowerCase())) {
          return current.value;
        }
        current = current.next;
      }
      return null;
    }
  }
  
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
  
  const linkedList = new LinkedList();
  
  const initialState = {
    clientes: linkedList,
    clienteActual: null,
    resultadosBusqueda: [],
  };
  
  export const centroAtencionSlice =createSlice({
    name: 'centroAtencion',
    initialState,
    reducers: {
      agregarCliente: (state, action) => {
        const nuevoCliente = {
          id: Date.now(),
          nombre: action.payload,
          consultas: new Queue(),
          reclamos: new Stack(),
        };
        state.clientes.enqueue(nuevoCliente);
      },
      atenderSiguiente: (state) => {
        state.clienteActual = state.clientes.dequeue();
      },
      agregarConsulta: (state, action) => {
        if (state.clienteActual) {
          state.clienteActual.consultas.enqueue(action.payload);
        }
      },
      agregarReclamo: (state, action) => {
        if (state.clienteActual) {
          state.clienteActual.reclamos.push(action.payload);
        }
      },
      terminarAtencion: (state) => {
        state.clienteActual = null;
      },
      buscarClientePorNombre: (state, action) => {
        const cliente = state.clientes.findByName(action.payload);
        state.resultadosBusqueda = cliente ? [cliente] : [];
      },
    },
  });
  
  export const {
    agregarCliente,
    atenderSiguiente,
    agregarConsulta,
    agregarReclamo,
    terminarAtencion,
    buscarClientePorNombre,
  } = centroAtencionSlice.actions;
  
  export default centroAtencionSlice.reducer;
  
  