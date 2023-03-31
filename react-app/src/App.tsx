import React, { useState, useEffect } from "react";

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('http://localhost:8000/sample/'); // <-- Change the port to 8000
      const jsonData = await response.json();
      setData(jsonData);
    }
    fetchData();
  }, []);

  console.log(data); // <-- Add this line

  return (
    <div>
      <h1>Sample Data</h1>
      <ul>
        {data.map(item => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;