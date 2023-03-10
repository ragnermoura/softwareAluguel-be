const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors')

require('dotenv').config();

const rotaPlanos = require('./routes/planos')
const rotaUsuarios = require('./routes/usuarios')
const rotaNivel = require('./routes/nivel')
const rotaStatus = require('./routes/status')
const rotaImoveis = require('./routes/imoveis')
const rotaImagem = require('./routes/imagem')
const rotaDocInquilino = require('./routes/docsInquilino')
const rotaDocFiador = require('./routes/docsFiador')
const rotaContrato = require('./routes/contrato')
const rotaPagImovel = require('./routes/pagImovel')
const rotaAvaliacao = require('./routes/avaliacao')

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors())

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header("Access-Control-Allow-Credentials", "true")
    res.header(
        'Access-Control-Allow-Header',
        'Origin, X-Api-Key, X-Requested-With, Content-Type, Accept, Authorization'
    );

    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET, OPTIONS')
        return res.status(200).send({})
    }
    next();
})


app.use('/planos', rotaPlanos);
app.use('/usuarios', rotaUsuarios);
app.use('/nivel', rotaNivel);
app.use('/status', rotaStatus);
app.use('/imoveis', rotaImoveis);
app.use('/imagem', rotaImagem);
app.use('/docs-inquilinos', rotaDocInquilino);
app.use('/doc-fiador', rotaDocFiador);
app.use('/contrato', rotaContrato);
app.use('/pag-imovel', rotaPagImovel);
app.use('/avaliacao', rotaAvaliacao);

app.get('/api/security', (req,res) => {
    res.status(200).json({message: 'OK'})
})

app.use(express.static('public'))

app.use((req, res, next) => {
    const erro = new Error('Rota não encontrada');
    erro.status = 404;
    next(erro);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500)
    return res.send({
        erro: {
            mensagem: error.mensagem
        }
    })
});

module.exports = app;
