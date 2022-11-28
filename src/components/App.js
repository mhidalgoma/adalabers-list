
import '../styles/App.css';
import { useState } from 'react';
import adalabers from "../data/adalabers.json";


function App() {
const [data, setData] = useState (adalabers);

const tableData = data.results.map ((adalaber)=>{
return <tr key={adalaber.id}>
<td>{adalaber.name}</td>
<td>{adalaber.counselor}</td>
<td>{adalaber.speciality}</td>
</tr>
})

  return (
    <div>
      <header>
      <h1>Adalabers</h1>
      </header>
      
      <table className="table">
        <thead><tr>
          <th>Nombre</th>
          <th>Tutora</th>
          <th>Especialidad</th>
        </tr></thead>
        <tbody>
          {tableData}
        </tbody>
      </table>
      <form>
        <label htmlFor="firstName">Nombre</label>
        <input type="text" id='firstName' name='firstName' />
        <label htmlFor="counselor">Tutora</label>
        <input type="text" id='counselor' name='counselor' />
        <label htmlFor="speciality">Especialidad</label>
        <input type="text" id='speciality' name='speciality' /> 
        <button>Añadir una nueva Adalaber</button>
      </form>
    </div>
  );
}

export default App;
