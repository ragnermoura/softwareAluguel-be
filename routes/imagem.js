const express = require('express');
const router = express.Router();
const mysql = require('../mysql').pool;
const { imageUpload } = require('../helpers/image-upload')


router.get('/', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            'SELECT * FROM tb012_imagem',
            (error, result, fields) => {
                if (error) { return res.status(500).send({ error: error }) }
                const response = {
                    quantidade: result.length,
                    imagens: result.map(img => {
                        return {
                            id_imovel: img.id_imovel,
                            id_user: img.id_user,
                            imagem: img.imagem,
                            
                            request: {
                                tipo: 'GET',
                                descricao: 'Retorna todas as Imagens',
                                url: 'http://localhost:3000/imagem/' + img.id_imagem
                            }
                        }
                    })

                }

                return res.status(200).send(response)
            }
        )

    })
});

router.post('/cadastro', imageUpload.array("images"), (req, res, next) => {
    upload(req, res, function(err) {
        if (err instanceof multer.MulterError) {
            return res.status(500).json(err);
        } else if (err) {
            return res.status(500).json(err);
        }
        
        mysql.getConnection((error, conn) => {
            if (error) { return res.status(500).send({ error: error }) }

            let images = req.files
            try{

            
            
            images?.map( file => {
                conn.query(
                    'INSERT INTO tb012_imagem (id_imovel, id_user, imagem) VALUES (?,?,?)',
                    [
                        req.body.id_imovel,
                        req.body.id_user, 
                        file.path, // salva o nome do arquivo na base de dados
                    ],
                    (error, result, field) => {
                        conn.release();
                        if (error) {
                            return res.status(500).send({
                                error: error,
                                response: null
                            });
                        }
    
                       
                        
                    }
                )
            })

            return res.status(201);
        } catch(err){
            console.log(err)
        }
            
        });
    });
});

router.get('/:id_imagem', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            'SELECT * FROM tb012_imagem WHERE id_imagem = ?',
            [req.params.id_imagem],
            (error, result, fields) => {
                if (error) { return res.status(500).send({ error: error }) }

                if (result.length == 0) {
                    return res.status(404).send({
                        mensagem: 'Não foi encontrado imagem com esse ID'
                    })
                }
                const response = {
                    plano: {
                        id_imovel: result[0].id_imovel,
                        id_user: result[0].id_user,
                        request: {
                            tipo: 'GET',
                            descricao: 'Retorna uma nova imagem',
                            url: 'http://localhost:3000/imagem'
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
            `UPDATE tb012_imagem
            SET id_imovel = ?, 
            id_user = ?,
            WHERE id_imagem = ?`,
            [
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
                    mensagem: 'Imóvel atualizado com sucesso',
                    planoCriado: {
                        id_imagem: req.body.id_imagem,
                        id_imovel: req.body.id_imovel,
                        id_user: req.body.id_user,
                        request: {
                            tipo: 'PATCH',
                            descricao: 'Atualiza uma imagem',
                            url: 'http://localhost:3000/imagem/' + req.body.id_imagem
                        }
                    }
                }
                res.status(201).send(response);
            }
        )
    })
});

router.delete('/', (req, res, next) => {id
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error }) }
        conn.query(
            'DELETE FROM tb012_imagem WHERE id_imagem = ?',
            [
                req.body.id_imagem
            ],
            (error, result, field) => {
                conn.release();
                if (error) { return res.status(500).send({ error: error }) }
                const response = {
                    mensagem: 'Imagem removida com sucesso',
                    request: {
                        tipo: 'POST',
                        desricao: 'Insere uma imagem',
                        url: 'http://localhost:3000/imagem/'
                    }
                }
                return res.status(202).send(response);
            }
        )
    })
});

module.exports = router;