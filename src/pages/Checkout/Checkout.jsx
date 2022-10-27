import { useState, useRef, useEffect } from "react"
import { useLocation, Link, useNavigate } from "react-router-dom"
import { useParams } from "react-router-dom"
import CheckoutItem from '../../components/CheckoutItem/CheckoutItem'
import * as orderService from '../../services/orderService'
import styles from './Checkout.module.css'

const Checkout = (props) => {
  
  const { id } = useParams()
  const [order, setOrder] = useState(null)
  const [pizzas, setPizzas ] = useState([])
  const [beverages, setBeverages ] = useState([])
  const [pizzaData, setPizzaData ] = useState(null)

  const navigate = useNavigate()
  
  useEffect(() => {
    const fetchOrder = async () => {
      const data = await orderService.show(id)
      setOrder(data)
    }
    fetchOrder()
  }, [id])

  useEffect(() => {
    setPizzas(order?.pizzas)
    setBeverages(order?.beverages)
    console.log(order)
  }, [order])
  
  useEffect(() => {
    if(!pizzas?.length) return
    const priceData = pizzas?.map(pizza => 
      pizza?.ingredients.reduce((previous, current) => 
        previous + current.price
      ,0)  
    )
    const nameData = pizzas?.map(pizza => 
      pizza?.ingredients.reduce((previous, current) => 
        `${current.name}, ${previous}` 
      ,'')  
    )

    const data = []
    for (let i = 0; i < nameData.length; i++){
      data[i] = {pizzaName: nameData[i], pizzaPrice: priceData[i]}
    }
    setPizzaData(data)
  }, [pizzas])

  const handleContinue = async (e) => {
    navigate(`/reviews/new`)
  }

  return (
    pizzaData ? 
    <>
    <div className={styles.parent}>
      <div className={styles.div1}>
        <h1>Pizza Pirates</h1>
        <h6>Your Order:</h6>
      </div>
      <div className={styles.div2}>
        <h5>Your Pizzas</h5>
        {console.log('pizzaData', pizzaData)}
        {pizzaData?.map(element => 
          <CheckoutItem 
            item={element.pizzaName}
            price={element.pizzaPrice}  
          />
        )}
        <h5>Your Beverages</h5>
        {beverages?.map(element => 
          <CheckoutItem 
            item={element.name}
            price={element.price}  
          />
        )} 
      </div>
      <div className={styles.div3}>
        <form
          autoComplete="off"
          onSubmit={e => handleContinue(e)}
          className={styles.container}
        >
          <button type="submit" className="btn btn-success" id={styles['checkout']}>Checkout</button>
        </form>
      </div>
    </div>
    </>
    :
    'Loading...'
  )
}

export default Checkout