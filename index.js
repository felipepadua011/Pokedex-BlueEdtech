const express = require('express');
const app = express();
const porta = process.env.PORT || 3000;
const path = require("path");

let listaprincipal = [
    {
    imagem: "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/009.png",    
    numero: 01,
    nome: "Blastoise",
    tipo: "Water",
    altura: "1.6 m",
    peso: "85.5 kg",
    descricao: "It crushes its foe under its heavy body to cause fainting. In a pinch, it will withdraw inside its shell.",
    categoria: "Shellfish",
    habilidades: "Torrent"
  }];

app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "public")));

app.use(express.urlencoded());

let message = "";

app.get("/", (req, res) => {

    res.render("index", {
        message,
        listaprincipal,
    });

});

app.post("/", function (req, res) {
})

app.get("/detalhes", function (req, res) {
    res.render("detalhes", { det: "Cadastro dos Pokemons" });
});

app.get("/detalhes/:id", (req, res) => {
  const id = req.params.id
  const pokedex = listaprincipal[id]
  res.render("detalhes.ejs", { pokedex })
});

app.get("/new", function (req, res) {
    res.render("cadastro", { det: "Cadastro dos Pokemons" });
});

app.get("/new" , function (req, res) {
    const { imagem, numero, nome, tipo, altura, peso, descricao, categoria, habilidades } = req.body;
    const site = { imagem:imagem, nome: nome, tipo: tipo, altura: altura, peso: peso, descricao: descricao, categoria: categoria, habilidades: habilidades };
    res.render("resultado", site);
    res.render("/")
})


app.get("/recebepokemon" , function (req, res) {
    const {nome, tipo} = req.query;
    res.send({nome: nome, tipo: tipo});
})

// app.post("/detalhes/:id", function (req, res) {
//     const id = req.params.id;
//     const pokedex = listaprincipal[id];
//     res.render("detalhes", {pokedex})
// })

app.post("/recebepokemon" , function (req, res) {
    const { imagem, numero, nome, tipo, altura, peso, descricao, categoria, habilidades, } = req.body;
    
    let novopokemon = { imagem: imagem,
        numero: numero, 
        nome: nome, 
        tipo: tipo, 
        altura: altura, 
        peso: peso, 
        descricao: descricao, 
        categoria: categoria, 
        habilidades: habilidades
    }

    listaprincipal.push(novopokemon)

    message = `Perfeito, pokemon cadastrado com sucesso.`;

    setTimeout(() => {
        message = ""
    }, 5000);

    res.redirect("/");
})



app.listen(porta, () => console.log(`Servidor rodando em http://localhost:${porta}`));
