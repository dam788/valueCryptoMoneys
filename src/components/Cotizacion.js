import React from 'react'
import styled from '@emotion/styled'

const ResultadoDiv = styled.div`
  color: white;
  font-family: sans-serif;
`
const Info = styled.p`
  font-size: 18px;
  span{
    font-weight: bold;
  }
`

const Precio = styled.p`
  font-size: 30px;
  span{
    font-weight: bold;
  }
`


const Cotizacion = ({result}) => {

  if (Object.keys(result).length === 0) return null;
  console.log(result)
  return (
    <ResultadoDiv>
      <Precio>El precio es:&nbsp; <span>{result.PRICE}</span></Precio>
      <Info>El precio más alto del dia:&nbsp;<span>{result.HIGHDAY}</span></Info>
      <Info>El precio más bajo del dia:&nbsp; <span>{result.LOWDAY}</span></Info>
      <Info>Variación últimas 24hs:&nbsp; <span>{result.CHANGEPCT24HOUR}</span></Info>
      <Info>Última Actualización:&nbsp; <span>{result.LASTUPDATE}</span></Info>
    </ResultadoDiv>
  );

}

export default Cotizacion;