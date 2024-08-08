const express = require('express')
const path = require('path')
const app = express()
const port = 3000

const config = require('./config/config.json')
const { Sequelize, QueryTypes } = require("sequelize");
const sequelize = new Sequelize(config.development)
// ========== set global variable ==========
app.set('view engine', 'hbs')
app.set('views', 'src/views');

app.use("/assets",express.static(path.join(__dirname, 'src/assets')))
app.use(express.urlencoded({ extended: true}));
app.use(express.json());

const multer = require('multer')

const fileStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "src/uploads")
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})

const upload = multer({
  storage: fileStorage
})

// ========== Route ==========
app.get('/', home)
app.get('/contact', contact)

app.get('/login', login)
app.get('/register', register)

app.get('/add_project', project)
app.post('/add_project', upload.single("image_upload"),add_project)
app.post('/delete_project/:id', del_project)

app.get('/update_project/:id', update_projectView)
app.post('/update_project', update_project)

app.get('/detail_project/:id', detail_projectbyId)
app.get('/detail_project', detail_project)

app.get('/testimonial', testimonial)

// ========== SET Function ==========
async function home(req, res) {
    try {
        const query = 'SELECT * FROM tb_projects ORDER BY id ASC '
        const result = await sequelize.query(query, { type: QueryTypes.SELECT });
        console.log("ini data dari tb_projects :", result)
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
// ADD PROJECT
async function add_project(req, res) {
    try {

        console.log(req.body);

        
        // const image = "mufid.jpg"
        // const tecnologies = ""
        const query = `
        INSERT INTO tb_projects(name, start_date, end_date, description, tecnologies, image, "createdAt", "updatedAt") 
        VALUES ('${req.body.name}','${req.body.startDate}','${req.body.endDate}','${req.body.content}','${req.body.tecnologies}','${req.body.image}',NOW(), NOW())`
        const result = await sequelize.query(query, { type: QueryTypes.INSERT })
    
        console.log("Data berhasil ditambahkan :", result)
    
        res.redirect('/')
    } catch (error) {
        throw error
    }
}
// DELETE PROJECT
async function del_project(req, res) {
try {
    const id = req.params.id
    // bug: id tidak valid //parah
    const query = `
    DELETE FROM tb_projects 
    WHERE id=${id}`
    const result = await sequelize.query(query, { type: QueryTypes.DELETE })
    console.log("data berhasil dihapus :", result[0])
    res.redirect('/')
}catch (error) {
    throw (error)
}
}

async function update_projectView(req, res) {
    const { id } = req.params
    const query = `SELECT * FROM tb_projects WHERE id=${id}`;
    
    const project = await sequelize.query(query, {type: QueryTypes.SELECT});

    console.log("ini update project",project);

    res.render('update_project', { data: project[0] })
}
// update project
async function update_project(req, res) {
    try {
        const {id} = req.params
        console.log(id);
        const query = `
        UPDATE tb_projects 
        SET  name = '${req.body.name}' start_date = '${req.body.startDate}', end_date = '${req.body.endDate}', description = '${req.body.content}', tecnologies= '${req.body.tecnologies}', image = '${req.body.image}'
        WHERE
        id=${id}`;
        const result = await db.query(query, { type: QueryTypes.UPDATE })
        console.log("data berhasil diupdate :", result)
    
        res.redirect('/')
    } catch (error) {
        throw(error)
    }
}

async function detail_projectbyId(req, res) {
    const { id } = req.params 

    const query = `SELECT * FROM tb_projects WHERE id=${id}`;
    const result = await sequelize.query(query, { type: QueryTypes.SELECT});

    console.log("ini dari detail project",result);
    res.render('detail_project', { data: result[0] })
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

