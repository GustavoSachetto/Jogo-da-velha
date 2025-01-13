import { Socket } from 'socket.io'

class Game {
  public playerOne: Socket
  public playerTwo: Socket | undefined
  public nextPlayer: number = 1
  
  public board: number[][] = [
    [0,0,0],
    [0,0,0],
    [0,0,0]
  ]

  constructor (playerOne: Socket, playerTwo?: Socket) {
    this.playerOne = playerOne
    this.playerTwo = playerTwo
  }

  public setPlayerTwo(playerTwo: Socket): boolean {
    if (this.playerTwo != undefined)
      return false

    this.playerTwo = playerTwo

    return true
  }

  public setPosition(position: number, socketId: string): string {
    const gameOver = this.checkGameOver()
    const isNotYourTurn = this.checkNextPlayer(socketId)
    
    if (gameOver) return 'o jogo acabou, não é possivel preencher posições.'
    if (isNotYourTurn) return isNotYourTurn
    
    const { row, column } = this.processPosition(position)
    const positionIsChecked = this.checkPositionChecked(row, column)
 
    if (positionIsChecked) return positionIsChecked
      
    this.board[row][column] = this.nextPlayer
    this.nextPlayer = this.nextPlayer === 1 ? 2 : 1
    
    return 'posição preenchida.'
  }

  public checkWinner(): string | false {
    let gameResult: number | boolean = this.checkGameOver()

    if (gameResult === 1) {
      this.playerOne.emit('winner', 'parabéns você ganhou.')
      this.playerTwo?.emit('winner', 'não foi dessa vez, você perdeu.')

      return `vitória do jogador ${this.playerOne.id}`
    }
    
    if (gameResult === 2) {
      this.playerOne.emit('winner', 'não foi dessa vez, você perdeu.')
      this.playerTwo?.emit('winner', 'parabéns você ganhou.')

      return `vitória do jogador ${this.playerTwo?.id}`
    }

    if (gameResult === 3) {
      this.playerOne.emit('winner', 'deu velha, nenhum jogador ganhou.')
      this.playerTwo?.emit('winner', 'deu velha, nenhum jogador ganhou.')

      return 'deu velha, nenhum jogador ganhou.'
    }

    return false
  }

  public checkGameOver(): number | boolean {
    let gameResult: number = this.processWinner()

    if (gameResult != 0) return gameResult

    // verifica se há posições não preenchidas
    for (let index = 0; index < this.board.length; index++) {
      const position = this.board[index]

      if (position[0] == 0 || position[1] == 0 || position[2] == 0) 
        return false
    }

    return 3
  }

  private checkNextPlayer(socketId: string): string | void {
    const idNextPlayer = this.nextPlayer === 1 ? this.playerOne.id : this.playerTwo?.id

    if (socketId != idNextPlayer)
      return 'não está na sua vez de jogar, aguarde até que seja o próximo jogador.'
  }

  private checkPositionChecked(row: number, column: number): string | void {
    if (this.board[row][column] != 0) 
      return 'posição já havia sido preenchida, preencha outra.'
  }

  private processWinner(): number {
    for (let index = 0; index < 3; index++) {
      // verifica vitória na vertical
      if (this.board[index][0] == this.board[index][1] && this.board[index][1] == this.board[index][2]) 
        return this.board[index][0]
      
      // verifica vitória na horizontal
      if (this.board[0][index] == this.board[1][index] && this.board[1][index] == this.board[2][index]) 
        return this.board[0][index]
    }

    // verifica se o meio não foi preenchido
    if (this.board[1][1] == 0) return 0

    // verifica as duas diagonais
    if (this.board[0][0] == this.board[1][1] && this.board[1][1] == this.board[2][2]) 
      return this.board[1][1]

    if (this.board[0][2] == this.board[1][1] && this.board[1][1] == this.board[2][0]) 
      return this.board[1][1]

    return 0
  }

  private processPosition(position: number): { row: number, column: number } {
    const row =  Math.trunc(position / 3)
    const column = position % 3
    
    return { row, column }
  }
}

export default Game