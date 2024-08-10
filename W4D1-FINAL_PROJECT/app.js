// ========== set global variable ==========
//Import library/module
const express = require("express");
const app = express();
const port = 3000;

const path = require("path");
const bcrypt = require("bcrypt");
const UserSession = require("express-session");
const flash = require("express-flash");
const upload = require("./middlewares/uploadFile");
// models =
const tb_project = require("./models").tb_project;
const User = require("./models").users;

// sequelize config
const config = require("./config/config.json");
// ORM (Object Relational Mapping), Teknik penyelarasan antara aplikasi dan database ataupun jembatan, penyederhanaan. pemetaan object ke struktur database
const { Sequelize, QueryTypes } = require("sequelize");
const sequelize = new Sequelize(config.development);

// app.set = setting variable global, configuration, dll
// use handlebars for template engine
app.set("view engine", "hbs");
app.set("views", "src/views");

// app.use = setting middleware
app.use("/assets", express.static(path.join(__dirname, "src/assets")));
app.use(express.urlencoded({ extended: false }));
// extended : false => querystring bawaan dari express
// extended : true = > menggunakan query strign third party => qs

app.use(express.json());
app.use(flash());

// middleware session
app.use(
  UserSession({
    name: "datasession",
    secret: "Key-Secret",
    resave: false,
    saveUninitialized: true,
    
    cookie: {
      httpOnly: true,
      secure: false, // https => http
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

app.post("/logout", logout);

app.get("/add_project", project);
app.post("/add_project", upload.single("image"), add_project);
app.post("/delete_project/:id", del_project);

app.get("/update_project/:id", update_projectView);
app.post("/update_project", upload.single("image"), update_project);

app.get("/detail_project/:id", detail_projectbyId);
app.get("/detail_project", detail_project);

app.get("/testimonial", testimonial);

// ========== SET Function ==========
async function home(req, res) {
  try {
    const query = "SELECT * FROM tb_projects ORDER BY id ASC ";
    const result = await sequelize.query(query, { type: QueryTypes.SELECT });
    
    console.log("ini data dari tb_projects :", result);

    res.render("index", {
      data: result,
      isLogin: req.session.isLogin,
      user: req.session.user,
    });
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
      console.log("user not register!");
      req.flash("danger", "login failed : Email/Password is wrong!");
      return res.redirect("/login");
    }
    bcrypt.compare(password, isResult[0].password, function (err, result) {
      if (!result) {
        console.log('Password Salah!')

        req.flash("danger", "password tidak benar");
        return res.redirect("/login");
      } else {
        console.log('Login Berhasil!')

        req.session.isLogin = true;
        req.session.user = isResult[0].name;
        req.flash("succes", "Login Berhasil Horee!!");
        return res.redirect("/");
      }
    });
  } catch (error) {
    throw error;
  }
}
function register(req, res) {
  res.render("register");
}
async function registerUser(req, res) {
  try {
    const { name, email, password } = req.body;

    console.log("Name:", name)
    console.log("Email:", email)
    console.log("Password:", password)

    const query = `SELECT * FROM users WHERE email='${email}'`;
    const isResult = await sequelize.query(query, { type: QueryTypes.SELECT });

    if (isResult.length) {
      req.flash(
        "danger",
        "register failed : email sudah pernah digunakan!");
      return res.redirect("/register");
    }

    const salt = 10;
    bcrypt.hash(password, salt, async (err, hashPassword) => {
      if (err) {
        console.log("Failed to encrypt Password!");
        req.flash(
          "danger",
          "Register failed : Password tidak bisa dienkripsi !"
        );
        return res.redirect("/register");
      } else {
        await sequelize.query(`INSERT INTO users 
              (name, email, password, "createdAt", "updatedAt") 
              VALUES ('${name}','${email}','${hashPassword}', NOW(), NOW())`);
        console.log("Hash result :", hashPassword);
        req.flash("success", "Register success!");
        return res.redirect("/");
      }
    });
  } catch (error) {
    console.log(error);
  }
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

    const image = req.file ? req.file.filename : null;
    const UserId = req.session.user.id
    const { 
      name,
      startDate,
      endDate,
      content,
    } = req.body
    const durationTime = getDurationTime(endDate, startDate);

    const newProject = await tb_project.create({
      name: name,
      start_date: startDate,
      end_date: endDate,
      description: content,
      tecnologies: [Technologies1, Technologies2, Technologies3, Technologies4].filter(Boolean), // Filter out any null values
      image: image,
      user_id: UserId,
      duration_time: durationTime,
      createdAt: new Date(),
      updatedAt: new Date()
    });

    // const query = `
    //     INSERT INTO tb_projects(name, start_date, end_date, description, tecnologies, image,"user_id",duration_time, "createdAt", "updatedAt") 
    //     VALUES ('${name}','${startDate}','${endDate}','${content}',
    //     ARRAY['${req.body.Technologies1}','${req.body.Technologies2}','${req.body.Technologies3}','${req.body.Technologies4}'],
    //     '${image}',${UserId},'${durationTime}',NOW(), NOW())`;
    
    //     const result = await sequelize.query(query, { type: QueryTypes.INSERT });

    console.log("Data berhasil ditambahkan :", newProject);
    req.flash("success", "Project added successfully!");
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


// Duration Time
function getDurationTime(endDate, startDate) {
  let durationTime = new Date(endDate) - new Date(startDate);

  let miliSecond = 1000;
  let secondInDay = 86400;
  let dayInMonth = 30;
  let monthInYear =12;

  let durationTimeInDay = Math.floor(durationTime / (miliSecond * secondInDay));
  let durationTimeInMonth = Math.floor(durationTime / (miliSecond * secondInDay * dayInMonth));
  let durationTimeInYear = Math.floor(durationTime / (miliSecond * secondInDay * dayInMonth * monthInYear));

  let restOfMonthInYear = Math.floor((durationTime%(miliSecond * secondInDay * dayInMonth * monthInYear)) / (miliSecond * secondInDay * dayInMonth))

  if (durationTimeInYear > 0 ) {
      if (restOfMonthInYear > 0) {
          return `${durationTimeInYear} tahun ${restOfMonthInYear} bulan`;
      } else {
          return `${durationTimeInYear} tahun`;
      }
  } else if (durationTimeInMonth > 0 ) {
      return `${durationTimeInMonth} bulan`;
  } else {
      return `${durationTimeInDay} hari`
  }
}
