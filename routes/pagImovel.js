const express = require('express');
const router = express.Router();
const mysql = require('../mysql').pool;

router.get('/', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            'SELECT * FROM tb008_pagamento_imovel',
            (error, result, fields) => {
                if (error) { return res.status(500).send({ error: error }) }
                const response = {
                    quantidade: result.length,
                    pagamento: result.map(pag => {
                        return {
                            foma_pagamento: pag.foma_pagamento,
                            parcelas: pag.parcelas,
                            adiantamento: pag.adiantamento,
                            valor_final: pag.valor_final,
                            valor_mensal: pag.valor_mensal,
                            valor_entrada: pag.valor_entrada,
                            data_vencimento: pag.data_vencimento,
                            id_user: pag.id_user,
                            request: {
                                tipo: 'GET',
                                descricao: 'Retorna todos os pagamentos',
                                url: 'http://localhost:3000/pag-imovel/' + pag.id_pag_imovel
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
            'INSERT INTO tb008_pagamento_imovel (foma_pagamento, parcelas, adiantamento, valor_final, valor_mensal, valor_entrada, data_vencimento, id_user) VALUES (?,?,?,?,?,?,?,?)',
            [
                req.body.foma_pagamento,
                req.body.parcelas,
                req.body.adiantamento,
                req.body.valor_final,
                req.body.valor_mensal,
                req.body.valor_entrada,
                req.body.data_vencimento,
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
                    mensagem: 'Pagamento cadastrado com sucesso',
                    avaliacaoCriada: {
                        id_pag_imovel: result.id_pag_imovel,
                        foma_pagamento: req.body.foma_pagamento,
                        request: {
                            tipo: 'POST',
                            descricao: 'Insere um novo pagamento',
                            url: 'http://localhost:3000/pag-imovel/'
                        }
                    }
                }
                return res.status(202).send(response);
            }
        )
    })

});

router.get('/:id_pag_imovel', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            'SELECT * FROM tb008_pagamento_imovel WHERE id_pag_imovel = ?',
            [req.params.id_pag_imovel],
            (error, result, fields) => {
                if (error) { return res.status(500).send({ error: error }) }

                if (result.length == 0) {
                    return res.status(404).send({
                        mensagem: 'Não foi encontrado nenhum pagamento com esse ID'
                    })
                }
                const response = {
                    avaiacao: {
                        id_pag_imovel: result[0].id_pag_imovel,
                        foma_pagamento: result[0].foma_pagamento,
                        request: {
                            tipo: 'GET',
                            descricao: 'Retorna um novo pagamento',
                            url: 'http://localhost:3000/pag-imovel'
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
            `UPDATE tb008_pagamento_imovel
            SET foma_pagamento = ?, 
            parcelas = ?,
            adiantamento = ?,
            valor_final = ?,
            valor_mensal = ?,
            valor_entrada = ?,
            data_vencimento = ?,
            id_user = ?,
            WHERE id_pag_imovel = ?`,
            [
                req.body.foma_pagamento,
                req.body.parcelas,
                req.body.adiantamento,
                req.body.valor_final,
                req.body.valor_mensal,
                req.body.valor_entrada,
                req.body.data_vencimento,
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
                    mensagem: 'Pagamento atualizado com sucesso',
                    documentoCriado: {
                        id_doc: req.body.id_doc,
                        cpf: req.body.cpf,
                        request: {
                            tipo: 'PATCH',
                            descricao: 'Atualiza um pagamento',
                            url: 'http://localhost:3000/pag-imovel/' + req.body.id_pag_imovel
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
            'DELETE FROM tb008_pagamento_imovel WHERE id_pag_imovel = ?',
            [
                req.body.id_pag_imovel
            ],
            (error, result, field) => {
                conn.release();
                if (error) { return res.status(500).send({ error: error }) }
                const response = {
                    mensagem: 'Pagamento removida com sucesso',
                    request: {
                        tipo: 'POST',
                        desricao: 'Insere um Pagamento ',
                        url: 'http://localhost:3000/pag-imovel/'
                    }
                }
                return res.status(202).send(response);
            }
        )
    })
});

module.exports = router;