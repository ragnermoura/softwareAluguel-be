const express = require('express');
const router = express.Router();
const mysql = require('../mysql').pool;

router.get('/', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            'SELECT * FROM tb007_contrato',
            (error, result, fields) => {
                if (error) { return res.status(500).send({ error: error }) }
                const response = {
                    quantidade: result.length,
                    contrato: result.map(contrat => {
                        return {
                            tempo_contrato: contrat.tempo_contrato,
                            tipo: contrat.tipo_contrato,
                            chekin: contrat.chekin,
                            checkout: contrat.checkout,
                            id_imovel: contrat.id_imovel,
                            id_user: contrat.id_user,
                            request: {
                                tipo: 'GET',
                                descricao: 'Retorna todos os contratos',
                                url: 'http://localhost:3000/contrato/' + contrat.id_contrato
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
            'INSERT INTO tb007_contrato (tempo_contrato, tipo_contrato, chekin, checkout, id_imovel, id_user) VALUES (?,?,?,?,?,?)',
            [
                req.body.tempo_contrato,
                req.body.tipo_contrato,
                req.body.chekin,
                req.body.checkout,
                req.body.id_imovel,
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
                    mensagem: 'Documentos cadastrados com sucesso',
                    contratoCriado: {
                        id_contrato: result.id_contrato,
                        tipo_contrato: req.body.tipo_contrato,
                        request: {
                            tipo: 'POST',
                            descricao: 'Insere um novo contrato',
                            url: 'http://localhost:3000/contrato'
                        }
                    }
                }
                return res.status(202).send(response);
            }
        )
    })

});

router.get('/:id_contrato', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            'SELECT * FROM tb007_contrato WHERE id_contrato = ?',
            [req.params.id_contrato],
            (error, result, fields) => {
                if (error) { return res.status(500).send({ error: error }) }

                if (result.length == 0) {
                    return res.status(404).send({
                        mensagem: 'Não foi encontrado um contrato com esse ID'
                    })
                }
                const response = {
                    contratos: {
                        id_contrato: result[0].id_contrato,
                        tipo_contrato: result[0].tipo_contrato,
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

router.patch('/', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            `UPDATE tb007_contrato
            SET tempo_contrato = ?, 
            tipo_contrato = ?,
            chekin = ?,
            checkout = ?,
            id_imovel = ?,
            id_user = ?,
            WHERE id_contrato = ?`,
            [
                req.body.tempo_contrato,
                req.body.tipo_contrato,
                req.body.chekin,
                req.body.checkout,
                req.body.id_imovel,
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
                            url: 'http://localhost:3000/contrato/' + req.body.id_contrato
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
            'DELETE FROM tb007_contrato WHERE id_contrato = ?',
            [
                req.body.id_contrato
            ],
            (error, result, field) => {
                conn.release();
                if (error) { return res.status(500).send({ error: error }) }
                const response = {
                    mensagem: 'Documento removido com sucesso',
                    request: {
                        tipo: 'POST',
                        desricao: 'Insere um contrato',
                        url: 'http://localhost:3000/contrato/'
                    }
                }
                return res.status(202).send(response);
            }
        )
    })
});

module.exports = router;