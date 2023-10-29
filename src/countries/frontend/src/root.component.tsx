export default function Root(props:{name:string}) {

  const onButtonClick = (event: any) => {
    event.preventDefault()
    dispatchEvent(new CustomEvent('@wineyard/countries/selected', { detail: {name: 'Brazil'}}))
    console.log('Fired event Countries/Selected')
  }

  return (
    <>
      <h2>{props.name}</h2>
      <button onClick={onButtonClick}>Pick a country</button>
    </>);
}
