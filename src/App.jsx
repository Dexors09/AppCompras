import { useState } from "react";
import { useSwipeable } from "react-swipeable";
import { FaTrash } from "react-icons/fa";
import "./App.css";

function App() {
  const [presupuesto, setPresupuesto] = useState("");
  const [nombre, setNombre] = useState("");
  const [cantidad, setCantidad] = useState("");
  const [precio, setPrecio] = useState("");
  const [lista, setLista] = useState([]);

  const total = lista.reduce((acc, item) => acc + item.subtotal, 0);

  const colorTotal = () => {
    const diff = (parseFloat(presupuesto) || 0) - total;
    if (diff <= 0 && total > 0) return "red";
    else if (diff <= (parseFloat(presupuesto) || 0) * 0.4 && total > 0)
      return "orange";
    return "white";
  };

  const calcularSubtotal = () => {
    const cant = parseInt(cantidad) || 0;
    const prec = parseFloat(precio) || 0;
    return cant * prec;
  };

  const agregarItem = () => {
    if (!nombre || !cantidad || !precio) return;
    const nuevo = {
      nombre,
      cantidad: parseInt(cantidad),
      precio: parseFloat(precio),
      subtotal: calcularSubtotal(),
      id: Date.now(),
    };
    setLista([...lista, nuevo]);
    setNombre("");
    setCantidad("");
    setPrecio("");
  };

  const eliminarItem = (id) => {
    setLista(lista.filter((item) => item.id !== id));
  };

  const limpiarLista = () => setLista([]);

  return (
    <div className="container">
      <h1>🛒 Registro de Compras</h1>

      {/* Presupuesto y total */}
      <div className="presupuesto">
        <input
          type="number"
          placeholder="Presupuesto"
          value={presupuesto}
          onChange={(e) => setPresupuesto(e.target.value)}
        />
        <span className="separator">|</span>
        <span id="total" style={{ color: colorTotal() }}>
          Total: ${total.toFixed(2)}
        </span>
      </div>

      {/* Nuevo artículo */}
      <div className="nuevo">
        <input
          type="text"
          placeholder="Artículo"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
        <input
          type="number"
          placeholder="Cantidad"
          value={cantidad}
          onChange={(e) => setCantidad(e.target.value)}
        />
        <input
          type="number"
          placeholder="Precio"
          step="0.01"
          value={precio}
          onChange={(e) => setPrecio(e.target.value)}
        />
        <p id="subtotal">Subtotal: ${calcularSubtotal().toFixed(2)}</p>
        <button onClick={agregarItem}>Agregar a la lista</button>
      </div>

      {/* Lista de artículos con swipe */}
      <ul id="lista">
        {lista.map((item) => {
          const handlers = useSwipeable({
            onSwipedLeft: () => eliminarItem(item.id),
            delta: 50, // distancia mínima del swipe
          });

          return (
            <li key={item.id} {...handlers}>
              <span>
                {item.nombre} - Cantidad: {item.cantidad} - Precio: $
                {item.precio.toFixed(2)}
              </span>
              <button
                onClick={() => eliminarItem(item.id)}
                aria-label="Eliminar"
              >
                <FaTrash style={{ color: "red" }} />
              </button>
            </li>
          );
        })}
      </ul>

      <button className="danger" onClick={limpiarLista}>
        Limpiar lista
      </button>
    </div>
  );
}

export default App;
