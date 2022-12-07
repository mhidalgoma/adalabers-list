import '../styles/App.css';
import { useEffect, useState } from 'react';
import getAdalabers from '../services/api';
import { v4 as uuid } from 'uuid';

function App() {
  //VARIABLES DE ESTADO
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [inputNameFilter, setInputNameFilter] = useState('');
  const [selectCounselor, setSelectCounselor] = useState('');
  const [inputName, setInputName] = useState('');
  const [inputTutor, setInputTutor] = useState('');
  const [inputSpeciality, setInputSpeciality] = useState('');
  const [newAdalaber, setNewAdalaber] = useState({
    id: uuid(),
    name: '',
    counselor: '',
    speciality: '',
    social_networks: [],
  });
  const [errorMsgClass, setErrorMsgClass] = useState('hidden');

  //USE EFFECT
  useEffect(() => {
    getAdalabers().then((da) => {
      setData(da.results);
    });
  }, []);
  //FUNCIONES DE UTILIDADES

  // FUNCIONES HANDLER
  const handleInputNameFilter = (ev) => {
    setInputNameFilter(ev.target.value);
    const removeAccents = (str) => {
      return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    };
    if (selectCounselor === '') {
      const filteredAdalabers = data.filter((adalaber) =>
        removeAccents(adalaber.name.toLowerCase()).includes(
          ev.target.value.toLowerCase()
        )
      );
      setFilteredData(filteredAdalabers);
    } else {
      const filteredAdalabers = data.filter(
        (adalaber) =>
          removeAccents(adalaber.name.toLowerCase()).includes(
            ev.target.value.toLowerCase()
          ) && adalaber.counselor.toLowerCase() === selectCounselor
      );
      setFilteredData(filteredAdalabers);
    }
  };

  const handleSelectCounselor = (ev) => {
    setSelectCounselor(ev.target.value);
    const removeAccents = (str) => {
      return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    };
    if (inputNameFilter === '') {
      const filteredAdalabers = data.filter(
        (adalaber) => adalaber.counselor.toLowerCase() === ev.target.value
      );
      setFilteredData(filteredAdalabers);
    } else {
      const filteredAdalabers = data.filter(
        (adalaber) =>
          removeAccents(adalaber.name.toLowerCase()).includes(
            inputNameFilter.toLowerCase()
          ) && adalaber.counselor.toLowerCase() === ev.target.value
      );
      setFilteredData(filteredAdalabers);
    }
  };

  const handleInputNewAdalaber = (ev) => {
    if (ev.target.name === 'name') {
      setInputName(ev.target.value);
      setNewAdalaber({ ...newAdalaber, name: ev.target.value });
    } else if (ev.target.name === 'counselor') {
      setInputTutor(ev.target.value);
      setNewAdalaber({ ...newAdalaber, counselor: ev.target.value });
    } else {
      setInputSpeciality(ev.target.value);
      setNewAdalaber({ ...newAdalaber, speciality: ev.target.value });
    }
  };
  const handleBtnNewAdalaber = (ev) => {
    ev.preventDefault();
    if (
      newAdalaber.name === '' ||
      newAdalaber.counselor === '' ||
      newAdalaber.speciality === ''
    ) {
      setErrorMsgClass('');
    } else {
      setData([...data, newAdalaber]);
      setNewAdalaber({
        id: uuid(),
        name: '',
        counselor: '',
        speciality: '',
        social_networks: [],
      });
      setInputName('');
      setInputTutor('');
      setInputSpeciality('');
      setErrorMsgClass('hidden');
    }
  };

  // FUNCIONES RENDER
  const renderAdalabers = () => {
    let tableData;
    if (inputNameFilter === '' && selectCounselor === '') {
      tableData = data.map((adalaber) => {
        const renderSocialNetworks = adalaber.social_networks.map(
          (network, index) => {
            return (
              <div key={index}>
                <a href={network.url}>{network.name}</a>
              </div>
            );
          }
        );
        return (
          <tr key={adalaber.id}>
            <td className="table__name">{adalaber.name}</td>
            <td className="table__counselor">{adalaber.counselor}</td>
            <td className="table__speciality">{adalaber.speciality}</td>
            <td className="table__networks">{renderSocialNetworks}</td>
          </tr>
        );
      });
    } else {
      tableData = filteredData.map((adalaber) => {
        const renderSocialNetworks = adalaber.social_networks.map(
          (network, index) => {
            return (
              <div key={index}>
                <a href={network.url}>{network.name}</a>
              </div>
            );
          }
        );
        return (
          <tr key={adalaber.id}>
            <td className="table__name">{adalaber.name}</td>
            <td className="table__counselor">{adalaber.counselor}</td>
            <td className="table__speciality">{adalaber.speciality}</td>
            <td className="table__networks">{renderSocialNetworks}</td>
          </tr>
        );
      });
    }
    return tableData;
  };

  return (
    <div>
      <header className="header">
        <h1 className="header__title">Adalabers</h1>
      </header>
      <main className="main">
        <form>
          <label htmlFor="name">Buscar por nombre:</label>
          <input
            onChange={handleInputNameFilter}
            type="text"
            id="name"
            name="name"
            value={inputNameFilter}
          />

          <label htmlFor="counselors">Escoge una tutora:</label>
          <select
            name="counselors"
            id="counselors"
            onChange={handleSelectCounselor}
          >
            <option value="">Cualquiera</option>
            <option value="yanelis">Yanelis</option>
            <option value="dayana">Dayana</option>
            <option value="ivan">Iván</option>
            <option value="miguel">Miguel</option>
          </select>
        </form>
        <table className="table">
          <thead>
            <tr>
              <th className="table__head">Nombre</th>
              <th className="table__head">Tutora</th>
              <th className="table__head">Especialidad</th>
              <th className="table__head">Redes sociales</th>
            </tr>
          </thead>
          <tbody>{renderAdalabers()}</tbody>
        </table>
        <h2 className="title__add">Añadir una Adalaber</h2>
        <form className="form">
          <div className="inputs__new">
            <label htmlFor="name">Nombre</label>
            <input
              onChange={handleInputNewAdalaber}
              type="text"
              id="name"
              name="name"
              value={inputName}
            />
            <label htmlFor="counselor">Tutora</label>
            <input
              onChange={handleInputNewAdalaber}
              type="text"
              id="counselor"
              name="counselor"
              value={inputTutor}
            />
            <label htmlFor="speciality">Especialidad</label>
            <input
              onChange={handleInputNewAdalaber}
              type="text"
              id="speciality"
              name="speciality"
              value={inputSpeciality}
            />
            <p className={errorMsgClass}>
              Debes completar todos los campos para poder añadir una nueva
              Adalaber.
            </p>
          </div>
          <button className="btn__add" onClick={handleBtnNewAdalaber}>
            Haz click para añadir una nueva Adalaber
          </button>
        </form>
      </main>
    </div>
  );
}

export default App;
