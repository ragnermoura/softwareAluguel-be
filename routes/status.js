const express = require('express');
const router = express.Router();
const mysql = require('../mysql').pool;

router.get('/', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            'SELECT * FROM tb006_status',
            (error, resultado, fields) => {
                if (error) { return res.status(500).send({ error: error }) }
                return res.status(200).send({ response: resultado })
            }
        )

    })
});

router.post('/cadastro', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            'INSERT INTO tb006_status (nome) VALUES (?)',
            [
                req.body.nome,
               
            ],
            (error, resultado, field) => {
                conn.release();
                if (error) {
                    return res.status(500).send({
                        error: error,
                        response: null
                    });
                }
                res.status(201).send({
                    mensagem: 'Status cadastrado com sucesso!',
                    id_status: resultado.insertId
                });
            }
        )
    })

});

router.get('/:id_status', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            'SELECT * FROM tb006_status WHERE id_status = ?',
            [req.params.id_status],
            (error, resultado, fields) => {
                if (error) { return res.status(500).send({ error: error }) }
                return res.status(200).send({ response: resultado })
            }
        )

    })
});

router.patch('/', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            `UPDATE tb006_status SET nome = ?, WHERE id_status = ?`,
            [
                req.body.nome,
                req.body.id_status
            ],
            (error, result, field) => {
                conn.release();
                if (error) {
                    return res.status(500).send({
                        error: error,
                    });
                }
                const response = {
                    mensagem: 'Status atualizado com sucesso',
                    statusEditado: {
                        id_status: req.body.id_status,
                        status: req.body.status,
                        request: {
                            tipo: 'PATCH',
                            descricao: 'Atualiza um status de acesso',
                            url: 'http://localhost:3000/status/' + req.body.id_status
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
            'DELETE FROM tb006_status WHERE id_status = ?',
            [
                req.body.id_status
            ],
            (error, resultado, field) => {
                conn.release();
                if (error) { return res.status(500).send({ error: error }) }

                return res.status(202).send({
                    mensagem: 'Dados excluido com sucesso!'
                });
            }
        )
    })
});

module.exports = router;