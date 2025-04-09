import React, { useState } from "react";
import Cliente from "../cliente";
import ClientesManager from "../clientesManager";

const clientes = new ClientesManager();

const CentroAtencionForm = () => {
  const [nombre, setNombre] = useState("");
  const [tipo, setTipo] = useState("consulta");
  const [mensaje, setMensaje] = useState("");
  const [clientesLista, setClientesLista] = useState(clientes.obtenerTodos());
  const [clienteSeleccionado, setClienteSeleccionado] = useState(null);
  const [busqueda, setBusqueda] = useState("");

  const agregarCliente = () => {
    if (!nombre.trim()) return;
    const nuevoCliente = new Cliente(nombre, tipo);
    clientes.agregar(nuevoCliente);
    setClientesLista(clientes.obtenerTodos());
    setNombre("");
  };

  const seleccionarCliente = (nombre) => {
    const cli = clientes.obtenerTodos().find((c) => c.nombre === nombre);
    setClienteSeleccionado(cli);
  };

  const agregarMensaje = () => {
    if (!mensaje.trim() || !clienteSeleccionado) return;
  
    if (clienteSeleccionado.tipo === "consulta") {
      clienteSeleccionado.consultas.enqueue(mensaje);
    } else {
      clienteSeleccionado.reclamos.push(mensaje);
    }
  
    setMensaje("");
  
    setClienteSeleccionado({ ...clienteSeleccionado });
    setClientesLista(clientes.obtenerTodos());
  };
  

  const clientesFiltrados = clientesLista.filter((c) =>
    c.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <>
    <font color="#33cdff"><h1>Centro de Atención Samuelito</h1></font>
      <div className="bloque">
        <h2>Agregar Cliente</h2>
        <input
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          placeholder="Nombre"
        />
        <select value={tipo} onChange={(e) => setTipo(e.target.value)}>
          <option value="consulta">Consulta</option>
          <option value="reclamo">Reclamo</option>
        </select>
        <button onClick={agregarCliente}>Agregar Cliente</button>
      </div>

      <div className="bloque">
        <h2>Clientes en espera</h2>
        <input
          type="text"
          placeholder="Buscar Cliente por Nombre"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />
        <ul>
          {clientesFiltrados.map((c) => (
            <li key={c.nombre}>
              <button onClick={() => seleccionarCliente(c.nombre)}>
                {c.nombre} ({c.tipo})
              </button>
            </li>
          ))}
        </ul>
      </div>

      {clienteSeleccionado && (
        <div className="bloque">
          <h2>Atendiendo a: {clienteSeleccionado.nombre}</h2>
          <p>Tipo: {clienteSeleccionado.tipo}</p>
          <textarea
            value={mensaje}
            onChange={(e) => setMensaje(e.target.value)}
            placeholder={`Redactar ${clienteSeleccionado.tipo}`}
          />
          <button onClick={agregarMensaje}>Guardar</button>

          <h4>Historial</h4>
          <ul>
            {(clienteSeleccionado.tipo === "consulta"
              ? clienteSeleccionado.consultas.toArray()
              : clienteSeleccionado.reclamos.toArray()
            ).map((m, i) => (
              <li key={i}>{m}</li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default CentroAtencionForm;
console.log("Clientes cargados:", clientesLista);
console.log("Cliente seleccionado:", clienteSeleccionado);
console.log("Mensaje agregado:", mensaje);
console.log("Clientes filtrados:", clientesFiltrados);