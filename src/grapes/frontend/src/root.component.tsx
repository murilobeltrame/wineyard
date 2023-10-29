export default function Root(props:{name:string}) {

  const onButtonClick = (event: any) => {
    event.preventDefault()
    dispatchEvent(new CustomEvent('@wineyard/grapes/selected', { detail: {name: 'Merlot'}}))
    console.log('Fired event Grapes/Selected')
  }

  return (
    <>
      <h2>{props.name}</h2>
      <button onClick={onButtonClick}>Pick a grape</button>
    </>
  );
}
