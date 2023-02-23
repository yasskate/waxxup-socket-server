import app from './src/app'
import { createServer } from 'http'
import { Server } from 'socket.io'

const PORT = 4000
const httpServer = createServer(app)

const io = new Server(httpServer, {
  cors: {
    origin: `http://localhost:${PORT}`
  }
})

app.get('/', (req, res) => (
  res.json({ message: 'Hello Socket server!' }))
)

io.on('connection', socket => {
  console.log(`⚡: ${socket.id} user just connected!`);

  socket.on('disconnect', () => {
    console.log('🔥: A user disconnected')
  })
})

httpServer.listen(PORT, () => {
  console.log(`Server listening on port http://localhost:${PORT}`)
})

