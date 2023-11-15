import { List, ListItem, ListItemText, Typography } from "@mui/material";
import { Fragment, useEffect, useState } from "react";

interface Wine {
  id: number
  label: string
  winery: string
  country: string
  grapes: string[]
}

export default function Root() {
  const [selectedCountries, setSelectedCountries] = useState<string[]>([])
  const [selectedGrapes, setSelectedGrapes] = useState<string[]>([])
  const [wines, setWines] = useState<Wine[]>([])

  window.addEventListener('@wineyard/countries/selected', event => {
    console.log('Received Countries/Selected into Wines')
    const e:any = event;
    setSelectedCountries([...selectedCountries, e.detail.name])
  })

  window.addEventListener('@wineyard/countries/unselected', event => {
    console.log('Received Countries/Unselected into Wines')
    const e:any = event;
    const n = [ ... selectedCountries]
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
    const n = [...selectedGrapes]
    const idx = n.indexOf(e.detail.name)
    n.splice(idx, 1)
    setSelectedGrapes([...n])
  })

  useEffect(() => {
    let url = `${process.env.BACKEND_URL?? 'http://localhost:5069'}/Wines?`
    if (selectedCountries.length) {
      url = `${url}${selectedCountries.map(country => `countries=${country}`).join('&')}`
    }
    if (selectedGrapes.length) {
      if (!url.endsWith('?')) url = `${url}&`
      url = `${url}${selectedGrapes.map(grape => `grapes=${grape}`).join('&')}`
    }
    fetch(url)
      .then((response) => response.json())
      .then((data) => setWines(data))
      .catch(_ => setWines([]))
  }, [selectedCountries, selectedGrapes])

  return (
    <>
      <h2>Wines</h2>
      <p>{selectedCountries}</p>
      <p>{selectedGrapes}</p>
      <List>
        {wines.map((wine: Wine) => {
          return (<ListItem key={wine.id}>
            <ListItemText 
              primary={wine.label} 
              secondary={
                <Fragment>
                    <Typography component='span' variant="body2" color='text.primary'>{wine.winery}, {wine.country}</Typography>
                    {` - ${wine.grapes.join(', ')}`}
                </Fragment>
              } />
          </ListItem>)
        })}
      </List>
    </>
  );
}
