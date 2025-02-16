import { useNavigate } from 'react-router'
import { useEffect, useState } from 'react'
import { CreateRoom as CreateRoomInterface } from '../../types/game'
import { socket } from '../../services/socket'
import { StyledContentJoin, StyledCreateRoom, StyledJoinRoom } from './style'

export const Join = () => {
  const [socketInstance] = useState(socket)
  const [newRoom, setNewRoom] = useState<any>('')
  const [rooms, setRooms] = useState<string[]>([])

  const navigate = useNavigate()

  useEffect(() => connection(), [])

  useEffect(() => {
    availableRooms()
  }, [socketInstance])

  const connection = () => {
    socketInstance.emit('connection')
    socketInstance.on('connection', (response: any) => {
      console.log(response)
    })
  }

  const createRoom = () => {
    socketInstance.emit('create-room', newRoom)
    socketInstance.on('create-room', (createRoom: CreateRoomInterface) => {
      console.log(createRoom.message)
      createRoom.status ? navigate(`/room/${newRoom}`) : window.alert(createRoom.message)
    })
  }

  const availableRooms = () => {
    socketInstance.on('rooms', (rooms) => {
      setRooms(rooms)
    })
  }

  const joinRoom = (roomId: any) => {
    socketInstance.emit('join-room', roomId)
    socketInstance.on('join-room', (response: string | false) => {
      response ? navigate(`/room/${roomId}`) : window.alert('a sala atingiu o numero máximo de jogadores, entre em outra sala.')  
    })
  }

  const normaliseText = (str: any) => {
    return str.normalize("NFD")
      .replace(/[^a-zA-Z\s]/g, "")
      .replace(/\s/, "")
      .toLowerCase() // convert: São Paulo, to: sao-paulo
  }

  const MessageAvailableRooms = () => {
    return rooms.length > 0 && <span>Salas disponíveis:</span>
  }

  const CollectionRoom = () => {
    return rooms.map(roomName => (
      <div key={roomName} onClick={() => joinRoom(roomName)}>{roomName}</div>
    ))
  }

  return (
    <StyledContentJoin>
      <StyledCreateRoom>
        <input id="roomName" type="text" placeholder="Nome" onChange={(e) => setNewRoom(normaliseText(e.target.value))} required />
        <button onClick={createRoom}>Criar sala</button>
      </StyledCreateRoom>
      <StyledJoinRoom>
        <MessageAvailableRooms />
        <CollectionRoom />
      </StyledJoinRoom>
    </StyledContentJoin>
  )
}