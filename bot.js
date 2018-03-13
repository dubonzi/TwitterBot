console.log("Bot iniciando..");

var Twit = require('twit');
var config = require('./config');
var fs = require('fs');
var T = new Twit(config);

/* Exemplo de stream com post */
/* Descomentar as linhas abaixo para habilitar o stream */
//var stream = T.stream('user');
//stream.on('follow', followed);

function followed(evento) {
    let nome = evento.source.name;
    let usuario = evento.source.screen_name;
    console.log(usuario + " está seguindo.");
    novoTweet('@' + usuario + ' obrigado pelo follow!');
}

function novoTweet(mensagem) {
    let status = {status: mensagem};
    T.post('statuses/update', status, (erro, data, response) => {
        if (erro) {
            console.error(erro);
        }
    });
}

/* Exemplo de get, salvando em arquivo, retorna o último tweet do bot */
var params = {
    screen_name: 'dubonzi_dev',
    count: 1
};

 T.get('statuses/user_timeline', params, function (err, data, response) {
    fs.writeFile("resultado.json", JSON.stringify(data), (erroGravacao) => {
        if (erroGravacao) console.error(erroGravacao);
    });
    console.log("Arquivo criado.");
}); 
