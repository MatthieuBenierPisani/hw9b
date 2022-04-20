const express = require("express");
const multer = require("multer");
const bodyParser = require("body-parser");

const app = express();
const upload = multer();
const jsonParser = bodyParser.json();

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(express.static("public"));
app.use(express.static("css"));

const articles = [
  { id: 1, title: "First article", content: "Hello World!" },
  {
    id: 2,
    title: "Lorem ipsum",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut hendrerit mauris ac porttitor accumsan. Nunc vitae pulvinar odio, auctor interdum dolor. Aenean sodales dui quis metus iaculis, hendrerit vulputate lorem vestibulum."
  },
  {
    id: 3,
    title: "Lorem ipsum in French",
    content:
      "J’en dis autant de ceux qui, par mollesse d’esprit, c’est-à-dire par la crainte de la peine et de la douleur, manquent aux devoirs de la vie. Et il est très facile de rendre raison de ce que j’avance."
  }
];

app.get("/", (request, response) => {
    response.sendFile(`${__dirname}/index.html`);
});

app.get("/ex1", (request, response) => {
  response.sendFile(`${__dirname}/views/ex1.html`);
});

app.get("/api/countries", (request, response) => {
  response.sendFile(`${__dirname}/views/ex2.html`);
});

app.get("/articles", (request, response) => {
  response.sendFile(`${__dirname}/views/ex3.html`);
});

app.post("/ex1", upload.array(), (request, response) => {
  const name = request.body.name;
  const email = request.body.email;
  response.send(`${name}, thank you for your order. We will keep you posted on
  delivery status at ${email}.`);
});

app.post("/api/countries", jsonParser, (request, response) => {
  const name = request.body.name
  const countries = request.body.countries
  response.send(`Your name is ${name} and you visited ${countries.length} countries. Keep traveling !`)
})

app.post("/articles", upload.array(), (request, response) => {
  const title = request.body.title;
  const content = request.body.content;
  const idList = articles.map(article => article.id);
  const maxId = idList.reduce((acc, value) => {
    if (value > acc) return value;
    return acc;
  });
  const id = maxId + 1;
  articles.push({ id, title, content });
  response.send(`New article added successfully with ID ${id}!`);
});

const listener = app.listen(process.env.PORT || 3000, () => {
    console.log(`Your app is listening on port ${listener.address().port}`);
});