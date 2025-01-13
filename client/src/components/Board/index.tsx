import { Piece } from "../index"
import { useNavigate } from 'react-router'
import { socket } from '../../services/socket'
import { Game as GameInterface } from "../../types/game"
import { ReactElement, useEffect, useState } from "react"
import { StyledGame, StyledPosition, StyledGameOptions } from "./style"

export const BoardGame = ({ room }: { room: any }) => {
  const [socketInstance] = useState(socket)

  const [game, setGame] = useState<GameInterface>({
    status: 'em andamento.',
    board: [
      [0,0,0],
      [0,0,0],
      [0,0,0]
    ],
  })

  const navigate = useNavigate()

  useEffect(() => {
    joinObserver()
    gameObserver()
    roomObserver()
    winnerObserver()
  }, [socketInstance])

  const joinObserver = () => {
    socketInstance.on('join-room', (response: any) => 
      console.log(response)
    )
  }

  const gameObserver = () => {
    socketInstance.on('game', (game: GameInterface) => {
      setGame(game)
      console.log(game.status)
    })
  }

  const roomObserver = () => {
    socketInstance.on('delete-room', (response: string) => {
      console.log(response)
      navigate('/')
    })
  }

  const winnerObserver = () => {
    socketInstance.on('winner', (response: string) =>
      window.alert(response)
    )
  }

  const setPosition = (position: number) => {
    socketInstance.emit('set-position', room, position)
    socketInstance.on('set-position', (reponse: string) => 
      console.log(reponse)
    )
  }

  const resetGame = () => {
    socketInstance.emit('reset-game', room)
  }

  const deleteRoom = () => {
    socketInstance.emit('delete-room', room)
  }

  const processPosition: (board: number[][], position: number) => number = (board, position) => {
    let row =  Math.trunc(position / 3)
    let column = (position % 3)
    
    return board[row][column]
  }

  const processPiece: (piece: number) => ReactElement | null = (piece) => {
    if (piece == 1) return <Piece.Xis /> 
    if (piece == 2) return <Piece.Circle /> 

    return null
  }
  
  const CollectionPosition = () => {
    let positions: Array<ReactElement> = []
  
    for (let i = 0; i < 9; i++) {  
      let piece = processPosition(game.board, i)

      positions.push(
        <StyledPosition key={i} id={i.toString()} onClick={() => setPosition(i)}>
          { processPiece(piece) }
        </StyledPosition>
      )
    }
  
    return positions
  }

  return (
    <>
      <StyledGame>
        <CollectionPosition />
      </StyledGame>
      <StyledGameOptions>
        <button onClick={resetGame}>Reiniciar jogo</button>
        <button onClick={deleteRoom}>Finalizar sala</button>
      </StyledGameOptions>
    </>
  )
}