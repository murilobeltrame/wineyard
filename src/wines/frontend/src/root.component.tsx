import { useEffect, useState } from "react";

export default function Root() {
  const [selectedCountries, setSelectedCountries] = useState<string[]>([])
  const [selectedGrapes, setSelectedGrapes] = useState<string[]>([])

  window.addEventListener('@wineyard/countries/selected', event => {
    console.log('Received Countries/Selected into Wines')
    const e:any = event;
    setSelectedCountries([...selectedCountries, e.detail.name])
  })

  window.addEventListener('@wineyard/countries/unselected', event => {
    console.log('Received Countries/Unselected into Wines')
    const e:any = event;
    const n = selectedCountries
    const idx = n.indexOf(e.detail.name)
    n.splice(idx, 1)
    setSelectedCountries([...n])
  })

  window.addEventListener('@wineyard/grapes/selected', event => {
    console.log('Received Grapes/Selected into Wines')
    const e:any = event;
    setSelectedGrapes([...selectedGrapes, e.detail.name])
  })

  window.addEventListener('@wineyard/grapes/unselected', event => {
    console.log('Received Grapes/Unselected into Wines')
    const e:any = event;
    const n = selectedGrapes
    const idx = n.indexOf(e.detail.name)
    n.splice(idx, 1)
    setSelectedGrapes([...n])
  })

  return (
    <>
      <h2>Wines</h2>
      <p>{selectedCountries}</p>
      <p>{selectedGrapes}</p>
    </>
  );
}
