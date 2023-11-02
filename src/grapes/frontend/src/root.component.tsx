import { Checkbox, List, ListItem, ListItemButton, ListItemIcon, ListItemText, TextField } from "@mui/material";
import { useEffect, useState } from "react";

export default function Root() {
  const [grapes, setGrapes] = useState([])
  const [grapeFilter, setGrapeFilter] = useState('')

  useEffect(() => {
    const grapeList:any = [
      {id:1, name:'Merlot'}, 
      {id:2, name:'Chardonay'},
      {id:3, name:'Carmernere'}]
    setGrapes(grapeList)
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
