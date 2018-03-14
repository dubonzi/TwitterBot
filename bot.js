console.log("Bot iniciando..");

var Twit = require('twit');
var config = require('./config');
var fs = require('fs');
var T = new Twit(config);

/* Exemplo de stream com post */
/* Descomentar as linhas abaixo para habilitar o stream */
var stream = T.stream('user');
stream.on('tweet', eventoTweet);

function eventoTweet(evento) {
  let mensagem = evento.text;
  let remetente = evento.user.screen_name;
  let usuariosCitacao = evento.entities.user_mentions;
  let idMensagem = evento.id_str;
  usuariosCitacao.forEach(usuario => {
    if (usuario.screen_name === 'dubonzi_dev') {
      console.log('@' + remetente + " falou comigo!");
      novoTweet("Olá @" + remetente + " , obrigado pela sua mensagem de id " + idMensagem);
    }
  });
}

function novoTweet(mensagem) {
  let status = {
    status: mensagem
  };
  T.post('statuses/update', status, (erro, data, response) => {
    if (erro) {
      console.error(erro);
    } else {
      console.log("Mensagem enviada.");
    }
  });
}

/* Exemplo de get, salvando em arquivo, retorna o último tweet do bot */
/* var params = {
  screen_name: 'dubonzi_dev',
  count: 1
};

T.get('statuses/user_timeline', params, function (err, data, response) {
  fs.writeFile("ArquivosGerados/resultado.json", JSON.stringify(data), erroGravacaoArquivo);
  console.log("Arquivo criado.");
}); */

function erroGravacaoArquivo(erro) {
  if (erro) console.error(erro);
}