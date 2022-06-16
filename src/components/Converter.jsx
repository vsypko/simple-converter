import React from "react"

const Converter = (props) => {
  const { currencies } = props
  //functioт for getting required currencies--------------------------------------------------
  const getCurrency = (type, array) => {
    let currency = array.find((el) => el.cc === type)
    if (currency) {
      return { type: currency.cc, rate: currency.rate, value: 0 }
    }
  }

  //set array of required currencies----------------------------------------------------
  let currency = [{ type: "UAH", rate: 1, value: 0 }]

  if (currencies && currencies.length > 0) {
    currency.push(getCurrency("EUR", currencies))
    currency.push(getCurrency("USD", currencies))
  }

  //states for left and right inputs------------------------------------------------------
  const [leftCurrency, setLeftCurrency] = React.useState()
  const [rightCurrency, setRightCurrency] = React.useState()

  //set initial values for states-----------------------------------------------------------
  React.useEffect(() => {
    if (currencies && currencies.length > 0) {
      setLeftCurrency(currency[0])
      setRightCurrency(currency[1])
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currencies])

  //the main handler for inputs and selects-------------------------------------------------
  const handleInput = (e) => {
    let i = 0
    let num = 0

    switch (e.target.name) {
      case "leftselect":
        i = currency.findIndex((el) => el.type === e.target.value)
        num = (leftCurrency.value * currency[i].rate) / rightCurrency.rate
        setLeftCurrency({
          ...leftCurrency,
          type: e.target.value,
          rate: currency[i].rate,
        })
        setRightCurrency({
          ...rightCurrency,
          value: num.toFixed(2),
        })
        break

      case "rightselect":
        i = currency.findIndex((el) => el.type === e.target.value)
        num = (rightCurrency.value * currency[i].rate) / leftCurrency.rate
        setRightCurrency({
          ...rightCurrency,
          type: e.target.value,
          rate: currency[i].rate,
        })
        setLeftCurrency({
          ...leftCurrency,
          value: num.toFixed(2),
        })
        break

      case "leftinput":
        num = (e.target.value * leftCurrency.rate) / rightCurrency.rate
        setLeftCurrency({ ...leftCurrency, value: e.target.value })
        setRightCurrency({
          ...rightCurrency,
          value: num.toFixed(2),
        })
        break

      case "rightinput":
        num = (e.target.value * rightCurrency.rate) / leftCurrency.rate
        setRightCurrency({ ...rightCurrency, value: e.target.value })
        setLeftCurrency({
          ...leftCurrency,
          value: num.toFixed(2),
        })
        break
      default:
        console.log("Unexpected event!")
    }
  }

  //some 'unclean code' here to avoid problems with setting props name for selects and inputs------------
  return (
    <div>
      <div className="title">YOUR OWN CURRENCY CONVERTER</div>
      <div className="inputs-form">
        {leftCurrency && (
          <div className="input">
            <select
              name="leftselect"
              value={leftCurrency.type}
              onChange={(e) => handleInput(e)}
            >
              {currency.map((currency) => (
                <option value={currency.type} key={currency.type}>
                  {currency.type}
                </option>
              ))}
            </select>

            <input
              type="number"
              value={leftCurrency.value}
              name="leftinput"
              onChange={(e) => handleInput(e)}
            />
          </div>
        )}
        {rightCurrency && (
          <div className="input">
            <select
              name="rightselect"
              value={rightCurrency.type}
              onChange={(e) => handleInput(e)}
            >
              {currency.map((currency) => (
                <option value={currency.type} key={currency.type}>
                  {currency.type}
                </option>
              ))}
            </select>

            <input
              type="number"
              value={rightCurrency.value}
              name="rightinput"
              onChange={(e) => handleInput(e)}
            />
          </div>
        )}
      </div>
    </div>
  )
}
export default Converter
