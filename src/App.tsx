import { BrowserRouter } from "react-router-dom";
import PageRoutes from "#lib/PageRoutes";

export default function App() {
  return (
    <BrowserRouter>
      <PageRoutes />
    </BrowserRouter>
  );
}
