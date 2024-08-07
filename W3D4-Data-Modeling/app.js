const express = require('express')
const path = require('path')
const app = express()
const port = 3000

const db = require("./config/dbConnect");
const { QueryTypes } = require("sequelize");

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

app.get('/detail_project/:id', detail_projectbyId)
app.get('/detail_project', detail_project)

app.get('/testimonial', testimonial)

// const data = []

async function home(req, res) {
    try {
        const query = 'SELECT * FROM myProjects'
        const result = await db.query(query, { type: QueryTypes.SELECT });
        res.render('index', {data: result})
        
    } catch (error) {
        throw error
    }

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
async function add_project(req, res) {
    try {
        const {title,content} = req.body
        const query = `
        INSERT INTO myprojects(title,content) 
        VALUES ('${title}','${content}')`
        const result = await db.query(query, { type: QueryTypes.INSERT })
    
        console.log("Data berhasil ditambahkan :", result)
    
        res.redirect('/')
    } catch (error) {
        throw error
    }
}

async function del_project(req, res) {
try {
    const { id } = req.params
    // bug: id tidak valid
    const query = `
    DELETE FROM myprojects 
    WHERE id=${id}`
    const result = await db.query(query, { type: QueryTypes.DELETE })
    console.log("data berhasil dihapus :", result)
    res.redirect('/')
}catch (error) {
    throw (error)
}
}
function update_projectView(req, res) {
    const { id } = req.params
    
    const dataFilter = data[parseInt(id)]
    dataFilter.id = parseInt(id)
    console.log("dataFilter", dataFilter)
    res.render('update_project', { data: dataFilter })
}
async function update_project(req, res) {
    try {
        const { id ,title, content, } = req.body

        const query = `
        UPDATE myprojects 
        SET title ='${title}', content = '${content}'
        WHERE
        id=${id}`;
        const result = await db.query(query, { type: QueryTypes.UPDATE })
        console.log("data berhasil diupdate :", result)
    
        res.redirect('/')
    } catch (error) {
        throw(error)
    }
}

function detail_projectbyId(req, res) {
    const { id } = req.params 

    const dataFilter = data[parseInt(id)]
    dataFilter.id = parseInt(id)
    console.log("dataFilter", dataFilter)
    res.render('detail_project', { data: dataFilter })
}

function detail_project(req, res) {
    res.redirect('/')
}
function testimonial(req, res) {
    res.render('testimonial')
}


app.listen(port, () => {
  console.log(`Server berjalan di port ${port}`)
})

