import React from "react"
import "./App.css"
import Header from "./components/Header"
import Converter from "./components/Converter"

const App = () => {
  const [currencies, setCurrencies] = React.useState([])
  const date = new Date()

  const convDate = `${date.getFullYear()}0${
    date.getMonth() + 1
  }${date.getDate()}`

  React.useEffect(() => {
    async function fetchData() {
      const res = await fetch(
        `https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?date=${convDate}&json`
      )
      const allCurrencies = await res.json()
      setCurrencies(allCurrencies)
    }
    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [convDate])

  return (
    <div className="App">
      <Header currencies={currencies} date={date} />
      <Converter currencies={currencies} />
    </div>
  )
}

export default App
