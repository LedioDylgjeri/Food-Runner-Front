import styles from './CheckoutItem.module.css'

const CheckoutItem = (props) => {
  return (
    <>
    <div className={styles.parent}>
      <div className={styles.div1}>
      </div>
      <div className={styles.div2}>
        {props.item}
      </div>
      <div className={styles.div3}>
        {props.price}
      </div>
    </div>
    </>
  )
}

export default CheckoutItem