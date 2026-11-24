import React, { useState, useEffect } from "react";

const initialTodos = [
  {
    id: 1,
    title: "Mengerjakan Proyek Computer Vision",
    description: "Menyelesaikan proyek akhir computer vision tentang deteksi penggunaan helm",
    priority: "high",
    deadline: "2026-10-11",
    status: "in progress",
  },
  {
    id: 2,
    title: "Mempelajari Dasar Zustand",
    description: "Mempelajari state management Zustand untuk aplikasi React",
    priority: "low",
    deadline: "2026-11-29",
    status: "in progress",
  },
  {
    id: 3,
    title: "Membuat Website Portfolio",
    description: "Membuat website portfolio pribadi menggunakan React dan Tailwind CSS",
    priority: "low",
    deadline: "2026-10-20",
    status: "in progress",
  },
  {
    id: 4,
    title: "Mempelajari React Hooks",
    description: "Mempelajari useState, useEffect, useContext, dan custom hooks",
    priority: "low",
    deadline: "2026-10-11",
    status: "to-do",
  },
];

export default function App() {
  const [todos, setTodos] = useState(initialTodos);
  
  const [view, setView] = useState("list"); 
  const [selectedTodoId, setSelectedTodoId] = useState(null);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [deleteTodoId, setDeleteTodoId] = useState(null);

  const [toast, setToast] = useState({ message: "", type: "success" });

  useEffect(() => {
    if (toast.message) {
      const timer = setTimeout(() => setToast({ message: "", type: "success" }), 3000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const showNotification = (message, type = "success") => {
    setToast({ message, type });
  };

  const selectedTodo = todos.find((t) => t.id === selectedTodoId);
  const todoToDelete = todos.find((t) => t.id === deleteTodoId);

  const handleAddTodo = (newTodoData) => {
    const newTodo = {
      ...newTodoData,
      id: Date.now(),
    };
    setTodos([...todos, newTodo]);
    setShowAddModal(false);
    showNotification("✅ Tugas berhasil ditambahkan!", "success");
  };

  const handleUpdateTodo = (updatedData) => {
    setTodos(todos.map((t) => (t.id === updatedData.id ? updatedData : t)));
    setShowEditModal(false);
    showNotification("✏️ Tugas berhasil diperbarui!", "success");
  };

  const handleDeleteTodo = () => {
    setTodos(todos.filter((t) => t.id !== deleteTodoId));
    setDeleteTodoId(null);
    if (view === "detail" && selectedTodoId === deleteTodoId) {
      setView("list");
    }
    showNotification("🗑️ Tugas berhasil dihapus!", "danger");
  };

  const handleOpenDetail = (id) => {
    setSelectedTodoId(id);
    setView("detail");
  };

  return (
    <div className="app-container">
      {}
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; }
        body { background: linear-gradient(160deg, #eef6f4 0%, #e2edeb 100%); color: #1f2b2a; }
        .app-container { min-height: 100vh; padding: 40px 20px; display: flex; flex-direction: column; align-items: center; justify-content: flex-start; }

        /* Card Tabel Utama */
        .table-card { background: #fff; width: 100%; max-width: 950px; border-radius: 10px; box-shadow: 0 6px 24px rgba(15, 61, 57, 0.08); border: 1px solid #d5e5e2; overflow: hidden; }
        .table-header { display: flex; justify-content: space-between; align-items: center; padding: 20px 28px; border-bottom: 1px solid #d9e9e6; background: #f2faf8; }
        .table-header h1 { font-size: 24px; font-weight: 700; color: #0f3d39; }
        
        .btn-add { background-color: #0f766e; color: #fff; border: none; padding: 9px 18px; border-radius: 6px; font-weight: 600; font-size: 14px; cursor: pointer; transition: 0.2s; }
        .btn-add:hover { background-color: #115e59; }

        /* Tabel */
        table { width: 100%; border-collapse: collapse; text-align: left; }
        th { padding: 14px 24px; font-size: 13px; font-weight: 700; color: #3f5a56; background: #f2faf8; border-bottom: 2px solid #d5e5e2; }
        td { padding: 14px 24px; font-size: 14px; border-bottom: 1px solid #eef4f2; vertical-align: middle; }
        tr:hover { background-color: #f6fbfa; }
        
        /* Kolom Aksi */
        .action-btns { display: flex; gap: 8px; }
        .btn-icon { width: 34px; height: 34px; border: none; border-radius: 6px; cursor: pointer; display: flex; align-items: center; justify-content: center; font-size: 15px; color: #fff; transition: 0.2s; }
        .btn-eye { background-color: #0f766e; }
        .btn-eye:hover { background-color: #115e59; }
        .btn-trash { background-color: #e11d48; }
        .btn-trash:hover { background-color: #be123c; }

        /* Card Detail (Persis Seperti Gambar Soal Praktikum) */
        .detail-wrapper { width: 100%; display: flex; justify-content: center; align-items: center; padding-top: 50px; }
        .detail-card { background: #fff; width: 100%; max-width: 620px; border-radius: 12px; box-shadow: 0 8px 28px rgba(15, 61, 57, 0.1); border: 1px solid #d5e5e2; padding: 36px 40px; display: grid; grid-template-columns: 1.2fr 0.8fr; gap: 24px 32px; }
        .detail-item { margin-bottom: 18px; }
        .detail-title-label { font-size: 15px; font-weight: 700; color: #0f3d39; margin-bottom: 6px; }
        .detail-title-value { font-size: 13px; color: #4a6360; line-height: 1.5; }
        .detail-actions { display: flex; gap: 10px; align-items: flex-start; margin-top: 10px; }
        .btn-kembali { background-color: #64748b; color: white; border: none; padding: 7px 18px; border-radius: 6px; font-size: 13px; font-weight: 600; cursor: pointer; }
        .btn-kembali:hover { background-color: #475569; }
        .btn-update { background-color: #0f766e; color: white; border: none; padding: 7px 18px; border-radius: 6px; font-size: 13px; font-weight: 600; cursor: pointer; }
        .btn-update:hover { background-color: #115e59; }

        /* Modal Overlay */
        .modal-overlay { position: fixed; inset: 0; background: rgba(10, 43, 40, 0.55); display: flex; align-items: center; justify-content: center; z-index: 1000; padding: 16px; }
        .modal-box { background: #fff; width: 100%; max-width: 460px; border-radius: 10px; padding: 26px 28px; box-shadow: 0 10px 30px rgba(15, 61, 57, 0.22); }
        .modal-title { font-size: 18px; font-weight: 700; margin-bottom: 20px; text-align: center; color: #0f3d39; }
        
        /* Form */
        .form-group { margin-bottom: 15px; }
        .form-group label { display: block; font-size: 13px; font-weight: 600; color: #3c5754; margin-bottom: 6px; }
        .form-group input, .form-group textarea, .form-group select { width: 100%; padding: 8px 12px; font-size: 13px; border: 1px solid #c6dbd7; border-radius: 6px; outline: none; background: #fff; }
        .form-group input:focus, .form-group textarea:focus, .form-group select:focus { border-color: #0f766e; box-shadow: 0 0 0 2px #b8e6e0; }
        .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }

        /* Modal Tombol Batal & Aksi */
        .modal-btns { display: flex; justify-content: flex-end; gap: 10px; margin-top: 20px; }
        .btn-batal { background-color: #64748b; color: white; border: none; padding: 8px 18px; border-radius: 6px; font-size: 13px; font-weight: 600; cursor: pointer; }
        .btn-batal:hover { background-color: #475569; }
        .btn-simpan { background-color: #0f766e; color: white; border: none; padding: 8px 18px; border-radius: 6px; font-size: 13px; font-weight: 600; cursor: pointer; }
        .btn-simpan:hover { background-color: #115e59; }

        /* Toast Feedback */
        .toast { position: fixed; top: 20px; right: 20px; padding: 12px 20px; border-radius: 8px; font-size: 14px; font-weight: 600; z-index: 2000; box-shadow: 0 6px 18px rgba(15, 61, 57, 0.16); }
        .toast-success { background: #ccfbf1; color: #115e59; border-left: 4px solid #14b8a6; }
        .toast-danger { background: #ffe4e6; color: #be123c; border-left: 4px solid #e11d48; }
      `}</style>

      {}
      {toast.message && (
        <div className={`toast toast-${toast.type}`}>
          {toast.message}
        </div>
      )}

      {view === "list" && (
        <div className="table-card">
          <div className="table-header">
            <h1>Todo List</h1>
            <button className="btn-add" onClick={() => setShowAddModal(true)}>
              Tambah Todo
            </button>
          </div>

          <table>
            <thead>
              <tr>
                <th>Judul</th>
                <th>Status</th>
                <th>Prioritas</th>
                <th>Deadline</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {todos.length === 0 ? (
                <tr>
                  <td colSpan="5" style={{ textAlign: "center", color: "#7d9491", padding: "30px" }}>
                    Belum ada tugas. Klik tombol <b>Tambah Todo</b> di atas.
                  </td>
                </tr>
              ) : (
                todos.map((todo) => (
                  <tr key={todo.id}>
                    <td style={{ fontWeight: 500, color: "#123f3b" }}>{todo.title}</td>
                    <td>{todo.status}</td>
                    <td>{todo.priority}</td>
                    <td>{todo.deadline}</td>
                    <td>
                      <div className="action-btns">
                        {}
                        <button
                          className="btn-icon btn-eye"
                          onClick={() => handleOpenDetail(todo.id)}
                          title="Lihat Detail Tugas"
                        >
                          👁️
                        </button>
                        {}
                        <button
                          className="btn-icon btn-trash"
                          onClick={() => setDeleteTodoId(todo.id)}
                          title="Hapus Tugas"
                        >
                          🗑️
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      {view === "detail" && selectedTodo && (
        <div className="detail-wrapper">
          <div className="detail-card">
            {/* Kolom Kiri: Judul & Deskripsi */}
            <div>
              <div className="detail-item">
                <div className="detail-title-label">Judul</div>
                <div className="detail-title-value">{selectedTodo.title}</div>
              </div>
              <div className="detail-item">
                <div className="detail-title-label">Deskripsi</div>
                <div className="detail-title-value">{selectedTodo.description || "-"}</div>
              </div>
            </div>

            {}
            <div>
              <div className="detail-item">
                <div className="detail-title-label">Status</div>
                <div className="detail-title-value">{selectedTodo.status}</div>
              </div>
              <div className="detail-item">
                <div className="detail-title-label">Prioritas</div>
                <div className="detail-title-value">{selectedTodo.priority}</div>
              </div>
              <div className="detail-item">
                <div className="detail-title-label">Deadline</div>
                <div className="detail-title-value">{selectedTodo.deadline}</div>
              </div>

              {}
              <div className="detail-actions">
                <button className="btn-kembali" onClick={() => setView("list")}>
                  Kembali
                </button>
                <button className="btn-update" onClick={() => setShowEditModal(true)}>
                  Update
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showAddModal && (
        <TodoFormModal
          title="Tambah Todo"
          submitText="Tambah"
          initialData={{
            title: "",
            description: "",
            status: "to-do",
            priority: "low",
            deadline: "",
          }}
          onClose={() => setShowAddModal(false)}
          onSubmit={handleAddTodo}
        />
      )}

      {showEditModal && selectedTodo && (
        <TodoFormModal
          title="Update Todo"
          submitText="Update"
          initialData={selectedTodo}
          onClose={() => setShowEditModal(false)}
          onSubmit={handleUpdateTodo}
        />
      )}

      {deleteTodoId && (
        <div className="modal-overlay">
          <div className="modal-box" style={{ textAlign: "center" }}>
            <h2 className="modal-title" style={{ color: "#e11d48" }}>Konfirmasi Hapus</h2>
            <p style={{ margin: "16px 0", color: "#4a6360", fontSize: "14px" }}>
              Apakah Anda yakin ingin menghapus tugas <b>"{todoToDelete?.title}"</b>?
            </p>
            <div className="modal-btns" style={{ justifyContent: "center" }}>
              <button className="btn-batal" onClick={() => setDeleteTodoId(null)}>
                Batal
              </button>
              <button className="btn-simpan" style={{ background: "#e11d48" }} onClick={handleDeleteTodo}>
                Hapus
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function TodoFormModal({ title, submitText, initialData, onClose, onSubmit }) {
  const [form, setForm] = useState(initialData);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title.trim() || !form.deadline) {
      alert("Harap isi Judul dan Deadline!");
      return;
    }
    onSubmit(form);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <h2 className="modal-title">{title}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Judul</label>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Deskripsi</label>
            <textarea
              name="description"
              rows="3"
              value={form.description}
              onChange={handleChange}
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Status</label>
              <select name="status" value={form.status} onChange={handleChange}>
                <option value="to-do">to-do</option>
                <option value="in progress">in progress</option>
                <option value="done">done</option>
              </select>
            </div>

            <div className="form-group">
              <label>Prioritas</label>
              <select name="priority" value={form.priority} onChange={handleChange}>
                <option value="low">low</option>
                <option value="medium">medium</option>
                <option value="high">high</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label>Deadline</label>
            <input
              type="date"
              name="deadline"
              value={form.deadline}
              onChange={handleChange}
              required
            />
          </div>

          <div className="modal-btns">
            <button type="button" className="btn-batal" onClick={onClose}>
              Batal
            </button>
            <button type="submit" className="btn-simpan">
              {submitText}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}