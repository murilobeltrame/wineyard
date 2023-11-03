import { Box } from "@mui/material"
import LazyParcel from "./components/lazyparcel"

export const Root=() => {

  return (
    <>
      <h1>Wineyard</h1>
      <Box sx={{display: 'flex', gap:'60px'}}>
      <Box sx={{flexGrow: 1}}>
      <LazyParcel moduleName="@wineyard/countries" name="wineyard-countries" />
      </Box>
      <Box sx={{flexGrow: 1}}>
      <LazyParcel moduleName="@wineyard/grapes" name="wineyard-grapes" />
      </Box>
      <Box sx={{flexGrow: 4}}>
      <LazyParcel moduleName="@wineyard/wines" name="wineyard-wines" />
      </Box>
      </Box>
    </>
  )
}

export default Root