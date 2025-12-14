import React, { useEffect, useState } from "react";
import instagramAPI from "../api/instagramAPI";
import UserCard from "../components/UserCard";

export default function SearchUsers() {
  const [users, setUsers] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await instagramAPI.get("/users");
      setUsers(res.data);
    };
    fetchUsers();
  }, []);

  const filtered = users.filter((u) =>
    u.username.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div style={{ maxWidth: "500px", margin: "auto" }}>
      <input
        placeholder="Search users"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{
          width: "100%",
          padding: "10px",
          margin: "15px 0",
        }}
      />

      {filtered.map((u) => (
        <UserCard key={u._id} user={u} />
      ))}
    </div>
  );
}

