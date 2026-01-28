import { BrowserRouter, Routes, Route } from "react-router-dom";
import CreatePaste from "./pages/CreatePaste";
import PastePage from "./pastepage";

const App =() =>{
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CreatePaste />} />
        <Route path="/p/:slug" element={<PastePage />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App
