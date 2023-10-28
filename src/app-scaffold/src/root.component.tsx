import Parcel from "single-spa-react/parcel"
import * as countriesConfig from "@wineyard/countries"

export const Root=({name}) => {
  return (
    <>
      <h1>{name}</h1>
      <Parcel config={countriesConfig} />
    </>
  )
}

export default Root