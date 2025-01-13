export interface Game {
  board: number[][],
  status: string,
}

export interface CreateRoom {
  message: string,
  status: boolean,
}