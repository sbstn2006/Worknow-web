import React, { useEffect, useState } from 'react';
import axios from 'axios';

function CVList() {
  const [cvs, setCvs] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editForm, setEditForm] = useState({});

  const fetchCVs = async () => {
    try {
      const res = await axios.get('http://localhost:3001/api/hojas');
      setCvs(res.data);
    } catch (error) {
      console.error('Error al obtener hojas de vida:', error);
    }
  };

  useEffect(() => {
    fetchCVs();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('¿Seguro que deseas eliminar esta hoja de vida?')) {
      try {
        await axios.delete(`http://localhost:3001/api/hojas/${id}`);
        fetchCVs(); 
      } catch (error) {
        console.error('Error al eliminar:', error);
      }
    }
  };

  const handleEdit = (cv) => {
    setEditId(cv.id);
    setEditForm(cv);
  };

  const handleEditChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:3001/api/hojas/${editId}`, editForm);
      setEditId(null);
      fetchCVs();
    } catch (error) {
      console.error('Error al actualizar:', error);
    }
  };

  return (
    <div className="container">
      <h2>Listado de Hojas de Vida</h2>
      {cvs.map((cv) => (
        <div key={cv.id} className="cv-card">
          {editId === cv.id ? (
            <div>
              <input name="nombre_completo" value={editForm.nombre_completo} onChange={handleEditChange} />
              <input name="correo" value={editForm.correo} onChange={handleEditChange} />
              <input name="telefono" value={editForm.telefono} onChange={handleEditChange} />
              <button onClick={handleUpdate}>Guardar</button>
              <button onClick={() => setEditId(null)}>Cancelar</button>
            </div>
          ) : (
            <div>
              <p><strong>Nombre:</strong> {cv.nombre_completo}</p>
              <p><strong>Correo:</strong> {cv.correo}</p>
              <p><strong>Teléfono:</strong> {cv.telefono}</p>
              <button onClick={() => handleEdit(cv)}>Editar</button>
              <button onClick={() => handleDelete(cv.id)}>Eliminar</button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default CVList;
