
import '../styles/App.css';
import { useEffect, useState } from 'react';
import getAdalabers from '../services/api';


function App() {
const [data, setData] = useState([]);
const [clearInput, setClearInput] = useState();
const [newAdalaber, setNewAdalaber] = useState({
  id: crypto.randomUUID(),
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
<td className='table__name'>{adalaber.name}</td>
<td className='table__counselor'>{adalaber.counselor}</td>
<td className='table__speciality'>{adalaber.speciality}</td>
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
    setData ([...data, newAdalaber]);
    setNewAdalaber({ 
      id: crypto.randomUUID(),
      name:'',
      counselor:'',
      speciality:'',
    });
    setClearInput('');
    setErrorMsgClass('hidden');
  }
  
}

  return (
    <div>
      <header className='header'>
      <h1 className='header__title'>Adalabers</h1>
      </header>
      <main className='main'>
      <table className="table">
        <thead><tr>
          <th className='table__head'>Nombre</th>
          <th className='table__head'>Tutora</th>
          <th className='table__head'>Especialidad</th>
        </tr></thead>
        <tbody>
          {tableData}
        </tbody>
      </table>
      <h2 className='title__add'>Añadir una Adalaber</h2>
      <form className='form'>
        <div className='inputs__new'>
        <label htmlFor="name">Nombre</label>
        <input onChange={handleInputNewAdalaber} type="text" id='name' name='name' value={clearInput}/>
        <label htmlFor="counselor">Tutora</label>
        <input onChange={handleInputNewAdalaber} type="text" id='counselor' name='counselor' value={clearInput}/>
        <label htmlFor="speciality">Especialidad</label>
        <input onChange={handleInputNewAdalaber} type="text" id='speciality' name='speciality' value={clearInput}/> 
        <p className={errorMsgClass}>Debes completar todos los campos para poder añadir una nueva Adalaber.</p>
        </div>
        <button className='btn__add' onClick={handleBtnNewAdalaber}>Haz click para añadir una nueva Adalaber</button>
      </form>
      </main>
    </div>
  );
}

export default App;
