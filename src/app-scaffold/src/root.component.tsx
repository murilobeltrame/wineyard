import { useEffect, useState } from "react"
import Parcel from "single-spa-react/parcel"

export const Root=({name}) => {

  const [loading, setLoading] = useState<boolean>(true)
  const [module, setModule] = useState<System.Module>(null)

  useEffect(() => {
    setLoading(true)
    System.import("@wineyard/grapes")
      .then((module) => {
        setLoading(false)
        setModule(module)
      })
  },[])

  let parcel
  if (loading || !module) parcel = (<div>loading ... </div>)
  else parcel = <Parcel config={{...module.default, name: "wineyard-grapes" }} />

  return (
    <>
      <h1>{name}</h1>
      {parcel}
    </>
  )
}

export default Root