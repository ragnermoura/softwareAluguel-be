-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Tempo de geração: 15-Fev-2023 às 17:48
-- Versão do servidor: 10.4.21-MariaDB
-- versão do PHP: 7.4.29

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `db_alugue_direto`
--

-- --------------------------------------------------------

--
-- Estrutura da tabela `tb001_usuario`
--

CREATE TABLE `tb001_usuario` (
  `id_user` int(11) NOT NULL,
  `nome` varchar(150) DEFAULT NULL,
  `sobrenome` varchar(120) DEFAULT NULL,
  `endereco` varchar(120) DEFAULT NULL,
  `cidade` varchar(100) DEFAULT NULL,
  `estado` varchar(100) DEFAULT NULL,
  `cep` varchar(45) DEFAULT NULL,
  `telefone1` varchar(45) DEFAULT NULL,
  `telefone2` varchar(45) DEFAULT NULL,
  `email` varchar(45) DEFAULT NULL,
  `senha` varchar(300) DEFAULT NULL,
  `id_plano` int(11) DEFAULT NULL,
  `id_status` int(11) DEFAULT NULL,
  `id_nivel` int(11) DEFAULT NULL,
  `code` varchar(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Extraindo dados da tabela `tb001_usuario`
--

INSERT INTO `tb001_usuario` (`id_user`, `nome`, `sobrenome`, `endereco`, `cidade`, `estado`, `cep`, `telefone1`, `telefone2`, `email`, `senha`, `id_plano`, `id_status`, `id_nivel`, `code`) VALUES
(3, 'Julia', 'Mota', NULL, 'Amazonas', NULL, NULL, '(21) 98773-7689', NULL, 'franzoiamota@gmail.com', '$2b$10$X88XyysnvpGtjJbVC.GfbeXfKx2Aynt4yHR3GOmysSQGkT205vXKm', 1, 1, 2, '1016'),
(4, 'Willian', 'Ragner', NULL, 'Duque de Caxias', NULL, NULL, '(21) 96543-4657', NULL, 'ragnermoura@gmail.com', '$2b$10$P285O1RxkXkxx7Po3SBSAeWQoaCvyI1g6sFn3DLifMDVXvhB9vvF6', 1, 1, 2, '1986');

-- --------------------------------------------------------

--
-- Estrutura da tabela `tb002_nivel_access`
--

CREATE TABLE `tb002_nivel_access` (
  `id_nivel` int(11) NOT NULL,
  `nome` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Extraindo dados da tabela `tb002_nivel_access`
--

INSERT INTO `tb002_nivel_access` (`id_nivel`, `nome`) VALUES
(1, 'Administrador'),
(2, 'Propietário'),
(3, 'Inquilino');

-- --------------------------------------------------------

--
-- Estrutura da tabela `tb003_imovel`
--

CREATE TABLE `tb003_imovel` (
  `id_imovel` int(11) NOT NULL,
  `nome` varchar(220) DEFAULT NULL,
  `descricao` varchar(300) DEFAULT NULL,
  `tipo` varchar(45) DEFAULT NULL,
  `valor` varchar(45) DEFAULT NULL,
  `cep` varchar(220) NOT NULL,
  `endereco` varchar(330) NOT NULL,
  `numero` varchar(20) NOT NULL,
  `estado` varchar(220) NOT NULL,
  `quartos` varchar(45) DEFAULT NULL,
  `garagem` varchar(45) DEFAULT NULL,
  `andar` varchar(45) DEFAULT NULL,
  `area_total` varchar(45) DEFAULT NULL,
  `cozinha` varchar(45) DEFAULT NULL,
  `varanda` varchar(45) DEFAULT NULL,
  `metros_quadrados` varchar(45) DEFAULT NULL,
  `banheiro` varchar(45) DEFAULT NULL,
  `casal` varchar(45) DEFAULT NULL,
  `habitantes` varchar(45) DEFAULT NULL,
  `crianca` varchar(45) DEFAULT NULL,
  `lazer` varchar(45) DEFAULT NULL,
  `piscina` varchar(45) DEFAULT NULL,
  `churrasqueira` varchar(45) DEFAULT NULL,
  `fotos_casa` varchar(45) DEFAULT NULL,
  `id_user` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estrutura da tabela `tb004_documentos_principal`
--

CREATE TABLE `tb004_documentos_principal` (
  `id_docs` int(11) NOT NULL,
  `cpf` varchar(45) NOT NULL,
  `identidade` varchar(45) NOT NULL,
  `cpf_file` varchar(45) NOT NULL,
  `identidade_file` varchar(45) NOT NULL,
  `comprovante_file` varchar(45) NOT NULL,
  `cnpj` varchar(45) DEFAULT NULL,
  `cnpj_file` varchar(45) DEFAULT NULL,
  `id_user` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estrutura da tabela `tb005_documentos_fiador`
--

CREATE TABLE `tb005_documentos_fiador` (
  `id_docs` int(11) NOT NULL,
  `cpf` varchar(45) DEFAULT NULL,
  `identidade` varchar(45) DEFAULT NULL,
  `nome` varchar(220) DEFAULT NULL,
  `endereco` varchar(45) DEFAULT NULL,
  `telefone1` varchar(45) DEFAULT NULL,
  `telefone2` varchar(45) DEFAULT NULL,
  `profissao` varchar(45) DEFAULT NULL,
  `atividade` varchar(45) DEFAULT NULL,
  `cpf_file` varchar(45) DEFAULT NULL,
  `comprovante_file` varchar(45) DEFAULT NULL,
  `cnpj` varchar(45) DEFAULT NULL,
  `cnpj_file` varchar(45) DEFAULT NULL,
  `id_user` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estrutura da tabela `tb006_status`
--

CREATE TABLE `tb006_status` (
  `id_status` int(11) NOT NULL,
  `nome` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Extraindo dados da tabela `tb006_status`
--

INSERT INTO `tb006_status` (`id_status`, `nome`) VALUES
(1, 'Ativo'),
(2, 'Inativo'),
(3, NULL),
(4, NULL);

-- --------------------------------------------------------

--
-- Estrutura da tabela `tb007_contrato`
--

CREATE TABLE `tb007_contrato` (
  `id_contrato` int(11) NOT NULL,
  `tempo_contrato` varchar(45) DEFAULT NULL,
  `tipo_contrato` varchar(45) DEFAULT NULL,
  `chekin` datetime DEFAULT NULL,
  `checkout` datetime DEFAULT NULL,
  `id_imovel` int(11) NOT NULL,
  `id_user` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estrutura da tabela `tb008_pagamento_imovel`
--

CREATE TABLE `tb008_pagamento_imovel` (
  `id_pag_imovel` int(11) NOT NULL,
  `foma_pagamento` varchar(45) DEFAULT NULL,
  `parcelas` varchar(45) DEFAULT NULL,
  `adiantamento` varchar(45) DEFAULT NULL,
  `valor_final` varchar(30) DEFAULT NULL,
  `valor_mensal` varchar(45) DEFAULT NULL,
  `valor_entrada` varchar(45) DEFAULT NULL,
  `data_vencimento` varchar(45) DEFAULT NULL,
  `id_user` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estrutura da tabela `tb009_plataforma`
--

CREATE TABLE `tb009_plataforma` (
  `id_plano` int(11) NOT NULL,
  `nome_plano` varchar(45) DEFAULT NULL,
  `valor_plano` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Extraindo dados da tabela `tb009_plataforma`
--

INSERT INTO `tb009_plataforma` (`id_plano`, `nome_plano`, `valor_plano`) VALUES
(1, 'Basic', '59,99'),
(2, 'Premium', '129,99');

-- --------------------------------------------------------

--
-- Estrutura da tabela `tb010_avaliacao`
--

CREATE TABLE `tb010_avaliacao` (
  `id_avaliacao` int(11) NOT NULL,
  `status` varchar(45) DEFAULT NULL,
  `obs` varchar(220) DEFAULT NULL,
  `id_user` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estrutura da tabela `tb011_turbinados`
--

CREATE TABLE `tb011_turbinados` (
  `id_turbinados` int(11) NOT NULL,
  `id_imovel` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `status` int(11) NOT NULL,
  `create_turbinado` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estrutura da tabela `tb012_imagem`
--

CREATE TABLE `tb012_imagem` (
  `id_imagem` int(11) NOT NULL,
  `id_imovel` int(11) NOT NULL,
  `imagem` varchar(400) NOT NULL,
  `id_user` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Índices para tabelas despejadas
--

--
-- Índices para tabela `tb001_usuario`
--
ALTER TABLE `tb001_usuario`
  ADD PRIMARY KEY (`id_user`),
  ADD KEY `fk_tb003_dados_user_tb009_plataforma1_idx` (`id_plano`),
  ADD KEY `fk_tb001_dados_user_tb006_status1_idx` (`id_status`),
  ADD KEY `fk_tb001_dados_user_tb002_nivel_access1_idx` (`id_nivel`);

--
-- Índices para tabela `tb002_nivel_access`
--
ALTER TABLE `tb002_nivel_access`
  ADD PRIMARY KEY (`id_nivel`);

--
-- Índices para tabela `tb003_imovel`
--
ALTER TABLE `tb003_imovel`
  ADD PRIMARY KEY (`id_imovel`),
  ADD KEY `fk_tb011_imovel_tb003_dados_user1_idx` (`id_user`);

--
-- Índices para tabela `tb004_documentos_principal`
--
ALTER TABLE `tb004_documentos_principal`
  ADD PRIMARY KEY (`id_docs`),
  ADD KEY `fk_tb004_documentos_principal_tb001_dados_user1_idx` (`id_user`);

--
-- Índices para tabela `tb005_documentos_fiador`
--
ALTER TABLE `tb005_documentos_fiador`
  ADD PRIMARY KEY (`id_docs`),
  ADD KEY `fk_tb005_documentos_fiador_tb001_usuario1_idx` (`id_user`);

--
-- Índices para tabela `tb006_status`
--
ALTER TABLE `tb006_status`
  ADD PRIMARY KEY (`id_status`);

--
-- Índices para tabela `tb007_contrato`
--
ALTER TABLE `tb007_contrato`
  ADD PRIMARY KEY (`id_contrato`),
  ADD KEY `fk_tb007_contrato_tb011_imovel1_idx` (`id_imovel`),
  ADD KEY `fk_tb007_contrato_tb001_dados_user1_idx` (`id_user`);

--
-- Índices para tabela `tb008_pagamento_imovel`
--
ALTER TABLE `tb008_pagamento_imovel`
  ADD PRIMARY KEY (`id_pag_imovel`),
  ADD KEY `fk_tb008_pagamento_imovel_tb001_dados_user1_idx` (`id_user`);

--
-- Índices para tabela `tb009_plataforma`
--
ALTER TABLE `tb009_plataforma`
  ADD PRIMARY KEY (`id_plano`);

--
-- Índices para tabela `tb010_avaliacao`
--
ALTER TABLE `tb010_avaliacao`
  ADD PRIMARY KEY (`id_avaliacao`),
  ADD KEY `fk_tb010_avaliacao_tb001_dados_user1_idx` (`id_user`);

--
-- Índices para tabela `tb011_turbinados`
--
ALTER TABLE `tb011_turbinados`
  ADD PRIMARY KEY (`id_turbinados`);

--
-- Índices para tabela `tb012_imagem`
--
ALTER TABLE `tb012_imagem`
  ADD KEY `key_user` (`id_user`),
  ADD KEY `key_imovel` (`id_imovel`);

--
-- AUTO_INCREMENT de tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `tb001_usuario`
--
ALTER TABLE `tb001_usuario`
  MODIFY `id_user` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de tabela `tb002_nivel_access`
--
ALTER TABLE `tb002_nivel_access`
  MODIFY `id_nivel` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de tabela `tb004_documentos_principal`
--
ALTER TABLE `tb004_documentos_principal`
  MODIFY `id_docs` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `tb005_documentos_fiador`
--
ALTER TABLE `tb005_documentos_fiador`
  MODIFY `id_docs` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `tb006_status`
--
ALTER TABLE `tb006_status`
  MODIFY `id_status` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de tabela `tb007_contrato`
--
ALTER TABLE `tb007_contrato`
  MODIFY `id_contrato` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `tb008_pagamento_imovel`
--
ALTER TABLE `tb008_pagamento_imovel`
  MODIFY `id_pag_imovel` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `tb009_plataforma`
--
ALTER TABLE `tb009_plataforma`
  MODIFY `id_plano` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de tabela `tb011_turbinados`
--
ALTER TABLE `tb011_turbinados`
  MODIFY `id_turbinados` int(11) NOT NULL AUTO_INCREMENT;

--
-- Restrições para despejos de tabelas
--

--
-- Limitadores para a tabela `tb001_usuario`
--
ALTER TABLE `tb001_usuario`
  ADD CONSTRAINT `fk_tb001_dados_user_tb002_nivel_access1` FOREIGN KEY (`id_nivel`) REFERENCES `tb002_nivel_access` (`id_nivel`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_tb001_dados_user_tb006_status1` FOREIGN KEY (`id_status`) REFERENCES `tb006_status` (`id_status`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_tb003_dados_user_tb009_plataforma1` FOREIGN KEY (`id_plano`) REFERENCES `tb009_plataforma` (`id_plano`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Limitadores para a tabela `tb003_imovel`
--
ALTER TABLE `tb003_imovel`
  ADD CONSTRAINT `fk_tb011_imovel_tb003_dados_user1` FOREIGN KEY (`id_user`) REFERENCES `tb001_usuario` (`id_user`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Limitadores para a tabela `tb004_documentos_principal`
--
ALTER TABLE `tb004_documentos_principal`
  ADD CONSTRAINT `fk_tb004_documentos_principal_tb001_dados_user1` FOREIGN KEY (`id_user`) REFERENCES `tb001_usuario` (`id_user`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Limitadores para a tabela `tb005_documentos_fiador`
--
ALTER TABLE `tb005_documentos_fiador`
  ADD CONSTRAINT `fk_tb005_documentos_fiador_tb001_usuario1` FOREIGN KEY (`id_user`) REFERENCES `tb001_usuario` (`id_user`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Limitadores para a tabela `tb007_contrato`
--
ALTER TABLE `tb007_contrato`
  ADD CONSTRAINT `fk_tb007_contrato_tb001_dados_user1` FOREIGN KEY (`id_user`) REFERENCES `tb001_usuario` (`id_user`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_tb007_contrato_tb011_imovel1` FOREIGN KEY (`id_imovel`) REFERENCES `tb003_imovel` (`id_imovel`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Limitadores para a tabela `tb008_pagamento_imovel`
--
ALTER TABLE `tb008_pagamento_imovel`
  ADD CONSTRAINT `fk_tb008_pagamento_imovel_tb001_dados_user1` FOREIGN KEY (`id_user`) REFERENCES `tb001_usuario` (`id_user`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Limitadores para a tabela `tb010_avaliacao`
--
ALTER TABLE `tb010_avaliacao`
  ADD CONSTRAINT `fk_tb010_avaliacao_tb001_dados_user1` FOREIGN KEY (`id_user`) REFERENCES `tb001_usuario` (`id_user`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Limitadores para a tabela `tb012_imagem`
--
ALTER TABLE `tb012_imagem`
  ADD CONSTRAINT `key_imovel` FOREIGN KEY (`id_imovel`) REFERENCES `tb003_imovel` (`id_imovel`),
  ADD CONSTRAINT `key_user` FOREIGN KEY (`id_user`) REFERENCES `tb001_usuario` (`id_user`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
