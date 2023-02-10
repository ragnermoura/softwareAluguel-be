const express = require('express');
const router = express.Router();
const mysql = require('../mysql').pool;

router.get('/', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            'SELECT * FROM tb009_plataforma',
            (error, result, fields) => {
                if (error) { return res.status(500).send({ error: error }) }
                const response = {
                    quantidade: result.length,
                    planos: result.map(plan => {
                        return {
                            id_plano: plan.id_plano,
                            plano: plan.nome_plano,
                            valor: plan.valor_plano,
                            request: {
                                tipo: 'GET',
                                descricao: 'Retorna todos os planos',
                                url: 'http://localhost:3000/planos/' + plan.id_plano
                            }
                        }
                    })

                }

                return res.status(200).send(response)
            }
        )

    })
});

router.post('/', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            'INSERT INTO tb009_plataforma (nome_plano, valor_plano) VALUES (?,?)',
            [
                req.body.plano,
                req.body.valor,
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
                    mensagem: 'Plano cadastrado com sucesso',
                    planoCriado: {
                        id_plano: result.id_plano,
                        plano: req.body.plano,
                        valor: req.body.valor,
                        request: {
                            tipo: 'POST',
                            descricao: 'Insere um novo planos',
                            url: 'http://localhost:3000/planos'
                        }
                    }
                }
                return res.status(202).send(response);
            }
        )
    })

});

router.get('/:id_plano', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            'SELECT * FROM tb009_plataforma WHERE id_plano = ?',
            [req.params.id_user],
            (error, result, fields) => {
                if (error) { return res.status(500).send({ error: error }) }

                if (result.length == 0) {
                    return res.status(404).send({
                        mensagem: 'Não foi encontrado Plano com esse ID'
                    })
                }
                const response = {
                    plano: {
                        id_plano: result[0].id_plano,
                        plano: result[0].plano,
                        valor: result[0].valor,
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
            `UPDATE tb009_plataforma 
            SET nome_plano = ?, 
            valor_plano = ?,
            WHERE id_plano = ?`,
            [
                req.body.plano,
                req.body.valor,
                req.body.id_plano,
            ],
            (error, result, field) => {
                conn.release();
                if (error) {
                    return res.status(500).send({
                        error: error,
                    });
                }
                const response = {
                    mensagem: 'Plano atualizado com sucesso',
                    planoCriado: {
                        id_plano: req.body.id_plano,
                        plano: req.body.plano,
                        valor: req.body.valor,
                        request: {
                            tipo: 'PATCH',
                            descricao: 'Atualiza um plano',
                            url: 'http://localhost:3000/planos/' + req.body.id_plano
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
            'DELETE FROM tb009_plataforma WHERE id_plano = ?',
            [
                req.body.id_plano
            ],
            (error, result, field) => {
                conn.release();
                if (error) { return res.status(500).send({ error: error }) }
                const response = {
                    mensagem: 'Plano removido com sucesso',
                    request: {
                        tipo: 'POST',
                        desricao: 'Insere um plano',
                        url: 'http://localhost:3000/planos/'
                    }
                }
                return res.status(202).send(response);
            }
        )
    })
});

module.exports = router;