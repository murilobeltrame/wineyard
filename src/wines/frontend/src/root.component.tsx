import { useEffect, useState } from "react";

export default function Root() {
  const [selectedCountries, setSelectedCountries] = useState<string[]>([])
  const [selectedGrapes, setSelectedGrapes] = useState<string[]>([])

  useEffect(() => window.addEventListener('@wineyard/countries/selected', event => {
    console.log('Received Countries/Selected into Wines')
    console.log(event)
    // const e:any = event;
    // console.log(selectedCountries)
    // const n = [...selectedCountries, e.detail.name]
    // console.log(n)
    // setSelectedCountries(n)
  }), [])

  useEffect(() => window.addEventListener('@wineyard/countries/unselected', event => {
    console.log('Received Countries/Unselected into Wines')
    console.log(event)
  }), [])

  useEffect(() => window.addEventListener('@wineyard/grapes/selected', event => {
    console.log('Received Grapes/Selected into Wines')
    console.log(event)
  }), [])

  useEffect(() => window.addEventListener('@wineyard/grapes/unselected', event => {
    console.log('Received Grapes/Unselected into Wines')
    console.log(event)
  }), [])

  return (
    <>
      <h2>Wines</h2>
      <p>{selectedCountries}</p>
      <p>{selectedGrapes}</p>
    </>
  );
}
