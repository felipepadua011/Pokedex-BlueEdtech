const express = require('express');
const app = express();
const porta = process.env.PORT || 3000;
const path = require("path");

let listaprincipal = [];
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
    res.render("detalhes", { det: "cadastro dos Pokemons" });
});

app.get("/cadastro", function (req, res) {
    res.render("cadastro", { det: "cadastro dos Pokemons" });
});

app.post("/cadastro" , function (req, res) {
    const { imagem, numero, nome, tipo, altura, peso, genero, categoria, habilidades, modelo, fraquezas } = req.body;
    const site = { imagem:imagem, nome: nome, tipo: tipo, altura: altura, peso: peso, genero: genero, categoria: categoria, habilidades: habilidades,  modelo: modelo, fraquezas: fraquezas };
    res.render("resultado", site);
})

app.get("/recebepokemon" , function (req, res) {
    const {nome, tipo} = req.query;
    res.send({nome: nome, tipo: tipo});
})

app.post("/recebepokemon" , function (req, res) {
    const { imagem, numero, nome, tipo, altura, peso, genero, categoria, habilidades, modelo, fraquezas } = req.body;
    
    let novopokemon = { imagem: imagem,
        numero: numero, 
        nome: nome, 
        tipo: tipo, 
        altura: altura, 
        peso: peso, 
        genero: genero, 
        categoria: categoria, 
        habilidades: habilidades, 
        modelo: modelo, 
        fraquezas: fraquezas
    }

    listaprincipal.push(novopokemon)

    

    message = `Perfeito, pokemon cadastrado com sucesso.`;

    

    setTimeout(() => {
        message = ""
    }, 2000);

    res.redirect("/");
})

app.listen(porta, () => console.log(`Servidor rodando em http://localhost:${porta}`));
