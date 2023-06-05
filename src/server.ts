import app from './app'
import connection from './database'

const port = process.env.PORT || 3333

connection.then(() => {
  app.listen(port, () =>
    console.log(`Server listening on port/ http://127.0.1:${port}`),
  )
  console.log('BD conenction')
})
