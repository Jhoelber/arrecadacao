import "./App.css";
import { PaginaPrincipal } from "./components/PaginaPrincipal";
import { Analytics } from "@vercel/analytics/react";


function App() {
  return (
    <>
      <PaginaPrincipal />
      <Analytics />
      
    </>
  );
}

export default App;
