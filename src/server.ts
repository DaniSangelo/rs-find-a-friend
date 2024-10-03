import { app } from './app'
import 'dotenv/config'

app
  .listen({
    port: Number(process.env.PORT) || 3333,
    host: '0.0.0.0',
  })
  .then(() => console.info(`Server running on port ${process.env.PORT}`))
  .catch(() => console.error('Error when running server'))
