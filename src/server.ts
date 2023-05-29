import app from './app'

const port = process.env.PORT || 3333

app.listen(port, () =>
  console.log('Server listening on port/ http://127.0.1:3333', port),
)
