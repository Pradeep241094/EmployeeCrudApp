import './App.css';
import Wrapper from './components/Wrapper';
import EmployeesList from './components/Employees';
import CreateEmployee from './components/CreateEmployee';
import EditEmployee from './components/EditEmployee';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="App">
    <Wrapper>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={< EmployeesList/>} />
        <Route path="/add" element={<CreateEmployee />} />
        <Route path="/edit/:id" element={<EditEmployee />} />
      </Routes>
    </BrowserRouter>
    </Wrapper>
    </div>
  );
}

export default App;

