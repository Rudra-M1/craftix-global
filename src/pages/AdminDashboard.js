import { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  serverTimestamp,
  orderBy,
  query,
  getDoc
} from "firebase/firestore";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";

function AdminDashboard() {
  const [projects, setProjects] = useState([]);
  const [messages, setMessages] = useState([]);
  const [form, setForm] = useState({
    id: null,
    title: "",
    description: "",
    image: "",
    tech_stack: "",
    live_link: ""
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // 🔐 ADMIN CHECK ON LOAD
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        navigate("/admin-login");
        return;
      }

      // Check admins collection
      const adminRef = doc(db, "admins", user.email);
      const adminSnap = await getDoc(adminRef);

      if (!adminSnap.exists() || adminSnap.data().role !== "admin") {
        await signOut(auth);
        navigate("/login");
        return;
      }

      loadProjects();
      loadMessages();
    });

    return () => unsub();
  }, [navigate]);

  // LOAD PROJECTS
  const loadProjects = async () => {
    try {
      const q = query(
        collection(db, "projects"),
        orderBy("created_at", "desc")
      );
      const snapshot = await getDocs(q);
      const list = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setProjects(list);
    } catch (err) {
      console.error(err);
      setError("Failed to load projects");
    }
  };

  // LOAD MESSAGES
  const loadMessages = async () => {
    try {
      const q = query(
        collection(db, "messages"),
        orderBy("created_at", "desc")
      );
      const snapshot = await getDocs(q);
      const list = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setMessages(list);
    } catch (err) {
      console.error(err);
      setError("Failed to load messages");
    }
  };

  // SAVE PROJECT
  const saveProject = async () => {
    setError("");

    if (!form.title || !form.description) {
      return setError("Title and Description are required");
    }

    try {
      if (form.id) {
        await updateDoc(doc(db, "projects", form.id), {
          title: form.title,
          description: form.description,
          image: form.image,
          tech_stack: form.tech_stack,
          live_link: form.live_link
        });
      } else {
        await addDoc(collection(db, "projects"), {
          title: form.title,
          description: form.description,
          image: form.image,
          tech_stack: form.tech_stack,
          live_link: form.live_link,
          created_at: serverTimestamp()
        });
      }

      resetForm();
      loadProjects();
    } catch (err) {
      console.error(err);
      setError("Save failed");
    }
  };

  const editProject = (p) => {
    setForm({
      id: p.id,
      title: p.title,
      description: p.description,
      image: p.image,
      tech_stack: p.tech_stack,
      live_link: p.live_link
    });
  };

  const deleteProject = async (id) => {
    if (!window.confirm("Delete project?")) return;

    try {
      await deleteDoc(doc(db, "projects", id));
      loadProjects();
    } catch (err) {
      console.error(err);
      setError("Delete failed");
    }
  };

  const deleteMessage = async (id) => {
    if (!window.confirm("Delete this message?")) return;

    try {
      await deleteDoc(doc(db, "messages", id));
      loadMessages();
    } catch (err) {
      console.error(err);
      setError("Message delete failed");
    }
  };

  const resetForm = () => {
    setForm({
      id: null,
      title: "",
      description: "",
      image: "",
      tech_stack: "",
      live_link: ""
    });
  };

  const logout = async () => {
    await signOut(auth);
    navigate("/admin-login");
  };

  return (
    <div className="admin-dashboard">
      <div className="admin-card">

        {/* TOP BAR */}
        <div className="admin-topbar">
          <h2>Admin Dashboard</h2>
          <button className="admin-logout" onClick={logout}>Logout</button>
        </div>

        {error && <p style={{ color: "red" }}>{error}</p>}

        {/* FORM */}
        <input
          placeholder="Title"
          value={form.title}
          onChange={e => setForm({ ...form, title: e.target.value })}
        />

        <textarea
          placeholder="Description"
          value={form.description}
          onChange={e => setForm({ ...form, description: e.target.value })}
        />

        <input
          placeholder="Image URL"
          value={form.image}
          onChange={e => setForm({ ...form, image: e.target.value })}
        />

        <input
          placeholder="Tech Stack"
          value={form.tech_stack}
          onChange={e => setForm({ ...form, tech_stack: e.target.value })}
        />

        <input
          placeholder="Live Link"
          value={form.live_link}
          onChange={e => setForm({ ...form, live_link: e.target.value })}
        />

        <button onClick={saveProject}>
          {form.id ? "Update Project" : "Add Project"}
        </button>

        <hr />

        {/* PROJECTS */}
        <h3>Projects</h3>
        <table className="admin-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Tech</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects.map(p => (
              <tr key={p.id}>
                <td>{p.title}</td>
                <td>{p.tech_stack}</td>
                <td>
                  <button className="edit-btn" onClick={() => editProject(p)}>
                    Edit
                  </button>
                  <button className="delete-btn" onClick={() => deleteProject(p.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <hr />

        {/* MESSAGES */}
        <h3>User Messages</h3>
        <table className="admin-table">
          <thead>
            <tr>
              <th>Email</th>
              <th>Message</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {messages.map(m => (
              <tr key={m.id}>
                <td>{m.email}</td>
                <td>{m.message}</td>
                <td>
                  {m.created_at?.seconds
                    ? new Date(m.created_at.seconds * 1000).toLocaleString()
                    : ""}
                </td>
                <td>
                  <button
                    className="delete-btn"
                    onClick={() => deleteMessage(m.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>
    </div>
  );
}

export default AdminDashboard;
