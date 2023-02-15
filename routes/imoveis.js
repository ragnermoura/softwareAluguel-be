const express = require('express');
const router = express.Router();
const mysql = require('../mysql').pool;

router.get('/', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            'SELECT * FROM tb003_imovel',
            (error, result, fields) => {
                if (error) { return res.status(500).send({ error: error }) }
                const response = {
                    quantidade: result.length,
                    imoveis: result.map(imov => {
                        return {
                            id_imovel: imov.id_imovel,
                            nome: imov.nome,
                            descricao: imov.descricao,
                            tipo: imov.tipo,
                            valor: imov.valor,
                            quartos: imov.quartos,
                            garagem: imov.garagem,
                            andar: imov.andar,
                            area: imov.area,
                            cozinha: imov.cozinha,
                            varanda: imov.varanda,
                            metros: imov.metros,
                            casal: imov.casal,
                            habitantes: imov.habitantes,
                            crianca: imov.crianca,
                            lazer: imov.lazer,
                            piscina: imov.piscina,
                            churrasqueira: imov.churrasqueira,
                            foto: imov.fotos,
                            id_user: imov.id_user,
                            request: {
                                tipo: 'GET',
                                descricao: 'Retorna todos os Imóveis',
                                url: 'http://localhost:3000/imoveis/' + imov.id_imovel
                            }
                        }
                    })

                }

                return res.status(200).send(response)
            }
        )

    })
});

router.post('/cadastro', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            'INSERT INTO tb003_imovel (nome, descricao, tipo, valor, quartos, garagem, andar, area_total, cozinha, varanda, metros_quadrados, banheiro, casal, habitantes, crianca, lazer, piscina, churrasqueira, cep, endereco, numero, estado, id_user ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
            [
                req.body.nome,
                req.body.descricao,
                req.body.tipo,
                req.body.valor,
                req.body.quartos,
                req.body.garagem,
                req.body.andar,
                req.body.area_total,
                req.body.cep,
                req.body.endereco,
                req.body.numero,
                req.body.estado,
                req.body.cozinha,
                req.body.varanda,
                req.body.metros_quadrados,
                req.body.banheiro,
                req.body.casal,
                req.body.habitantes,
                req.body.crianca,
                req.body.lazer,
                req.body.piscina,
                req.body.churrasqueira,
                req.body.fotos,
                req.body.id_user,
            ],
            (error, result, field) => {
                conn.release();
                if (error) {
                    return res.status(500).send({
                        error: error,
                        response: null
                    });
                }

                const response = {
                    mensagem: 'Imóvel cadastrado com sucesso',
                    imovelCriado: {
                        id_imovel: result.id_imovel,
                        nome: req.body.nome,
                        descricao: req.body.descricao,
                        request: {
                            tipo: 'POST',
                            descricao: 'Insere um novo planos',
                            url: 'http://localhost:3000/imoveis'
                        }
                    }
                }
                return res.status(202).send(response);
            }
        )
    })

});

router.get('/:id_imovel', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            'SELECT * FROM tb003_imovel WHERE id_imovel = ?',
            [req.params.id_user],
            (error, result, fields) => {
                if (error) { return res.status(500).send({ error: error }) }

                if (result.length == 0) {
                    return res.status(404).send({
                        mensagem: 'Não foi encontrado um imóvel com esse ID'
                    })
                }
                const response = {
                    plano: {
                        id_imovel: result[0].id_imovel,
                        nome: result[0].nome,
                        descricao: result[0].descricao,
                        request: {
                            tipo: 'GET',
                            descricao: 'Retorna um novo planos',
                            url: 'http://localhost:3000/planos'
                        }
                    }
                }
                return res.status(200).send(response)
            }
        )

    })
});

router.patch('/', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            `UPDATE tb003_imovel
            SET nome = ?, 
            descricao = ?,
            tipo = ?,
            valor = ?,
            quartos = ?,
            garagem = ?,
            andar = ?,
            area_total = ?,
            cozinha = ?,
            varanda = ?,
            metros_quadrados = ?,
            banheiro = ?,
            casal = ?,
            habitantes = ?,
            crianca = ?,
            lazer = ?,
            piscina = ?,
            churrasqueira = ?,
            fotos_casa = ?,
            id_user = ?,
            WHERE id_imovel = ?`,
            [
                req.body.nome,
                req.body.descricao,
                req.body.tipo,
                req.body.valor,
                req.body.quartos,
                req.body.garagem,
                req.body.andar,
                req.body.area_total,
                req.body.cozinha,
                req.body.varanda,
                req.body.metros_quadrados,
                req.body.banheiro,
                req.body.casal,
                req.body.habitantes,
                req.body.crianca,
                req.body.lazer,
                req.body.piscina,
                req.body.churrasqueira,
                req.body.fotos,
                req.body.id_user,
            ],
            (error, result, field) => {
                conn.release();
                if (error) {
                    return res.status(500).send({
                        error: error,
                    });
                }
                const response = {
                    mensagem: 'Imóvel atualizado com sucesso',
                    planoCriado: {
                        id_imovel: req.body.id_imovel,
                        nome: req.body.nome,
                        descricao: req.body.descricao,
                        request: {
                            tipo: 'PATCH',
                            descricao: 'Atualiza um Imóvel',
                            url: 'http://localhost:3000/imoveis/' + req.body.id_imovel
                        }
                    }
                }
                res.status(201).send(response);
            }
        )
    })
});

router.delete('/', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error }) }
        conn.query(
            'DELETE FROM tb003_imovel WHERE id_imovel = ?',
            [
                req.body.id_imovel
            ],
            (error, result, field) => {
                conn.release();
                if (error) { return res.status(500).send({ error: error }) }
                const response = {
                    mensagem: 'Imóvel removido com sucesso',
                    request: {
                        tipo: 'POST',
                        desricao: 'Insere um imóvel',
                        url: 'http://localhost:3000/imoveis/'
                    }
                }
                return res.status(202).send(response);
            }
        )
    })
});

module.exports = router;