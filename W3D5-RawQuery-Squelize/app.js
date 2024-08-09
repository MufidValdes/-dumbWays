// ========== set global variable ==========
const express = require("express");
const app = express();
const port = 3000;

const path = require("path");
const User = require("./models").user;
const bcrypt = require("bcrypt");
const session = require("express-session");
const flash = require("express-flash");
const upload = require("./middlewares/uploadFile");

const config = require("./config/config.json");
const { Sequelize, QueryTypes } = require("sequelize");
// ORM (Object Relational Mapping), Teknik penyelarasan antara aplikasi dan database ataupun jembatan, penyederhanaan. pemetaan object ke struktur database
const sequelize = new Sequelize(config.development);

// app.set = setting variable global, configuration, dll
app.set("view engine", "hbs");
app.set("views", "src/views");

// app.use = setting middleware
app.use("/assets", express.static(path.join(__dirname, "src/assets")));
app.use(express.urlencoded({ extended: true }));
// extended : false => querystring bawaan dari express
// extended : true = > menggunakan query strign third party => qs

app.use(express.json());

app.use(
  session({
    name: "mysession",
    secret: "secretKey",
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: false,
      maxAge: 1000 * 60 * 60 * 24, // 1 hari
    },
  })
);

app.use(flash());
// ========== Route ==========
app.get("/", home);
app.get("/contact", contact);

app.get("/login", login);
app.post("/login", loginbyEmail);

app.get("/register", register);
app.post("/register", registerUser);

app.get("/add_project", project);
app.post("/add_project", upload.single("image_upload"), add_project);
app.post("/delete_project/:id", del_project);

app.get("/update_project/:id", update_projectView);
app.post("/update_project", update_project);

app.get("/detail_project/:id", detail_projectbyId);
app.get("/detail_project", detail_project);

app.get("/testimonial", testimonial);

// ========== SET Function ==========
async function home(req, res) {
    try {
        const query = "SELECT * FROM tb_projects ORDER BY id ASC ";
        const result = await sequelize.query(query, { type: QueryTypes.SELECT });
        console.log("ini data dari tb_projects :", result);
        res.render("index", { data: result });
    } catch (error) {
        throw error;
    }
}

function contact(req, res) {
    res.render("contact");
}

// ========== Login & Register ==========
// # AUTHENTICATION => AUTHORIZATION
// - proses verifikasi pengguna
// # ENCRYPTION
// - digunakan untuk password, untuk keamanan apabila dbms di bobol
// # SESSION
// - waktu di mulai website ketika user akses website

function login(req, res) {
    res.render("login");
}
async function loginbyEmail(req, res) {
    try {
        const { email, password } = req.body;
        const query = `SELECT * FROM users WHERE email='${email}'`;
        const isResult = await sequelize.query(query, { type: QueryTypes.SELECT });
        
        if (!isResult.length) {
            req.flash("danger", "Email Nyasar!");
            return res.redirect("/login");
        }
        bcrypt.compare(password, isResult[0].password, function (err, result) {
            if (!result) {
                req.flash("danger", "password tidak benar");
                return res.redirect("/login");
            } else {
                req.session.isLogin = true;
                req.session.user = isResult[0].name;
                req.flash("succes", "Login Berhasil Horee!!");
                return res.redirect("/");
            }
        });
    
  } catch (error) {
    throw (error);
  }
}
function register(req, res) {
  res.render("register");
}
async function registerUser(req, res) {
  const { name, email, password } = req.body;

  const salt = 10;
  bcrypt.hash(password, salt, async function (err,hashPassword) {
    if (err) {
        res.redirect("/register")
    } else {
        await sequelize.query
        (`INSERT INTO users 
            (name, email, password, "createdAt", "updatedAt") 
            VALUES ('${name}','${email}','${hashPassword}', NOW(), NOW())`
        );
        res.redirect("/");            
    }
  });
}

// Logout
async function logout(req, res) {
  req.session.destroy(function (err) {
    if (err) return console.error("Logout failed!");

    console.log("Logout success!");
    res.redirect("/");
  });
}

// ========== MyProject & Register ==========
function project(req, res) {
  res.render("add_project");
}
// ADD PROJECT
async function add_project(req, res) {
  try {
    console.log(req.body);

    // const image = "mufid.jpg"
    // const tecnologies = ""
    const query = `
        INSERT INTO tb_projects(name, start_date, end_date, description, tecnologies, image, "createdAt", "updatedAt") 
        VALUES ('${req.body.name}','${req.body.startDate}','${req.body.endDate}','${req.body.content}','${req.body.tecnologies}','${req.body.image}',NOW(), NOW())`;
    const result = await sequelize.query(query, { type: QueryTypes.INSERT });

    console.log("Data berhasil ditambahkan :", result);

    res.redirect("/");
  } catch (error) {
    throw error;
  }
}
// DELETE PROJECT
async function del_project(req, res) {
  try {
    const id = req.params.id;

    const query = `
    DELETE FROM tb_projects 
    WHERE id=${id}`;
    const result = await sequelize.query(query, { type: QueryTypes.DELETE });
    console.log("data berhasil dihapus :", result[0]);
    res.redirect("/");
  } catch (error) {
    throw error;
  }
}

async function update_projectView(req, res) {
  const { id } = req.params;
  const query = `SELECT * FROM tb_projects WHERE id=${id}`;

  const project = await sequelize.query(query, { type: QueryTypes.SELECT });

  console.log("ini update project", project);

  res.render("update_project", { data: project[0] });
}
// update project
async function update_project(req, res) {
  try {
    const { id } = req.params;
    console.log(id);
    const query = `
        UPDATE tb_projects 
        SET  name = '${req.body.name}' start_date = '${req.body.startDate}', end_date = '${req.body.endDate}', description = '${req.body.content}', tecnologies= '${req.body.tecnologies}', image = '${req.body.image}'
        WHERE
        id=${id}`;
    const result = await db.query(query, { type: QueryTypes.UPDATE });
    console.log("data berhasil diupdate :", result);

    res.redirect("/");
  } catch (error) {
    throw error;
  }
}

async function detail_projectbyId(req, res) {
  const { id } = req.params;

  const query = `SELECT * FROM tb_projects WHERE id=${id}`;
  const result = await sequelize.query(query, { type: QueryTypes.SELECT });

  console.log("ini dari detail project", result);
  res.render("detail_project", { data: result[0] });
}

function detail_project(req, res) {
  res.redirect("/");
}
function testimonial(req, res) {
  res.render("testimonial");
}

app.listen(port, () => {
  console.log(`Server berjalan di port ${port}`);
});
