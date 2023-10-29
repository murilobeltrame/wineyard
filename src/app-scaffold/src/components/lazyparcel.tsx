import { useEffect, useState } from "react"
import Parcel from "single-spa-react/parcel"

export const LazyParcel = ({moduleName, name}) => {
    const [loading, setLoading] = useState<boolean>(true)
    const [module, setModule] = useState<System.Module>(null)

    useEffect(() => {
        setLoading(true)
        System.import(moduleName)
            .then((module) => {
                setLoading(false)
                setModule(module)
            })
    },[])

    let parcel
    if (loading || !module) parcel = (<div>loading ... </div>)
    else parcel = <Parcel config={{...module.default, name }} />

    return (parcel)
}

export default LazyParcel