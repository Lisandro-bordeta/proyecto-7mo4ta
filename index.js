// index.js
import dotenv from 'dotenv'

dotenv.config()

const app = express()
const port = 3000

app.use(express.json())



app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`)
})
