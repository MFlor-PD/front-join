import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './Home.jsx'
import ItemDetailPage from './ItemDetailPage.jsx'

const App = () => {

  const [data, setData] = useState(null)
  const urlApi = 'http://localhost:3000'
  
  const fetchData = async () => {
    try {

      const res = await fetch(urlApi)
      const resData = await res.json() 
      setData(resData)

    }catch(err) {
     console.error(err);
    }

  }

  useEffect(() => {
    fetchData()
  }, [])  

  return (
       <Router>
       <div>
        <nav>
          <Link to='/'>Inicio</Link>
        </nav>
        {data === null 
        ? (<div>Cargando...</div>)
        :
        <Routes>
          <Route path='/' element={<Home data={data} />} />
          {data.map(item => (
          <Route key={item._id} path={`/${item._id}`} element={<ItemDetailPage item={item}/>} />
          ))}
        </Routes>
        }
       </div>
       </Router>
  )

};

export default App;
