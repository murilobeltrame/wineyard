import { Checkbox, List, ListItem, ListItemButton, ListItemIcon, ListItemText, TextField } from "@mui/material";
import { useEffect, useState } from "react";

export default function Root(props:Readonly<{name:string}>) {
  const [countries, setCountries] = useState([])

  useEffect(() => {
    fetch('http://localhost:5004/Countries')
      .then((response) => response.json())
      .then((data) => setCountries(data))
  },[])

  function handleCountrySelectionChange(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.target.checked) {
      dispatchEvent(new CustomEvent('@wineyard/countries/selected', { detail: {name: event.target.value}}))
    } else {
      dispatchEvent(new CustomEvent('@wineyard/countries/unselected', { detail: {name: event.target.value}}))
    }
  }

  return (
    <>
      <TextField label="Country" variant="standard" />
      <List>
        {countries.map((country:{id:number, name:string}) => {
          return (
            <ListItem key={country.id}>
              <ListItemButton role={undefined} dense>
                <ListItemIcon>
                  <Checkbox edge="start" value={country.name} disableRipple onChange={handleCountrySelectionChange} />
                </ListItemIcon>
                <ListItemText primary={country.name}></ListItemText>
              </ListItemButton>
            </ListItem>
          )
        })}
      </List>
    </>);
}
