import { useState, useEffect } from "react";
import { FaTrash } from "react-icons/fa";
import "./App.css";

function App() {
  const [presupuesto, setPresupuesto] = useState("");
  const [nombre, setNombre] = useState("");
  const [cantidad, setCantidad] = useState("");
  const [precio, setPrecio] = useState("");
  const [lista, setLista] = useState([]);

  // 🔹 Cargar datos guardados al iniciar
  useEffect(() => {
    const dataGuardada = localStorage.getItem("listaCompras");
    const presupuestoGuardado = localStorage.getItem("presupuesto");
    if (dataGuardada) setLista(JSON.parse(dataGuardada));
    if (presupuestoGuardado) setPresupuesto(presupuestoGuardado);
  }, []);

  // 🔹 Guardar cada cambio en lista o presupuesto
  useEffect(() => {
    localStorage.setItem("listaCompras", JSON.stringify(lista));
    localStorage.setItem("presupuesto", presupuesto);
  }, [lista, presupuesto]);

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

    setLista((prevLista) => [...prevLista, nuevo]);
    setNombre("");
    setCantidad("");
    setPrecio("");
  };

  const eliminarItem = (id) => {
    setLista(lista.filter((item) => item.id !== id));
  };

  const limpiarLista = () => {
    if (confirm("¿Seguro que deseas limpiar toda la lista?")) {
      setLista([]);
      localStorage.removeItem("listaCompras");
    }
  };

  return (
    <div className="container">
      <h2>🛒 Registro de Compras</h2>

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

      <ul id="lista">
        {lista.map((item) => (
          <li
            key={item.id}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "6px 8px",
              borderBottom: "1px solid #333",
            }}
          >
            {/* Información principal */}
            <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
              <span style={{ fontWeight: "bold" }}>{item.nombre}</span>
              <span style={{ fontSize: "0.85rem", color: "#bbb" }}>
                Cantidad: {item.cantidad} - Precio: ${item.precio.toFixed(2)}
              </span>
            </div>

            {/* Subtotal + trash */}
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <span style={{ fontWeight: "bold", fontSize: "0.9rem" }}>
                ${item.subtotal.toFixed(2)}
              </span>
              <FaTrash
                style={{
                  color: "red",
                  cursor: "pointer",
                  fontSize: "1rem",
                }}
                onClick={() => eliminarItem(item.id)}
                title="Eliminar"
              />
            </div>
          </li>
        ))}
      </ul>

      <button className="danger" onClick={limpiarLista}>
        Limpiar lista
      </button>
    </div>
  );
}

export default App;
