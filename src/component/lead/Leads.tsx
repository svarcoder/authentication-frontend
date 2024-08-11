import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import {
  createLeadApi,
  deleteLeadApi,
  getLeadsApi,
  updateLeadApi,
} from "../../api/apiService";
import { toast } from "react-toastify";

const Leads: React.FC = () => {
  const [leads, setLeads] = useState<any[]>([]);
  const [newLead, setNewLead] = useState({
    email: "",
    name: "",
    number: "",
    product: "",
  });
  const [editingLead, setEditingLead] = useState<any | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const { token } = useAuth();

  useEffect(() => {
    const fetchLeads = async () => {
      try {
        if (token) {
          const fetchedLeads = await getLeadsApi(token);
          setLeads(fetchedLeads?.data);
        }
      } catch (error) {
        console.error("Error fetching leads:", error);
      }
    };

    fetchLeads();
  }, [token]);

  const handleCreateLead = async () => {
    try {
      if (token) {
        const response = await createLeadApi(newLead);
        setLeads([...leads, response?.data]);
        setNewLead({ email: "", name: "", number: "", product: "" });
        toast("Lead Created Successfull!");
      }
    } catch (error) {
      console.error("Error creating lead:", error);
    }
  };

  const handleUpdateLead = async (id: string) => {
    try {
      if (token && editingLead) {
        const response = await updateLeadApi(id, editingLead, token);
        setLeads(
          leads.map((lead: any) => (lead._id === id ? response?.data : lead))
        );
        setEditingLead(null);
        toast("Lead Updated Successfull!");
      }
    } catch (error) {
      console.error("Error updating lead:", error);
    }
  };

  const handleDeleteLead = async (id: string) => {
    try {
      if (token) {
        await deleteLeadApi(id, token);
        setLeads(leads.filter((lead: any) => lead._id !== id));
        toast("Lead Deleted Successfull!");
      }
    } catch (error) {
      console.error("Error deleting lead:", error);
    }
  };



  const filteredItems =
    leads &&
    leads
      .filter((item: any) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .sort((a: any, b: any) =>
        sortOrder === "asc"
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name)
      );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSortChange = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  return (
    <div className="leads">
      <h2>Leads</h2>
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <button onClick={handleSortChange}>
        Sort {sortOrder === "asc" ? "Descending" : "Ascending"}
      </button>

      {filteredItems
        ? filteredItems.map((lead: any) => (
            <div key={lead._id}>
              <p>
                {lead.number} - {lead.name} - {lead.email} - {lead.product}
              </p>
              <button onClick={() => setEditingLead(lead)}>Edit</button>
              <button onClick={() => handleDeleteLead(lead._id)}>Delete</button>
            </div>
          ))
        : leads.map((lead: any) => (
            <div key={lead._id}>
              <p>
                {lead.number} - {lead.name} - {lead.email} - {lead.product}
              </p>
              <button onClick={() => setEditingLead(lead)}>Edit</button>
              <button onClick={() => handleDeleteLead(lead._id)}>Delete</button>
            </div>
          ))}
      <h3>Create New Lead</h3>
      <input
        type="text"
        value={newLead.name}
        onChange={(e) => setNewLead({ ...newLead, name: e.target.value })}
        placeholder="Name"
      />
      <input
        type="text"
        value={newLead.email}
        onChange={(e) => setNewLead({ ...newLead, email: e.target.value })}
        placeholder="Email"
      />
      <input
        type="text"
        value={newLead.number}
        onChange={(e) => setNewLead({ ...newLead, number: e.target.value })}
        placeholder="Number"
      />
      <input
        type="text"
        value={newLead.product}
        onChange={(e) => setNewLead({ ...newLead, product: e.target.value })}
        placeholder="Product"
      />
      <button onClick={handleCreateLead}>Create Lead</button>

      {editingLead && (
        <div>
          <h3>Edit Lead</h3>
          <input
            type="text"
            value={editingLead.name}
            onChange={(e) =>
              setEditingLead({ ...editingLead, name: e.target.value })
            }
            placeholder="Name"
          />
          <input
            type="text"
            value={editingLead.email}
            onChange={(e) =>
              setEditingLead({ ...editingLead, email: e.target.value })
            }
            placeholder="Email"
          />
          <input
            type="text"
            value={editingLead.number}
            onChange={(e) =>
              setEditingLead({ ...editingLead, number: e.target.value })
            }
            placeholder="Number"
          />
          <input
            type="text"
            value={editingLead.product}
            onChange={(e) =>
              setEditingLead({ ...editingLead, product: e.target.value })
            }
            placeholder="Product"
          />
          <button onClick={() => handleUpdateLead(editingLead._id)}>
            Update Lead
          </button>
          <button onClick={() => setEditingLead(null)}>Cancel</button>
        </div>
      )}
    </div>
  );
};

export default Leads;
