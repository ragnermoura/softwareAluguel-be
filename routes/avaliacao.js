const express = require('express');
const router = express.Router();
const mysql = require('../mysql').pool;

router.get('/', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            'SELECT * FROM tb010_avaliacao',
            (error, result, fields) => {
                if (error) { return res.status(500).send({ error: error }) }
                const response = {
                    quantidade: result.length,
                    avaliacao: result.map(aval => {
                        return {
                            status: aval.status,
                            obs: aval.obs,
                            id_user: aval.id_user,
                            request: {
                                tipo: 'GET',
                                descricao: 'Retorna todos as avaliações',
                                url: 'http://localhost:3000/contrato/' + aval.id_avaliacao
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
            'INSERT INTO tb010_avaliacao (status, obs, id_user) VALUES (?,?,?)',
            [
                req.body.status,
                req.body.obs,
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
                    mensagem: 'Avaliação cadastrada com sucesso',
                    avaliacaoCriada: {
                        id_avaliacao: result.id_avaliacao,
                        status: req.body.status,
                        request: {
                            tipo: 'POST',
                            descricao: 'Insere uma nova avaliação',
                            url: 'http://localhost:3000/avaliacao'
                        }
                    }
                }
                return res.status(202).send(response);
            }
        )
    })

});

router.get('/:id_avaliacao', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            'SELECT * FROM tb010_avaliacao WHERE id_avaliacao = ?',
            [req.params.id_avaliacao],
            (error, result, fields) => {
                if (error) { return res.status(500).send({ error: error }) }

                if (result.length == 0) {
                    return res.status(404).send({
                        mensagem: 'Não foi encontrado uma avaliação com esse ID'
                    })
                }
                const response = {
                    avaiacao: {
                        id_avaliacao: result[0].id_avaliacao,
                        status: result[0].status,
                        request: {
                            tipo: 'GET',
                            descricao: 'Retorna um novo contrato',
                            url: 'http://localhost:3000/contrato'
                        }
                    }
                }
                return res.status(200).send(response)
            }
        )

    })
});

router.patch('/edit', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            `UPDATE tb010_avaliacao
            SET status = ?, 
            obs = ?,
            id_user = ?,
            WHERE id_avaliacao = ?`,
            [
                req.body.status,
                req.body.obs,
                req.body.chekin,
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
                    mensagem: 'Contrato atualizado com sucesso',
                    documentoCriado: {
                        id_doc: req.body.id_doc,
                        cpf: req.body.cpf,
                        request: {
                            tipo: 'PATCH',
                            descricao: 'Atualiza um contrato',
                            url: 'http://localhost:3000/contrato/' + req.body.id_avaliacao
                        }
                    }
                }
                res.status(201).send(response);
            }
        )
    })
});

router.delete('/delete', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error }) }
        conn.query(
            'DELETE FROM tb010_avaliacao WHERE id_avaliacao = ?',
            [
                req.body.id_avaliacao
            ],
            (error, result, field) => {
                conn.release();
                if (error) { return res.status(500).send({ error: error }) }
                const response = {
                    mensagem: 'Avaliação removida com sucesso',
                    request: {
                        tipo: 'POST',
                        desricao: 'Insere um contrato',
                        url: 'http://localhost:3000/avaliacao/'
                    }
                }
                return res.status(202).send(response);
            }
        )
    })
});

module.exports = router;