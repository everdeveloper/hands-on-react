import React, { useEffect, useState } from 'react';
import ListMenuOptons from './components/ListMenuOptions';
import "./App.scss";

function App() {

  // const apiMaintMenu = process.env.PM_MENU_API;
  // const apiMaintMenu = "https://pm101.azurewebsites.net/api/pmmenu";
  const apiMaintMenu = "http://localhost:7071/api/pmmenu";
  const apiMaintRequest = "http://localhost:7071/api/pmrequest";
  const apiMaintSMS = "http://localhost:7071/api/pmsms";


  const [menuOptions, setMenuOptions] = useState([])

  async function fetchMenuOptions() {
    try {

      const response = await fetch(apiMaintMenu);
      console.log("response => " + response);
      setMenuOptions(await response.json());
      console.log("MenuOptions == " + menuOptions);

    } catch (error) {
      console.log(error.message);
    }
  }

  useEffect(() => {
    console.log("useEffect() is invoked...");
    fetchMenuOptions()
  }, []);

  function handleClick(selectedOption) {
    console.log('selected Option = ', selectedOption);

    try {
      const response = fetch(apiMaintSMS, {
        method: 'POST',
        body: JSON.stringify({
          selectedOption: selectedOption
        }),
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Error! status: ${response.status}`);
      }

      const result = response.json();
      setResult(result)

      console.log('result is: ', JSON.stringify(result, null, 4));

      setData(result);
    } catch (err) {
      console.log("Error occured while posting maint request" + err.message);
      // setErr(err.message);
    } finally {
      // setIsLoading(false);
    }
  }

  return (
    <>
      <div className="container">
        <hgroup>
          <h1>Welcome to December Demo!</h1>
          {menuOptions.map((item, index) => (
            <button key = {item.id} onClick={e => handleClick(item.title)}>
              {item.title}
            </button>
          ))}
        </hgroup>
      </div>
    </>
  )
}
export default App
