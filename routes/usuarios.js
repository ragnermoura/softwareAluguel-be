require('dotenv').config();
const express = require('express');
const router = express.Router();
const mysql = require('../mysql').pool;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require("nodemailer");



router.get('/', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            'SELECT * FROM tb001_usuario',
            (error, resultado, fields) => {
                if (error) { return res.status(500).send({ error: error }) }
                return res.status(200).send({ response: resultado })
            }
        )

    })
});

router.get('/:id_user', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            'SELECT * FROM tb001_usuario WHERE id_user = ?',
            [req.params.id_user],
            (error, resultado, fields) => {
                if (error) { return res.status(500).send({ error: error }) }
                return res.status(200).send({ response: resultado })
            }
        )

    })
});

router.patch('/edit', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            `UPDATE tb001_usuario 
            SET nome = ?,
            sobrenome = ?,  
            endereco = ?, 
            cidade = ?, 
            estado = ?, 
            cep = ?, 
            telefone1 = ?, 
            telefone2 = ?, 
            email = ?, 
            senha = ?, 
            id_plano = ?, 
            id_status = ?,
            id_nivel = ?,
            WHERE id_user = ?`,
            [
                req.body.nome,
                req.body.sobrenome,
                req.body.endereco,
                req.body.cidade,
                req.body.estado,
                req.body.cep,
                req.body.telefone1,
                req.body.telefone2,
                req.body.email,
                req.body.senha,
                req.body.plano,
                req.body.nivel,
                req.body.id_user,
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
                    mensagem: 'Dados de usuário alterados com sucesso!',
                });
            }
        )
    })
});

router.delete('/delete', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error }) }
        conn.query(
            'DELETE FROM tb001_usuario WHERE id_user = ?',
            [
                req.body.id_user
            ],
            (error, resultado, field) => {
                conn.release();
                if (error) { return res.status(500).send({ error: error }) }

                return res.status(202).send({
                    mensagem: 'Usuário excluido com sucesso!'
                });
            }
        )
    })
});

router.post('/cadastro', (req, res, next) => {
    

    mysql.getConnection((err, conn) => {
        if (err) { return res.status(500).send({ error: error }) }
        conn.query('SELECT * FROM tb001_usuario WHERE email = ?', [req.body.email], (error, result) => {
            if (err) { return res.status(500).send({ error: error }) }
            if (result.length > 0) {
                res.status(409).send({
                    mensagem: 'Email já cadastrado, por favor insira um email diferente!'
                })
            } else {
                bcrypt.hash(req.body.senha, 10, (errBcrypt, hash) => {
                    if (errBcrypt) {
                        return res.status(500).send({ error: errBcrypt })
                    }
                    conn.query(
                        'INSERT INTO tb001_usuario (nome, sobrenome, endereco, cidade, estado, cep, telefone1, telefone2, email, senha, id_plano, id_status, id_nivel, code) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
                        [req.body.nome,
                        req.body.sobrenome,
                        req.body.endereco,
                        req.body.cidade,
                        req.body.estado,
                        req.body.cep,
                        req.body.telefone1,
                        req.body.telefone2,
                        req.body.email,
                            hash,
                        req.body.plano,
                        req.body.status,
                        req.body.nivel,
                        req.body.code],

                        (error, result) => {
                            conn.release();
                            if (error) {
                                return res.status(500).send({
                                    error: error,
                                });
                            }

                           

                           if(req.body.nivel === 2 ){
                           
                            async function main() {
                               
                                let testAccount = await nodemailer.createTestAccount(); 
                                let transporter = nodemailer.createTransport({
                                    host: "smtp.hostinger.com",
                                    port: 465,
                                    secure: true, // true for 465, false for other ports
                                    auth: {
                                        user: 'noreply@imoveldiretocomodono.com.br', // generated ethereal user
                                        pass: '10Minutos!', // generated ethereal password
                                    },
                                });

                                let info = await transporter.sendMail({
                                    from: '"Imóvel Direto com o Dono 🚀" <noreply@imoveldiretocomodono.com.br>', // sender address
                                    to:  req.body.email, // list of receivers
                                    subject: "Sua conta foi criada ✔", // Subject line
                                    // text: "Hello world?", // plain text body
                                    html: "<div style='background-color: #f26022; width: 100%; height: 80px; text-align: center;'></div><div><h1 style='color: #f26022; text-align: center;'>ESTE É O SEU CÓDIGO DE CONFIRMAÇÃO</h1><h1 style='color: #000; text-align: center;'>"+req.body.code+"</h1><h5 style='color: #767675; text-align: center;'>Todos os Direitos Reservados - 2023 | Imóvel Direto com o Dono</h5><h5 style='color: #767675; text-align: center;'><b>Jobrapido</b> S.r.l. via Paleocapa, 7 - 20121 Milan - Italy - Tax code and VAT number: IT11876271005</h5>", // html body
                                    
                                });

                                console.log("Message sent: %s", info.messageId);
                                // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

                               
                                console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
                                // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
                            }

                            main().catch(console.error);

                           }
                           
                            const response = {
                                mensagem: 'Usuário cadastrado com sucesso',
                               

                                usuarioCriado: {
                                    
                                    id_user: result.insertId,
                                    nome: req.body.nome,
                                    email: req.body.email,
                                    telefone1: req.body.telefone,
                                    nivel: req.body.nivel,

                                    request: {
                                        tipo: 'GET',
                                        descricao: 'Pesquisa um usuário',
                                        url: 'http://localhost:3000/usuarios'
                                    }
                                }
                                
                            }
                          
                            return res.status(202).send(response);

                        });
                });
            }
        })

    });

}),

router.post('/code', (req, res, next) => {
    mysql.getConnection((err, conn) => {
        if (err) { return res.status(500).send({ error: error }) }
        const query = `SELECT * FROM tb001_usuario WHERE code = ? AND id_user = ?`;
        conn.query(query, [req.body.code, req.body.id], (error, results, field) => {
            conn.release();

            if (err) { return res.status(500).send({ error: error }) }
            if (results.length < 1) {
                return res.status(401).send({
                    mensagem: 'Código não confere.'
                })

            }
            res.status(201).send({
                mensagem: 'código confere'
            });
        })
    })

}),


    //ROTAS DE SERVIÇO
    router.post('/login', (req, res, next) => {
        mysql.getConnection((err, conn) => {
            if (err) { return res.status(500).send({ error: error }) }
            const query = `SELECT * FROM tb001_usuario WHERE email = ?`;
            conn.query(query, [req.body.email], (error, results, field) => {
                conn.release();

                if (err) { return res.status(500).send({ error: error }) }
                if (results.length < 1) {
                    return res.status(401).send({
                        mensagem: 'Falha na autenticação.'
                    })

                }
                bcrypt.compare(req.body.senha, results[0].senha, (err, result) => {
                    if (err) {
                        return res.status(401).send({ mensagem: 'Falha na autenticação.' })

                    } if (result) {
                        const token = jwt.sign({
                            id_usuario: results[0].id_user,
                            nome: results[0].nome,
                            sobrenome: results[0].sobrenome,
                            email: results[0].email,
                            telefone1: results[0].telefone1,
                            telefone2: results[0].telefone2,
                            id_nivel: results[0].id_nivel
                        }, process.env.JWT_KEY, {
                            expiresIn: "6h"
                        })

                        return res.status(200).send({
                            mensagem: 'Autenticado com sucesso!',
                            token: token
                        })
                    }
                    return res.status(401).send({ mensagem: 'Falha na autenticação.' })
                })
            })
        })
    }),


    





    module.exports = router;