
import '../styles/App.css';
import { useEffect, useState } from 'react';
import getAdalabers from '../services/api';
import { v4 as uuid } from 'uuid';


function App() {
const [data, setData] = useState([]);
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

const tableData = data.map((adalaber)=>{
return <tr key={adalaber.id}>
<td className='table__name'>{adalaber.name}</td>
<td className='table__counselor'>{adalaber.counselor}</td>
<td className='table__speciality'>{adalaber.speciality}</td>
</tr>
});

const handleInputNewAdalaber = (ev)=>{
if (ev.target.name === 'name'){
  setInputName(ev.target.value);
  setNewAdalaber ({...newAdalaber, name:inputName})
}else if (ev.target.name === 'counselor'){
  setInputTutor(ev.target.value);
  setNewAdalaber ({...newAdalaber, counselor: inputTutor})
}else{
  setInputSpeciality(ev.target.value);
  setNewAdalaber ({...newAdalaber, speciality: inputSpeciality})
}
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
