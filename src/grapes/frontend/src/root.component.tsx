import { Checkbox, List, ListItem, ListItemButton, ListItemIcon, ListItemText, TextField } from "@mui/material";
import { useEffect, useState } from "react";

export default function Root() {
  const [grapes, setGrapes] = useState([])
  const [grapeFilter, setGrapeFilter] = useState('')
  const [grapesSelected, setGrapesSelected] = useState<string[]>([])

  useEffect(() => {
    let url = `${process.env.BACKEND_URL ?? 'http://localhost:5054'}/Grapes`
    if (grapeFilter?.length >= 3) {
      url = `${url}?name=${grapeFilter}`
    }
    fetch(url)
      .then((response) => response.json())
      .then((data) => setGrapes(data))
      .catch(_ => setGrapes([]))
  }, [grapeFilter])

  function handleGrapeSelectionChange(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.target.checked) {
      setGrapesSelected([...grapesSelected, event.target.value])
      dispatchEvent(new CustomEvent('@wineyard/grapes/selected', {detail:{name: event.target.value}}))
    } else {
      const n = grapesSelected
      const idx = n.indexOf(event.target.value)
      n.splice(idx, 1)
      setGrapesSelected([...n])
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
                  <Checkbox edge="start" 
                    value={grape.name} 
                    disableRipple 
                    onChange={handleGrapeSelectionChange}
                    checked={grapesSelected.indexOf(grape.name) >= 0} />
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
