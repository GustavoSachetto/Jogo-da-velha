import App from "./app"

const app = new App()
const port = 3001

app.server.listen(port, () => {
  console.log('servidor rodando...')
})