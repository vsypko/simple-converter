import euro from "../assets/eur.png"
import usd from "../assets/usd.png"

const Header = (props) => {
  const { currencies, date } = props
  let toDay = date.toDateString()

  let eurTitle = 0,
    usdTitle = 0
  if (currencies && currencies.length > 0) {
    eurTitle = `1 EUR = ${currencies.find((el) => el.cc === "EUR").rate} UAH`
    usdTitle = `1 USD = ${currencies.find((el) => el.cc === "USD").rate} UAH`
  }

  return (
    <header className="App-header">
      <div className="today">{toDay}</div>
      <div className="currency">
        <img alt="euro" src={euro} className="symbol" height="60px" />
        <div className="sign">{eurTitle}</div>
      </div>
      <div className="currency">
        <img alt="usd" src={usd} className="symbol" height="60px" />
        <div className="sign">{usdTitle}</div>
      </div>
    </header>
  )
}
export default Header
