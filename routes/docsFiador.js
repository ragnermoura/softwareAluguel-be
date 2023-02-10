const express = require('express');
const router = express.Router();
const mysql = require('../mysql').pool;

router.get('/', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            'SELECT * FROM tb005_documentos_fiador',
            (error, result, fields) => {
                if (error) { return res.status(500).send({ error: error }) }
                const response = {
                    quantidade: result.length,
                    documentos: result.map(doc => {
                        return {
                            cpf: doc.cpf,
                            identidade: doc.identidade,
                            nome: doc.nome,
                            endereco: doc.endereco,
                            telefone1: doc.telefone1,
                            telefone2: doc.telefone2,
                            profissao: doc.profissao,
                            atividade: doc.atividade,
                            cpf_arquivo: doc.cpf_arquivo,
                            comprovante: doc.comprovante_file,
                            cnpj: doc.cnpj,
                            cnpj_file: doc.cnpj_file,
                            id_user: doc.id_user,
                            request: {
                                tipo: 'GET',
                                descricao: 'Retorna todos os Documentos',
                                url: 'http://localhost:3000/doc-fiador/' + doc.id_docs
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
            'INSERT INTO tb005_documentos_fiador (cpf, identidade, nome, endereco, telefone1, telefone2, profissao, atividade, cpf_file, comprovante_file, cnpj, cnpj_file, id_user) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)',
            [
                req.body.cpf,
                req.body.identidade,
                req.body.nome,
                req.body.endereco,
                req.body.telefone1,
                req.body.telefone2,
                req.body.profissao,
                req.body.atividade,
                req.body.cpf_file,
                req.body.comprovante_file,
                req.body.cnpj,
                req.body.cnpj_file,
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
                    imovelCriado: {
                        id_docs: result.id_docs,
                        cpf: req.body.cpf,
                        request: {
                            tipo: 'POST',
                            descricao: 'Insere um novo documento',
                            url: 'http://localhost:3000/doc-fiador'
                        }
                    }
                }
                return res.status(202).send(response);
            }
        )
    })

});

router.get('/:id_docs', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            'SELECT * FROM tb005_documentos_fiador WHERE id_docs = ?',
            [req.params.id_docs],
            (error, result, fields) => {
                if (error) { return res.status(500).send({ error: error }) }

                if (result.length == 0) {
                    return res.status(404).send({
                        mensagem: 'Não foi encontrado um imóvel com esse ID'
                    })
                }
                const response = {
                    documentos: {
                        id_docs: result[0].id_docs,
                        cpf: result[0].cpf,
                        request: {
                            tipo: 'GET',
                            descricao: 'Retorna um novo documento',
                            url: 'http://localhost:3000/doc-fiador'
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
            `UPDATE tb005_documentos_fiador
            SET cpf = ?, 
            identidade = ?,
            nome = ?,
            endereco = ?,
            telefone1 = ?,
            telefone2 = ?,
            profissao = ?,
            atividade = ?,
            cpf_file = ?,
            comprovante_file = ?,
            cnpj = ?,
            cnpj_file = ?,
            id_user = ?,
            WHERE id_docs = ?`,
            [
                req.body.cpf,
                req.body.identidade,
                req.body.nome,
                req.body.endereco,
                req.body.telefone1,
                req.body.telefone2,
                req.body.profissao,
                req.body.atividade,
                req.body.cpf_file,
                req.body.comprovante_file,
                req.body.cnpj,
                req.body.cnpj_file,
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
                    mensagem: 'Documento atualizado com sucesso',
                    documentoCriado: {
                        id_doc: req.body.id_doc,
                        cpf: req.body.cpf,
                        request: {
                            tipo: 'PATCH',
                            descricao: 'Atualiza um documento',
                            url: 'http://localhost:3000/docs-inquilinos/' + req.body.id_doc
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
            'DELETE FROM tb005_documentos_fiador WHERE id_docs = ?',
            [
                req.body.id_doc
            ],
            (error, result, field) => {
                conn.release();
                if (error) { return res.status(500).send({ error: error }) }
                const response = {
                    mensagem: 'Documentos removido com sucesso',
                    request: {
                        tipo: 'POST',
                        desricao: 'Insere um documento',
                        url: 'http://localhost:3000/doc-fiador/'
                    }
                }
                return res.status(202).send(response);
            }
        )
    })
});

module.exports = router;