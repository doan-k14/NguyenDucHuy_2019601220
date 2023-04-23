import { PhoneFilled } from '@ant-design/icons'

const CallAction = () => {
  return (
    <a
      style={{
        position: 'fixed',
        bottom: '10%',
        right: '3%',
        fontSize: '2rem',
        color: '#D72027',
        background: 'white',
        padding: '1rem',
        borderRadius: '100%',
        border: '3px solid #D72027'
      }}
      href="tel:0362274026"
      title='Gọi đến: 0362274026'
    >
      <PhoneFilled />
    </a>
  )
}

export default CallAction
