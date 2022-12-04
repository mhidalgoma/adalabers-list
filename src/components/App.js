
import '../styles/App.css';
import { useEffect, useState } from 'react';
import getAdalabers from '../services/api';
import { v4 as uuid } from 'uuid';


function App() {
const [data, setData] = useState([]);
const [filteredData, setFilteredData] = useState([]);
const [inputNameFilter, setInputNameFilter] = useState('');

const [inputName, setInputName] = useState('');
const [inputTutor, setInputTutor] = useState('');
const [inputSpeciality, setInputSpeciality] = useState('');

const [newAdalaber, setNewAdalaber] = useState({
  id: uuid(),
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

const removeAccents = (str) => {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
} 

const renderAdalabers =()=>{
  let tableData;
if (inputNameFilter === ''){
  tableData = data.map((adalaber)=>{
    return <tr key={adalaber.id}>
    <td className='table__name'>{adalaber.name}</td>
    <td className='table__counselor'>{adalaber.counselor}</td>
    <td className='table__speciality'>{adalaber.speciality}</td>
    </tr>
    });
} else{
  tableData = filteredData.map((adalaber)=>{
    return <tr key={adalaber.id}>
    <td className='table__name'>{adalaber.name}</td>
    <td className='table__counselor'>{adalaber.counselor}</td>
    <td className='table__speciality'>{adalaber.speciality}</td>
    </tr>
    });
}
return tableData;
}

const handleInputNameFilter = (ev)=>{
setInputNameFilter(ev.target.value);
const filteredAdalabers = data.filter((adalaber)=>removeAccents(adalaber.name.toLowerCase()).includes(ev.target.value.toLowerCase()));
setFilteredData(filteredAdalabers);
}
const handleInputNewAdalaber = (ev)=>{
if (ev.target.name === 'name'){
  setInputName(ev.target.value);
  setNewAdalaber ({...newAdalaber, name: ev.target.value})
}else if (ev.target.name === 'counselor'){
  setInputTutor(ev.target.value);
  setNewAdalaber ({...newAdalaber, counselor: ev.target.value})
}else{
  setInputSpeciality(ev.target.value);
  setNewAdalaber ({...newAdalaber, speciality: ev.target.value})
}
}
const handleBtnNewAdalaber = (ev)=>{
  ev.preventDefault();
  if (newAdalaber.name === '' || newAdalaber.counselor==='' || newAdalaber.speciality === ''){
    setErrorMsgClass('');
  }else{
    setData ([...data, newAdalaber]);
    setNewAdalaber({ 
      id: uuid(),
      name:'',
      counselor:'',
      speciality:'',
    });
    setInputName('');
    setInputTutor('');
    setInputSpeciality('');
    setErrorMsgClass('hidden');
  }
  
}

  return (
    <div>
      <header className='header'>
      <h1 className='header__title'>Adalabers</h1>
      </header>
      <main className='main'>
        <form>
        <label htmlFor="name">Buscar por nombre</label>
        <input onChange={handleInputNameFilter} type="text" id='name' name='name' value={inputNameFilter}/>

        </form>
      <table className="table">
        <thead><tr>
          <th className='table__head'>Nombre</th>
          <th className='table__head'>Tutora</th>
          <th className='table__head'>Especialidad</th>
        </tr></thead>
        <tbody>
          {renderAdalabers()}
        </tbody>
      </table>
      <h2 className='title__add'>Añadir una Adalaber</h2>
      <form className='form'>
        <div className='inputs__new'>
        <label htmlFor="name">Nombre</label>
        <input onChange={handleInputNewAdalaber} type="text" id='name' name='name' value={inputName}/>
        <label htmlFor="counselor">Tutora</label>
        <input onChange={handleInputNewAdalaber} type="text" id='counselor' name='counselor' value={inputTutor}/>
        <label htmlFor="speciality">Especialidad</label>
        <input onChange={handleInputNewAdalaber} type="text" id='speciality' name='speciality' value={inputSpeciality}/> 
        <p className={errorMsgClass}>Debes completar todos los campos para poder añadir una nueva Adalaber.</p>
        </div>
        <button className='btn__add' onClick={handleBtnNewAdalaber}>Haz click para añadir una nueva Adalaber</button>
      </form>
      </main>
    </div>
  );
}

export default App;
