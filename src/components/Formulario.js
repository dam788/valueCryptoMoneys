import React, { useEffect, useState } from 'react'
import styled from '@emotion/styled'
// importo componente
import Error from './Error'
// importando mis hooks personalizados....
import useMoneda from '../hooks/useMoneda'
import useCriptomoneda from '../hooks/useCriptomoneda'
import Axios from 'axios'

const Boton = styled.input`
  margin-top: 20px;
  font-weight: bold;
  font-size: 20px;
  padding: 10px;
  background-color: #66a2fe;
  border: none;
  width: 100%;
  border-radius: 3px;
  color: #fff;
  transition: background-color .3s ease;

  &:hover{
    background-color: #326AC0;
    cursor: pointer;
  }

`





const Formulario = ({setMoneda, setCryptomoneda}) => {
  // state del listadod e criptomonedas
  const [ listacrypto, guardarListacrypto ] = useState([])
  // state ´para validacion del formulario
  const [ error, setError ] = useState(false)


  const MONEDAS = [
    {codigo: 'USD', nombre: 'Dolar de Estados Unidos'},
    {codigo: 'EUR', nombre: 'Euro'},
    {codigo: 'GBP', nombre: 'Libra Esterlina'},
    {codigo: 'ARS', nombre: 'Peso Argentino'},
    {codigo: 'COP', nombre: 'Peso Colombiano'},
    {codigo: 'MXN', nombre: 'Peso Mexicano'}
  ]

  /* utilzar useMoneda, traemos los valores en el mismo orden que los retornamos en nuestro hook...en useMoneda le podemos pasar parametros, que se tomaran en el archivo useMoneda...
  */
  const [moneda, Seleccionar] = useMoneda('Elige tu Moneda', '', MONEDAS)
  // usamos useCriptomoneda
  const [cryptomoneda, SelectCripto] = useCriptomoneda('Elige tu criptomoneda','',listacrypto)

  // ejecutar llamado a la api con useEffect
  useEffect(() => {

    const consultarAPI = async () => {
      const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD'
      const resultado = await Axios.get(url)
      // lo guardo en el state
      guardarListacrypto(resultado.data.Data)

    }
    consultarAPI()

  }, [])

  // cuando el usuario hace submit
  const cotizarMoneda = e => {

    e.preventDefault();

    // validar los campos si estan llenos
    if (moneda === '' || cryptomoneda === '') {
      return setError(true)
    }
    setError(false)

    // pasar los datos al componente principal
    setMoneda(moneda)
    setCryptomoneda(cryptomoneda)
  }


  return (
    <form
    onSubmit={cotizarMoneda}
    >
      {error ? <Error mensaje='todos los campos son obligatorios'/> : null}

      <Seleccionar />
      <SelectCripto/>
      <Boton
        type='submit'
        value='Calcular'
      />
    </form>

   );
}

export default Formulario;