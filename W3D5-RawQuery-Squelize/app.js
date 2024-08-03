const express = require('express')
const path = require('path')
const app = express()
const port = 3000

const db = require("./src/lib/dbConfig")
const { QueryTypes } = require("sequelize");

// set global variable
app.set('view engine', 'hbs')
app.set('views', 'src/views');

// akses file 
app.use("/assets",express.static(path.join(__dirname, 'src/assets')))


app.use(express.urlencoded({ extended: true}));
app.use(express.json());

app.get('/', home)
app.get('/contact', contact)
app.get('/myproject', myproject)
app.get('/detail', detail)
app.get('/testimonial', testimonial)

const data = [{}]

function home(req, res) {
    res.render('index')
}

function contact(req, res) {
    res.render('contact')
}

async function myproject(req, res) {
    const query = 'SELECT * FROM myproject'
    const obj = await db.query(query, {type:QueryTypes.SELECT})
    res.render('myproject', { data:obj })
}

function detail(req, res) {
    res.render('detail')
}

function testimonial(req, res) {
    res.render('testimonial')
}


app.listen(port, () => {
  console.log(`Server berjalan di port ${port}`)
})

// ==============================
// // Basic routing
// ==============================
// app.get('/', (req, res) => {
//     res.send('Hello World!')
//   })
//   app.post('/', (req, res) => {
//     res.send('Got a POST request')
//   })
//   app.put('/user', (req, res) => {
//     res.send('Got a PUT request at /user')
//   })
//   app.delete('/user', (req, res) => {
//     res.send('Got a DELETE request at /user')
//   })