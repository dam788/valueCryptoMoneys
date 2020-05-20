import React, { useState } from 'react'
import styled from '@emotion/styled'

const Label = styled.label`
  font-family: 'Bebas Neue', cursive;
  color: white;
  text-transform: uppercase;
  font-size: 2.4rem;
  margin-top: 2rem;
  display: block;
`
const Select = styled.select`
  width: 100%;
  display: block;
  padding: 1rem;
  -webkit-appearance: none;
  border-radius: 2px;
  border: none;
`

const useMoneda = (label, stateInicial, opciones) => {

  // state de nuestro custom hook
  const [state, setState] = useState(stateInicial)



  const Seleccionar = () => (
    <>
      <Label>{label}</Label>
      <Select
        onChange={e => setState(e.target.value)}
        value={state}
      >
        <option value=""> -Seleccione- </option>
        {opciones.map( opcion =>(
          <option
            key={opcion.codigo}
            value={opcion.codigo}
          >
            {opcion.nombre}
          </option>
        ))}
      </Select>
    </>
  )

  // retornar state, interfaz y funcion que modif el state (el orden es importante)
  return [state, Seleccionar, setState]

}

export default useMoneda