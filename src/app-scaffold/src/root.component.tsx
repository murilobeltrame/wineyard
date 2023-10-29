import LazyParcel from "./components/lazyparcel"

export const Root=({name}:{name:string}) => {

  return (
    <>
      <h1>{name}</h1>
      <LazyParcel moduleName="@wineyard/countries" name="wineyard-countries" />
      <LazyParcel moduleName="@wineyard/grapes" name="wineyard-grapes" />
      <LazyParcel moduleName="@wineyard/wines" name="wineyard-wines" />
    </>
  )
}

export default Root