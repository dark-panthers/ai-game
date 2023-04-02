
import './App.css';
import Home from './pages/Home/Home';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NoPage from './pages/NoPage';

function App() {
  return (
    <div className="App">
       <BrowserRouter>
       
      <Routes>
          <Route index element={<Home />} />
          <Route path="*" element={<NoPage />} />
      </Routes>
    </BrowserRouter>
    </div>
  );
}


export default App;
