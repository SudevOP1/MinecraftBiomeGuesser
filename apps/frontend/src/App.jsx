import { Route, Router, Routes } from "react-router-dom";
import Test from "./pages/Test";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/leaderboards" element={<h1>yo</h1>} />
        <Route path="/quiz" element={<Test />} />
        <Route path="/result" element={<h1>yo</h1>} />
      </Routes>
    </Router>
  )
}

export default App
