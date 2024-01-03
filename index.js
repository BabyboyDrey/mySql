const express = require('express')
const mysql = require('mysql')

const app = express()

app.use(express.json())

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Abayomie84984',
  database: 'test'
})

app.get('/', (req, res) => {
  res.send('Home page')
})

app.get('/books', (req, res) => {
  const q = 'SELECT * FROM books'
  db.query(q, (err, data) => {
    if (err) return res.json(err)
    res.json(data)
  })
})

app.post('/books', (req, res) => {
  const q = 'INSERT INTO books (`title`, `desc`, `cover`) VALUES (?)'
  const values = [req.body.title, req.body.desc, req.body.cover]

  db.query(q, [values], (err, data) => {
    if (err) return res.json(err)
    return res.json('Book has been created successfully.')
  })
})

app.delete('/books/:id', (req, res) => {
  const bookId = req.params.id
  const q = 'DELETE FROM books WHERE id = ?'

  db.query(q, [bookId], (err, data) => {
    if (err) return res.json(err)
    return res.json('Book has been deleted successfully')
  })
})

app.put('/books/:id', (req, res) => {
  const bookId = req.params.id
  const q = 'UPDATE books SET `title` = ?, `desc` = ?, `cover` = ? WHERE id = ?'

  const values = [req.body.title, req.body.desc, req.body.cover]

  db.query(q, [...values, bookId], (err, data) => {
    if (err) return err
    return res.json('Book updated successfully')
  })
})

app.listen(5000, () => {
  console.log('Port listening on 5000')
})
