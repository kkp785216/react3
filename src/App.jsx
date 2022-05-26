import { useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';
import PageNotFound from './components/PageNotFound';
import NoteState from './Context/notes/NoteState';
import Alert from './components/Partials/Alert';
import Login from './components/Login';
import Signup from './components/Signup';

function App() {
  const changeTitle = (input) => {
    document.title = "iNoteBook - " + input
  }
  
  // // Alert If need to display
  const [alert, setAlert] = useState(null);
  const showAlert = (message, type) => {
    setAlert({
      message: message,
      type: type
    });
    setTimeout(() => {
      setAlert(null)
    }, 3000);
  }
  return (
    <NoteState showAlert={showAlert}>
      <Router>
        <div className='App'>
          <Navbar />
          <Alert alert={alert} />
          <div className="container" style={{ marginTop: '3.5rem' }}>
            <div className="row py-4">
              <div className="col">
                <div className="card">
                  <div className="card-body">
                    <Routes>
                      <Route exact path="/" element={<Home changeTitle={changeTitle} showAlert={showAlert} title={"Home"} />} />
                      <Route exact path="/about" element={<About changeTitle={changeTitle} title={"About"} />} />
                      <Route exact path="/contact" element={<Contact changeTitle={changeTitle} title={"Contact Us"} />} />
                      <Route exact path="/login" element={<Login changeTitle={changeTitle} showAlert={showAlert} title={"Login"} />} />
                      <Route exact path="/signup" element={<Signup changeTitle={changeTitle} showAlert={showAlert} title={"Sign Up"} />} />
                      <Route exact path="/*" element={<PageNotFound changeTitle={changeTitle} title={"Page Not Found"} />} />
                    </Routes>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Router>
    </NoteState>
  );
}

export default App;
