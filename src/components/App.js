
import '../styles/App.css';
import { useEffect, useState } from 'react';
import getAdalabers from '../services/api';


function App() {
const [data, setData] = useState([]);
const [newAdalaber, setNewAdalaber] = useState({
  //id: crypto.randomUUID(),
  name:'',
  counselor:'',
  speciality:'',
});
const [errorMsgClass, setErrorMsgClass] = useState ('hidden');



useEffect(()=>{
  getAdalabers().then(da=>{
    setData(da.results);
  });
}, []);

const tableData = data.map((adalaber)=>{
return <tr key={adalaber.id}>
<td>{adalaber.name}</td>
<td>{adalaber.counselor}</td>
<td>{adalaber.speciality}</td>
</tr>
});

const handleInputNewAdalaber = (ev)=>{
  setNewAdalaber ({...newAdalaber, [ev.target.name]: ev.target.value})
}
const handleBtnNewAdalaber = (ev)=>{
  ev.preventDefault();
  if (newAdalaber.name === '' || newAdalaber.counselor==='' || newAdalaber.speciality === ''){
    setErrorMsgClass('');
  }else{
    //setNewAdalaber ({...newAdalaber, id: crypto.randomUUID() });
    setData ([...data, newAdalaber]);
    setErrorMsgClass('hidden');
    console.log(data);
  }
  
}

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
      <h2>Añadir una Adalaber</h2>
      <form>
        <label htmlFor="name">Nombre</label>
        <input onChange={handleInputNewAdalaber} type="text" id='name' name='name' />
        <label htmlFor="counselor">Tutora</label>
        <input onChange={handleInputNewAdalaber} type="text" id='counselor' name='counselor' />
        <label htmlFor="speciality">Especialidad</label>
        <input onChange={handleInputNewAdalaber} type="text" id='speciality' name='speciality' /> 
        <p className={errorMsgClass}>Debes completar todos los campos para poder añadir una nueva Adalaber.</p>
        <button onClick={handleBtnNewAdalaber}>Añadir una nueva Adalaber</button>
      </form>
    </div>
  );
}

export default App;
