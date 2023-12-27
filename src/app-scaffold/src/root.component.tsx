import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material"
import LazyParcel from "./components/lazyparcel"
import keycloakConfiguration from "./keycloak";

export const Root=() => {

  const keycloak = keycloakConfiguration;

  return (
    <>
      <AppBar position="relative" color="transparent" elevation={0}>
        <Toolbar>
          <Typography variant="h6" sx={{flexGrow: 1}}>Wineyard</Typography>
          <Button color="inherit" onClick={() => keycloak.logout()}>Logout</Button>
        </Toolbar>
      </AppBar>
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