import Cliente from "./cliente";
class ClientesManager {
  constructor() {
    this.lista = [];
  }

  agregar(cliente) {
    this.lista.push(cliente);
  }

  obtenerTodos() {
    return this.lista;
  }
}

export default ClientesManager;
