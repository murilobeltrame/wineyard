import { useEffect } from "react";

export default function Root(props: {name:string}) {

  useEffect(() => window.addEventListener('@wineyard/countries/selected', event => {
    console.log('Received Countries/Selected into Wines')
    console.log(event)
  }), [])

  useEffect(() => window.addEventListener('@wineyard/grapes/selected', event => {
    console.log('Received Grapes/Selected into Wines')
    console.log(event)
  }), [])

  return (
    <>
      <h2>{props.name}</h2>
    </>
  );
}
