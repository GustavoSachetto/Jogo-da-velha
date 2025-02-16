import Game from './game'
import express from 'express'
import { Server as Io } from 'socket.io'
import { Server, createServer } from 'http'

class App {
  public app: express.Application
  public server: Server
  private socketIo: Io

  private roomsName: string[] = []
  private rooms: Game[] = []

  constructor () {
    this.app = express()
    this.server = createServer(this.app)
    this.socketIo = new Io(this.server, {
      cors: {
        origin: '*'
      }
    })

    this.socketIo.on('connection', (socket) => {
      socket.emit('connection', 'conectado.')

      console.log(`${socket.id} foi conectado.`);
      
      socket.emit('rooms', this.roomsName)

      socket.on('create-room', (room: any) => {
        if (this.roomsName.includes(room)) 
          return socket.emit('create-room', {
            message: `sala com o nome ${room} já existe, tente criar outra com um nome diferente.`,
            status: false
          })
        
        socket.join(room)    
        socket.emit('create-room', {
          message: `${room} sala criada. `,
          status: true
        })

        console.log(`${room} sala criada. `)

        this.roomsName.push(room)
        this.rooms[room] = new Game(socket)

        this.socketIo.emit('rooms', this.roomsName)
      })

      socket.on('join-room', (room: any) => {
        if (!this.rooms[room].setPlayerTwo(socket))
          return socket.emit('join-room', false)

        socket.join(room)

        this.socketIo.to(room).emit('join-room', `${socket.id} entrou na sala.`)

        console.log(`${socket.id} entrou na sala ${room}.`)
      })

      socket.on('set-position', (room, position) => {
        let positionStatus: string
        
        positionStatus = this.rooms[room].setPosition(position, socket.id)

        const gameStatus = this.rooms[room].checkWinner()
        
        gameStatus
          ? socket.emit('set-position', positionStatus)
          : socket.emit('set-position', 'jogo finalizado.')
         
        this.socketIo.to(room).emit('game', {
          board: this.rooms[room].board,
          status: gameStatus ? 'jogo em andamento.' : gameStatus
        })
      })

      socket.on('reset-game', (room: any) => {
        let gameOver: number | boolean = this.rooms[room].checkGameOver()
        
        let newPlayerTwo = socket.id == this.rooms[room].playerTwo?.id
          ? this.rooms[room].playerOne
          : this.rooms[room].playerTwo

        if (gameOver) this.rooms[room] = new Game(socket, newPlayerTwo)

        this.socketIo.to(room).emit('game', {
          board: this.rooms[room].board,
          status:  !gameOver ? 'jogo em andamento, não pode ser resetado.' : 'jogo resetado.'
        })
      })

      socket.on('delete-room', (room) => {
        this.socketIo.to(room).emit('delete-room', `${room} sala finalizada.`)
        this.socketIo.socketsLeave(room)

        this.roomsName = this.roomsName.filter((value) => value !== room && value)
        this.socketIo.emit('rooms', this.roomsName)

        console.log(`${socket.id} finalizou sala ${room}.`)
      })
    })
  }
}

export default App