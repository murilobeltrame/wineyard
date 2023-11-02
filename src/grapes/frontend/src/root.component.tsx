import { Checkbox, List, ListItem, ListItemButton, ListItemIcon, ListItemText, TextField } from "@mui/material";
import { useEffect, useState } from "react";

export default function Root() {
  const [grapes, setGrapes] = useState([])
  const [grapeFilter, setGrapeFilter] = useState('')

  useEffect(() => {
    let url = 'http://localhost:5054/Grapes'
    if (grapeFilter?.length >= 3) {
      url = `${url}?name=${grapeFilter}`
    }
    fetch(url)
      .then((response) => response.json())
      .then((data) => setGrapes(data))
  }, [grapeFilter])

  function handleGrapeSelectionChange(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.target.checked) {
      dispatchEvent(new CustomEvent('@wineyard/grapes/selected', {detail:{name: event.target.value}}))
    } else {
      dispatchEvent(new CustomEvent('@wineyard/grapes/unselected', { detail: {name: event.target.value}}))
    }
  }

  function handleGrapeFilterChange(event: React.ChangeEvent<HTMLInputElement>) {
    setGrapeFilter(event.target.value)
  }

  return (
    <>
      <TextField label="Grape" variant="standard" fullWidth onChange={handleGrapeFilterChange} />
      <List>
        {grapes.map((grape:{id:number, name:string}) => {
          return (
            <ListItem key={grape.id}>
              <ListItemButton role={undefined} dense>
                <ListItemIcon>
                  <Checkbox edge="start" value={grape.name} disableRipple onChange={handleGrapeSelectionChange} />
                </ListItemIcon>
                <ListItemText primary={grape.name}></ListItemText>
              </ListItemButton>
            </ListItem>
          )
        })}
      </List>
    </>
  );
}
