const express = require('express')
const app = express()
const port = 3000

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Send a GET request to http://localhost:3000/first-task with the following header: Content-Type: application/json')
})

app.get('/first-task', (req, res) => {
  var contentType = req.header('Content-Type');

  if(contentType === 'application/json') {
    res.send({
      message: "Excellent work, your next task is...",
      nextTask: "Send a POST request to http://localhost:3000/second-task with the following headers: Accept-Language: en-GB; Cache-Control: no-cache; Content-Type: text/plain"
    })
  }
  else {
    res.send('Oops, something went wrong! Did you send the correct Content-Type header?')
  }
})

app.post('/second-task', (req, res) => {
  var contentType = req.header('Content-Type');
  var acceptLanguage = req.header('Accept-Language');
  var cacheControl = req.header('Cache-Control');

  if(contentType === 'text/plain' && acceptLanguage === 'en-GB' && cacheControl === 'no-cache') {
    res.send('Well done! You are doing well. In addition to conventional headers, we can also declare our own custom headers. For your next task, send a DELETE request to http://localhost:3000/third-task with a Custom-Header header (and set it to any value you\'d like e.g. Custom-Header: Hello, World!)')
  }
  else {
    res.send('Oops, something went wrong! Did you send the correct Accept-Language, Cache-Control, and Content-Type headers?')
  }
})

app.delete('/third-task', (req, res) => {
  var customHeader = req.header('Custom-Header')

  if(customHeader !== undefined) {
    res.send(`Your custom header is: ${customHeader}. Good work! For your penultimate task, send a PUT request to http://localhost:3000/fourth-task`)
  }
  res.send("Oops, something went wrong! Did you send a Custom-Header?")
})

app.put('/fourth-task', (req, res) => {
  res.send('Well done! Your final task is to send a 😂 emoji in the group chat.')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
