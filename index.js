//importacoes
//server web
const express = require('express');
//responsavel por renderizar templates
const nunjucks = require('nunjucks');

//instancia o servidor
const app = express();

//configurações do nunjucks - views é a pasta com os files html que serã renderizados
nunjucks.configure("views", {
    autoescape : true,
    //variavel do servidor
    express : app,
    //reinicia o servidor a cada alteração no code
    watch : true
})

//indicando para aplicação que será utilizado requições POST
app.use(express.urlencoded({extended : false}));

//declaração de uma lista
const users = ["Nome1", "Nome2", 'Nome3']

//setando configurações do express
//engine para renderizar templates: njk - equivalente ao jinja2 do django
app.set("view engine", "njk");

//view - method get - endpoint /
app.get("/", function (req,res){
    //renderiza um templante e passa um objeto como parametro
    return res.render('list',{users})
})

app.get('/new',function(req,res){
    return res.render('new')
})

//view post
app.post('/create',function(req,res){
    //formulario post acessível em req.body
    users.push(req.body.novo);
    //redireciona para determinada rota
    return res.redirect('/');
})




//inicia o servidor na porta passada
app.listen(3000);