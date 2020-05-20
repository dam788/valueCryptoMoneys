import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled'
import imagen from './cryptomonedas.png'
import Formulario from './components/Formulario'
import Cotizacion from './components/Cotizacion'
import Spinner from './components/Spinner'
import Axios from 'axios'

const Contenedor = styled.div`
  max-width: 900px;
  margin: 0 auto;
  user-select: none;
  @media (min-width:992px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 2rem;
  }
`

const Imagen = styled.img`
  max-width: 100%;
  margin-top: 5rem;
`
const Heading = styled.h1`
  font-family: 'Bebas Neue', cursive;
  color: #FFF;
  text-align:left;
  font-weight: 500;
  font-size: 50px;
  margin-bottom: 50px;
  margin-top: 80px;
  user-select: none;

  &::after {
    content: '';
    width: 100px;
    height: 6px;
    background-color: #66A2FE;
    display:block;
  }
`

const App = () => {
  // states que debemos pasar para la cotizacion
  const [ moneda, setMoneda ] = useState('')
  const [cryptomoneda, setCryptomoneda] = useState('')
  // ultimo state que es para guardar resultado
  const[ result, setResult ] = useState({})
  // spinner estado
  const[spinner,setSpinner] = useState(false)



  useEffect(() => {

    const cotizar = async () => {

      // evitamos la ejecucion la primera vez
      if (moneda === '') return

      // consultar api para obtener cotizacion
      const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${cryptomoneda}&tsyms=${moneda}`
      const resultado = await Axios.get(url)
      // mostrar spinner
      setSpinner(true)

      // ocular spinner y mostrar resultado
      setTimeout(() => {

        // desactivo spinner
        setSpinner(false)
        // guardar estado de cargando
        setResult(resultado.data.DISPLAY[cryptomoneda][moneda])
      },2500)

    }
    cotizar()

  },[moneda,cryptomoneda])

  const componenteSpinner = (spinner) ? <Spinner /> :  <Cotizacion result={result} />



  return (
    <Contenedor>
      <div>
        <Imagen
          src={imagen}
          alt="imagen crypto"
        />

      </div>
      <div>
        <Heading>Cotiza Criptomonedas al Instante</Heading>
        <Formulario
          setMoneda={setMoneda}
          setCryptomoneda={setCryptomoneda}
        />
        {componenteSpinner}
      </div>
    </Contenedor>
  );
}

export default App;
