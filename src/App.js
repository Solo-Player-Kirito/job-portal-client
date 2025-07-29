import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/header";
import Footer from "./components/footer";
import Login from "./pages/login";
import Register from "./pages/register";
import JobList from "./pages/allJobs";
import JobDetails from "./pages/jobDetails";
import AddJob from "./pages/addJob";

function App() {
  return (
    <Router>
      <Header />
      <main style={{ minHeight: "80vh", padding: "20px" }}>
        <Routes>
          <Route path="/" element={<JobList />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/jobs/:id" element={<JobDetails />} />
          <Route path="/add-job" element={<AddJob />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
