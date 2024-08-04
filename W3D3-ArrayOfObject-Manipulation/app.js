const express = require('express')
const path = require('path')
const app = express()
const port = 3000

// set global variable
app.set("view engine", "hbs")
app.set("views", "src/views");

// akses file 
app.use("/assets",express.static(path.join(__dirname, 'src/assets')))


app.use(express.urlencoded({ extended: true}));
app.use(express.json());

app.get('/', home)
app.get('/contact', contact)

app.get('/login', login)
app.get('/register', register)

app.get('/add_project', project)
app.post('/add_project', add_project)
app.post('/delete_project/:id', del_project)

app.get('/update_project/:id', update_projectView)
app.post('/update_project', update_project)

app.get('/detail_project/:id', detail_project)

app.get('/testimonial', testimonial)

const data = []

function home(req, res) {
    // const data = [
    //     {
    //         title: "Title 1",
    //         content: "content 1"
            
    //     },
    //     {
    //         title: "Title 2",
    //         content: "content 2"
    //     }
    // ]
    res.render('index', {data})

}

function contact(req, res) {
    res.render('contact')
}
function login(req, res) {
    res.render('login')
}
function register(req, res) {
    res.render('register')
}

function project(req, res) {

    res.render('add_project')
}
function add_project(req, res) {
    const {title,content} = req.body

    console.log("Title :", title)
    console.log("Content :", content)

    const data_project = { title, content}
    data.unshift(data_project)

    res.redirect('/')
}

function del_project(req, res) {
    const { id } = req.params 
    data.splice(id, 1)
    
    res.redirect('/')
}
function update_projectView(req, res) {
    const { id } = req.params 

    const dataFilter = data[parseInt(id)]
    dataFilter.id = parseInt(id)
    console.log("dataFilter", dataFilter)
    res.render('update_project', { data: dataFilter })
}
function update_project(req, res) {
    const { id ,title, content, } = req.body

    console.log("Id :", id)
    console.log("Title :", title)
    console.log("Content :", content)

    data[parseInt(id)] = {
        title,
        content,
    }
    res.redirect('/')
}

function detail_project(req, res) {
    const { id } = req.params 

    const title = "Title 1"
    const content = "Content 1"

    const data = {
        id,
        title,
        content
    }
    res.render('detail_project',{data})
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