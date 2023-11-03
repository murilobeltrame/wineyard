import { Checkbox, List, ListItem, ListItemButton, ListItemIcon, ListItemText, TextField } from "@mui/material";
import { useEffect, useState } from "react";

export default function Root() {
  const [countries, setCountries] = useState([])
  const [countryFilter, setCountryFilter] = useState('')
  const [countriesSelected, setCountriesSelected] = useState<string[]>([])

  useEffect(() => {
    let url = 'http://localhost:5004/Countries'
    if (countryFilter?.length >= 3) {
      url = `${url}?name=${countryFilter}`
    }
    fetch(url)
      .then((response) => response.json())
      .then((data) => setCountries(data))
  },[countryFilter])

  function handleCountrySelectionChange(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.target.checked) {
      setCountriesSelected([...countriesSelected, event.target.value])
      dispatchEvent(new CustomEvent('@wineyard/countries/selected', { detail: {name: event.target.value}}))
    } else {
      const n = countriesSelected
      const idx = n.indexOf(event.target.value)
      n.splice(idx, 1)
      setCountriesSelected([...n])
      dispatchEvent(new CustomEvent('@wineyard/countries/unselected', { detail: {name: event.target.value}}))
    }
  }

  function handleCountryFilterChange(event: React.ChangeEvent<HTMLInputElement>) { 
    setCountryFilter(event.target.value);
  }

  return (
    <>
      <TextField label="Country" variant="standard" fullWidth onChange={handleCountryFilterChange} />
      <List>
        {countries.map((country:{id:number, name:string}) => {
          return (
            <ListItem key={country.id}>
              <ListItemButton role={undefined} dense>
                <ListItemIcon>
                  <Checkbox edge="start" 
                    value={country.name} 
                    disableRipple 
                    onChange={handleCountrySelectionChange}
                    checked={countriesSelected.indexOf(country.name) >= 0} />
                </ListItemIcon>
                <ListItemText primary={country.name}></ListItemText>
              </ListItemButton>
            </ListItem>
          )
        })}
      </List>
    </>);
}
