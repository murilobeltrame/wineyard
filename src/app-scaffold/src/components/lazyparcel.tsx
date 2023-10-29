import { useEffect, useState } from "react"
import Parcel from "single-spa-react/parcel"

export interface LazyParcelProps {
    moduleName:string,
    name:string
}

export const LazyParcel = ({moduleName, name}: LazyParcelProps) => {
    const [loading, setLoading] = useState<boolean>(true)
    const [module, setModule] = useState<System.Module>()

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