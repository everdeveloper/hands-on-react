export default (menuOptions) => {
  console.log("Menu Options to list - " + menuOptions);
  return (
    <hgroup>
      {
        menuOptions.map(menuOption => (
          <h1> {menuOption.name}</h1>
        ))
      }
    </hgroup>
  )
}