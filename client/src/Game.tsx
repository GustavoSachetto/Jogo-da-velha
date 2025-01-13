import { Board } from './components'
import { useParams } from 'react-router'

export default () => {
  let params = useParams()
  
  return (
    <main style={{ display: "flex", flexDirection: 'column', marginTop: "100px", justifyContent: "center", alignItems: 'center' }}>
      <Board.Game room={params.id} />
    </main>
  )
}
