-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Creato il: Mag 30, 2024 alle 12:57
-- Versione del server: 10.4.27-MariaDB
-- Versione PHP: 8.1.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `collegiumpress`
--

-- --------------------------------------------------------

--
-- Struttura della tabella `collegi`
--

CREATE TABLE `collegi` (
  `Anno_Scolastico` varchar(4) NOT NULL,
  `ID_Collegio` int(11) NOT NULL,
  `Titolo` varchar(100) NOT NULL,
  `Ora_Inizio` time NOT NULL,
  `Ora_Fine` time DEFAULT NULL,
  `Data_Collegio` date DEFAULT NULL,
  `File_CSV` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dump dei dati per la tabella `collegi`
--

INSERT INTO `collegi` (`Anno_Scolastico`, `ID_Collegio`, `Titolo`, `Ora_Inizio`, `Ora_Fine`, `Data_Collegio`, `File_CSV`) VALUES
('0', 8, 'No', '17:40:00', '20:40:00', '2024-05-15', NULL),
('2023', 9, 'SUS', '03:00:00', '05:00:00', '2024-05-22', NULL),
('2022', 10, 'SUS5', '17:40:00', '20:40:00', '2024-05-15', NULL),
('2022', 11, 'SUS4', '17:40:00', '20:40:00', '2024-05-15', 'transazioni.csv'),
('2024', 12, 'CollegioModificato', '18:44:00', '22:44:00', '2024-03-20', NULL),
('2024', 13, 'Colletta', '00:32:00', '02:32:00', '2024-05-30', 'Collegio docenti 08.05.2024.xls'),
('2024', 14, 'SUSSSS', '10:59:00', '12:59:00', '2024-05-29', 'Collegio docenti 08.05.2024.xls'),
('2024', 16, 'PROVA 2', '09:52:00', '14:49:00', '2024-06-09', 'Collegio docenti 08.05.2024.CSV'),
('2024', 21, 'PROVA DEFINITIVA', '13:16:00', '15:16:00', '2024-06-07', 'Collegio docenti 08.05.2024.CSV'),
('2024', 22, 'Collegio numero 1', '12:19:00', '14:19:00', '2024-06-20', 'Collegio docenti 08.05.2024.CSV');

-- --------------------------------------------------------

--
-- Struttura della tabella `delibere`
--

CREATE TABLE `delibere` (
  `ID_Delibera` int(11) NOT NULL,
  `ID_Collegio` int(11) NOT NULL,
  `Descrizione` text NOT NULL,
  `Stato` varchar(100) NOT NULL,
  `Risultato` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struttura della tabella `presenze`
--

CREATE TABLE `presenze` (
  `ID_Presenza` int(11) NOT NULL AUTO_INCREMENT,
  `ID_Utente` int(11) NOT NULL,
  `ID_Collegio` int(11) NOT NULL,
  `DataOra_Registrazione` datetime DEFAULT current_timestamp(),
  `DataOra_Uscita` datetime DEFAULT current_timestamp(),
  PRIMARY KEY (`ID_Presenza`),
  KEY `FK_Utente` (`ID_Utente`),
  KEY `FK_Collegio` (`ID_Collegio`),
  CONSTRAINT `FK_Utente` FOREIGN KEY (`ID_Utente`) REFERENCES `utenti` (`ID_Utente`),
  CONSTRAINT `FK_Collegio` FOREIGN KEY (`ID_Collegio`) REFERENCES `collegi` (`ID_Collegio`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


--
-- Struttura della tabella `Docenti`
--


CREATE TABLE `docenti` (
  `ID_Presenza` int(11) NOT NULL,
  `NomeCognome` varchar(100) NOT NULL,
  `Mail` varchar(100) NOT NULL,
  `DataOra_Registrazione` datetime DEFAULT current_timestamp(),
  `DataOra_Uscita` datetime DEFAULT current_timestamp(),
  `ID_Collegio` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dump dei dati per la tabella `presenze`
--

INSERT INTO `presenze` (`ID_Presenza`, `NomeCognome`, `Mail`, `DataOra_Registrazione`, `DataOra_Uscita`, `ID_Collegio`) VALUES
(1, 'ABBATE Andrea', '', '2024-05-30 10:19:46', '0000-00-00 00:00:00', 22),
(2, 'ADDIVINOLA Gabriella', '', '2024-05-30 10:19:46', '0000-00-00 00:00:00', 22),
(3, 'AIELLO Daniela', '', '2024-05-30 10:19:46', '0000-00-00 00:00:00', 22),
(4, 'AIMETTA Matilde', '', '2024-05-30 10:19:46', '0000-00-00 00:00:00', 22),
(5, 'ALBERTO Franca', '', '2024-05-30 10:19:46', '0000-00-00 00:00:00', 22),
(6, 'ALESSANDRINI Aldo', '', '2024-05-30 10:19:46', '0000-00-00 00:00:00', 22),
(7, 'ALTINA Marco ', '', '2024-05-30 10:19:46', '0000-00-00 00:00:00', 22),
(8, 'AMATO Davide', '', '2024-05-30 10:19:46', '0000-00-00 00:00:00', 22),
(9, 'ANDREIS Claudia Simonetta', '', '2024-05-30 10:19:46', '0000-00-00 00:00:00', 22),
(10, 'ANGELERI Alessandro', '', '2024-05-30 10:19:46', '0000-00-00 00:00:00', 22),
(11, 'ANSALDI Martina', '', '2024-05-30 10:19:46', '0000-00-00 00:00:00', 22),
(12, 'ARLORIO Franca', '', '2024-05-30 10:19:46', '0000-00-00 00:00:00', 22),
(13, 'ARNEODO Loris', '', '2024-05-30 10:19:46', '0000-00-00 00:00:00', 22),
(14, 'BALLATORE Andrea', '', '2024-05-30 10:19:46', '0000-00-00 00:00:00', 22),
(15, 'BALLARIO Danilo', '', '2024-05-30 10:19:46', '0000-00-00 00:00:00', 22),
(16, 'BALLOCCO Liuba', '', '2024-05-30 10:19:46', '0000-00-00 00:00:00', 22),
(17, 'BARBERIS Lorenzo', '', '2024-05-30 10:19:46', '0000-00-00 00:00:00', 22),
(18, 'BARBERO Alberto', '', '2024-05-30 10:19:46', '0000-00-00 00:00:00', 22),
(19, 'BARTOLO Antonio', '', '2024-05-30 10:19:46', '0000-00-00 00:00:00', 22),
(20, 'BASTA Teresa', '', '2024-05-30 10:19:46', '0000-00-00 00:00:00', 22),
(21, 'BATTIATO Alfio', '', '2024-05-30 10:19:46', '0000-00-00 00:00:00', 22),
(22, 'BECCARIA Simone', '', '2024-05-30 10:19:46', '0000-00-00 00:00:00', 22),
(23, 'BECCATI Micol Giulia', '', '2024-05-30 10:19:46', '0000-00-00 00:00:00', 22),
(24, 'BECCHIO VILLOIS Laura', '', '2024-05-30 10:19:46', '0000-00-00 00:00:00', 22),
(25, 'BELLIARDO Diego', '', '2024-05-30 10:19:46', '0000-00-00 00:00:00', 22),
(26, 'BENASSI Loretta', '', '2024-05-30 10:19:46', '0000-00-00 00:00:00', 22),
(27, 'BERNARDI Maria', '', '2024-05-30 10:19:46', '0000-00-00 00:00:00', 22),
(28, 'BERNARDI Mauro       ', '', '2024-05-30 10:19:46', '0000-00-00 00:00:00', 22),
(29, 'BERNARDI Simona', '', '2024-05-30 10:19:46', '0000-00-00 00:00:00', 22),
(30, 'BLENGIO Donatella', '', '2024-05-30 10:19:46', '0000-00-00 00:00:00', 22),
(31, 'BOAGLIO Nicoletta', '', '2024-05-30 10:19:46', '0000-00-00 00:00:00', 22),
(32, 'BOCHICCHIO Mariangela', '', '2024-05-30 10:19:46', '0000-00-00 00:00:00', 22),
(33, 'BOETTI Andrea ', '', '2024-05-30 10:19:46', '0000-00-00 00:00:00', 22),
(34, 'BOLETTINO Tomas', '', '2024-05-30 10:19:46', '0000-00-00 00:00:00', 22),
(35, 'BONAVIA Marco', '', '2024-05-30 10:19:46', '0000-00-00 00:00:00', 22),
(36, 'BONINO Maria', '', '2024-05-30 10:19:46', '0000-00-00 00:00:00', 22),
(37, 'BONO Andrea', '', '2024-05-30 10:19:46', '0000-00-00 00:00:00', 22),
(38, 'BOSIO Antonella', '', '2024-05-30 10:19:46', '0000-00-00 00:00:00', 22),
(39, 'BOSSIO Tiziana', '', '2024-05-30 10:19:46', '0000-00-00 00:00:00', 22),
(40, 'BOVO Aldo', '', '2024-05-30 10:19:46', '0000-00-00 00:00:00', 22),
(41, 'BRAMARDI Luca', '', '2024-05-30 10:19:46', '0000-00-00 00:00:00', 22),
(42, 'BRIZIO Marianna', '', '2024-05-30 10:19:46', '0000-00-00 00:00:00', 22),
(43, 'BRUSEGAN CONTE Genny', '', '2024-05-30 10:19:46', '0000-00-00 00:00:00', 22),
(44, 'BURDESE Laura', '', '2024-05-30 10:19:46', '0000-00-00 00:00:00', 22),
(45, 'BURDISSO Carla', '', '2024-05-30 10:19:46', '0000-00-00 00:00:00', 22),
(46, 'BUSETTO Anna', '', '2024-05-30 10:19:46', '0000-00-00 00:00:00', 22),
(47, 'CAIRONE Fiorentino', '', '2024-05-30 10:19:46', '0000-00-00 00:00:00', 22),
(48, 'CALIGARIS Irene', '', '2024-05-30 10:19:46', '0000-00-00 00:00:00', 22),
(49, 'CALTABIANO Catena', '', '2024-05-30 10:19:46', '0000-00-00 00:00:00', 22),
(50, 'CALVO Anna', '', '2024-05-30 10:19:46', '0000-00-00 00:00:00', 22),
(51, 'CALVO Massimo', '', '2024-05-30 10:19:46', '0000-00-00 00:00:00', 22),
(52, 'CAMBIERI Oscar', '', '2024-05-30 10:19:46', '0000-00-00 00:00:00', 22),
(53, 'CAMIA Fabrizio', '', '2024-05-30 10:19:46', '0000-00-00 00:00:00', 22),
(54, 'CAMPANA Perla ', '', '2024-05-30 10:19:46', '0000-00-00 00:00:00', 22),
(55, 'CANAVERO Andrea', '', '2024-05-30 10:19:46', '0000-00-00 00:00:00', 22),
(56, 'CANONICO Tancredi       ', '', '2024-05-30 10:19:46', '0000-00-00 00:00:00', 22),
(57, 'CANTONI Stefano', '', '2024-05-30 10:19:46', '0000-00-00 00:00:00', 22),
(58, 'CARANTA Michela', '', '2024-05-30 10:19:46', '0000-00-00 00:00:00', 22),
(59, 'CARANTA Piera', '', '2024-05-30 10:19:46', '0000-00-00 00:00:00', 22),
(60, 'CARLE Fabrizio', '', '2024-05-30 10:19:46', '0000-00-00 00:00:00', 22),
(61, 'CASTAGNINO Laura', '', '2024-05-30 10:19:46', '0000-00-00 00:00:00', 22),
(62, 'CAVALLERO Luciano', '', '2024-05-30 10:19:46', '0000-00-00 00:00:00', 22),
(63, 'CAVALLO Claudio', '', '2024-05-30 10:19:46', '0000-00-00 00:00:00', 22),
(64, 'CAVALLOTTO Claudio', '', '2024-05-30 10:19:46', '0000-00-00 00:00:00', 22),
(65, 'CERATO Chiara', '', '2024-05-30 10:19:46', '0000-00-00 00:00:00', 22),
(66, 'CERVATO Gino', '', '2024-05-30 10:19:46', '0000-00-00 00:00:00', 22),
(67, 'CESARONI Silvia', '', '2024-05-30 10:19:46', '0000-00-00 00:00:00', 22),
(68, 'CICCARELLO Santina ', '', '2024-05-30 10:19:46', '0000-00-00 00:00:00', 22),
(69, 'COMETTO Marzia', '', '2024-05-30 10:19:46', '0000-00-00 00:00:00', 22),
(70, 'CONTE Roberto', '', '2024-05-30 10:19:46', '0000-00-00 00:00:00', 22),
(71, 'CONTE Roberto 76', '', '2024-05-30 10:19:46', '0000-00-00 00:00:00', 22),
(72, 'COROSINITI Rocco ', '', '2024-05-30 10:19:46', '0000-00-00 00:00:00', 22),
(73, 'COSTAMAGNA Gianpaolo', '', '2024-05-30 10:19:46', '0000-00-00 00:00:00', 22),
(74, 'COZZOLINO Aniello', '', '2024-05-30 10:19:46', '0000-00-00 00:00:00', 22),
(75, 'CRAVERO Diego', '', '2024-05-30 10:19:46', '0000-00-00 00:00:00', 22),
(76, 'D\'AGOSTARO Giovanna ', '', '2024-05-30 10:19:46', '0000-00-00 00:00:00', 22),
(77, 'DADONE Valentina', '', '2024-05-30 10:19:46', '0000-00-00 00:00:00', 22),
(78, 'DALMAZZO Elena', '', '2024-05-30 10:19:46', '0000-00-00 00:00:00', 22),
(79, 'DANNA Roberto', '', '2024-05-30 10:19:46', '0000-00-00 00:00:00', 22),
(80, 'DARDANELLI Martina ', '', '2024-05-30 10:19:46', '0000-00-00 00:00:00', 22),
(81, 'DE PASQUALE Paolo', '', '2024-05-30 10:19:46', '0000-00-00 00:00:00', 22),
(82, 'DE ZANET Chiara', '', '2024-05-30 10:19:46', '0000-00-00 00:00:00', 22),
(83, 'DEMARCHI Antonella', '', '2024-05-30 10:19:46', '0000-00-00 00:00:00', 22),
(84, 'DEMICHELIS Adriano', '', '2024-05-30 10:19:46', '0000-00-00 00:00:00', 22),
(85, 'DENINA ALEX', '', '2024-05-30 10:19:46', '0000-00-00 00:00:00', 22),
(86, 'DITARANTO Stefano ', '', '2024-05-30 10:19:46', '0000-00-00 00:00:00', 22),
(87, 'DOMINICI Eleonora', '', '2024-05-30 10:19:46', '0000-00-00 00:00:00', 22),
(88, 'DOTTA Claudio', '', '2024-05-30 10:19:46', '0000-00-00 00:00:00', 22),
(89, 'EULA Sonia ', '', '2024-05-30 10:19:46', '0000-00-00 00:00:00', 22),
(90, 'FANARA Andrea', '', '2024-05-30 10:19:46', '0000-00-00 00:00:00', 22),
(91, 'FAZIO Francesco', '', '2024-05-30 10:19:46', '0000-00-00 00:00:00', 22),
(92, 'FEA Daniele', '', '2024-05-30 10:19:46', '0000-00-00 00:00:00', 22),
(93, 'FERRERO Paola              ', '', '2024-05-30 10:19:46', '0000-00-00 00:00:00', 22),
(94, 'FERRERO Raffaella', '', '2024-05-30 10:19:46', '0000-00-00 00:00:00', 22),
(95, 'FISSORE Alberto', '', '2024-05-30 10:19:46', '0000-00-00 00:00:00', 22),
(96, 'FISSORE Federica', '', '2024-05-30 10:19:46', '0000-00-00 00:00:00', 22),
(97, 'FOGLIA Paola', '', '2024-05-30 10:19:46', '0000-00-00 00:00:00', 22),
(98, 'FORTE Mariangela ', '', '2024-05-30 10:19:46', '0000-00-00 00:00:00', 22),
(99, 'FOTI Marina', '', '2024-05-30 10:19:46', '0000-00-00 00:00:00', 22),
(100, 'FOTI Rosaria', '', '2024-05-30 10:19:46', '0000-00-00 00:00:00', 22),
(101, 'FULCHINI Stefano', '', '2024-05-30 10:19:46', '0000-00-00 00:00:00', 22),
(102, 'GALLESIO Barbara', '', '2024-05-30 10:19:46', '0000-00-00 00:00:00', 22),
(103, 'GALLO Lorella', '', '2024-05-30 10:19:46', '0000-00-00 00:00:00', 22),
(104, 'GALLO Paola', '', '2024-05-30 10:19:46', '0000-00-00 00:00:00', 22),
(105, 'GAMBONE Diego', '', '2024-05-30 10:19:46', '0000-00-00 00:00:00', 22),
(106, 'GAMBONE Fabrizio', '', '2024-05-30 10:19:46', '0000-00-00 00:00:00', 22),
(107, 'GARAVANO Rebecca ', '', '2024-05-30 10:19:46', '0000-00-00 00:00:00', 22),
(108, 'GARNERO Alberto', '', '2024-05-30 10:19:46', '0000-00-00 00:00:00', 22),
(109, 'GARRO Valentina', '', '2024-05-30 10:19:46', '0000-00-00 00:00:00', 22),
(110, 'GERACI Bruno Salvatore', '', '2024-05-30 10:19:46', '0000-00-00 00:00:00', 22),
(111, 'GERBINO Silvana', '', '2024-05-30 10:19:46', '0000-00-00 00:00:00', 22),
(112, 'GHIGLIONE Stefano', '', '2024-05-30 10:19:46', '0000-00-00 00:00:00', 22),
(113, 'GHIO Daniela', '', '2024-05-30 10:19:46', '0000-00-00 00:00:00', 22),
(114, 'GIANNONE Erika', '', '2024-05-30 10:19:46', '0000-00-00 00:00:00', 22),
(115, 'GIORDANETTO Alessandro', '', '2024-05-30 10:19:46', '0000-00-00 00:00:00', 22),
(116, 'GIOVETTI Michele', '', '2024-05-30 10:19:46', '0000-00-00 00:00:00', 22),
(117, 'GIRAUDI Paolo', '', '2024-05-30 10:19:46', '0000-00-00 00:00:00', 22),
(118, 'GIRAUDO Cecilia ', '', '2024-05-30 10:19:46', '0000-00-00 00:00:00', 22),
(119, 'GIULIANO Caterina', '', '2024-05-30 10:19:46', '0000-00-00 00:00:00', 22),
(120, 'GIUSIANO Luca', '', '2024-05-30 10:19:46', '0000-00-00 00:00:00', 22),
(121, 'GODANO Giulia', '', '2024-05-30 10:19:46', '0000-00-00 00:00:00', 22),
(122, 'GROSSO Stefano            ', '', '2024-05-30 10:19:46', '0000-00-00 00:00:00', 22),
(123, 'IARIA Massimo', '', '2024-05-30 10:19:46', '0000-00-00 00:00:00', 22),
(124, 'INGARAMO Paolo', '', '2024-05-30 10:19:46', '0000-00-00 00:00:00', 22),
(125, 'LAMBERTI Mario', '', '2024-05-30 10:19:46', '0000-00-00 00:00:00', 22),
(126, 'LATELA Danila', '', '2024-05-30 10:19:46', '0000-00-00 00:00:00', 22),
(127, 'LAZZERETTI Federica ', '', '2024-05-30 10:19:46', '0000-00-00 00:00:00', 22),
(128, 'LEANDRI Silia', '', '2024-05-30 10:19:46', '0000-00-00 00:00:00', 22),
(129, 'LI CALSI Dario', '', '2024-05-30 10:19:46', '0000-00-00 00:00:00', 22),
(130, 'LINGUA Maria Teresa', '', '2024-05-30 10:19:46', '0000-00-00 00:00:00', 22),
(131, 'LORUSSO Vitina ', '', '2024-05-30 10:19:46', '0000-00-00 00:00:00', 22),
(132, 'LUBATTI Silvia', '', '2024-05-30 10:19:46', '0000-00-00 00:00:00', 22),
(133, 'LUCCI CHIARISSI Marta', '', '2024-05-30 10:19:46', '0000-00-00 00:00:00', 22),
(134, 'MACAGNO Paolo', '', '2024-05-30 10:19:46', '0000-00-00 00:00:00', 22),
(135, 'MAGGIORE Giampaolo', '', '2024-05-30 10:19:46', '0000-00-00 00:00:00', 22),
(136, 'MAIOLO Gianpaolo', '', '2024-05-30 10:19:46', '0000-00-00 00:00:00', 22),
(137, 'MANA Francesca ', '', '2024-05-30 10:19:46', '0000-00-00 00:00:00', 22),
(138, 'MANA Roberto', '', '2024-05-30 10:19:46', '0000-00-00 00:00:00', 22),
(139, 'MANCINO Federica', '', '2024-05-30 10:19:46', '0000-00-00 00:00:00', 22),
(140, 'MANCUSO CATARINELLA Graziella', '', '2024-05-30 10:19:46', '0000-00-00 00:00:00', 22),
(141, 'MANESCOTTO Guido', '', '2024-05-30 10:19:46', '0000-00-00 00:00:00', 22),
(142, 'MANFREDI Enrica', '', '2024-05-30 10:19:46', '0000-00-00 00:00:00', 22),
(143, 'MANGRAVITI Celeste Maria ', '', '2024-05-30 10:19:46', '0000-00-00 00:00:00', 22),
(144, 'MARAFANTE Ilenia', '', '2024-05-30 10:19:46', '0000-00-00 00:00:00', 22),
(145, 'MARENGO Michele ', '', '2024-05-30 10:19:46', '0000-00-00 00:00:00', 22),
(146, 'MAZZOTTA Gerardo', '', '2024-05-30 10:19:46', '0000-00-00 00:00:00', 22),
(147, 'MELOGNO Sergio', '', '2024-05-30 10:19:46', '0000-00-00 00:00:00', 22),
(148, 'MENARDI Martina ', '', '2024-05-30 10:19:46', '0000-00-00 00:00:00', 22),
(149, 'MENEGHETTI Tiziano', '', '2024-05-30 10:19:46', '0000-00-00 00:00:00', 22),
(150, 'MENTO Claudia', '', '2024-05-30 10:19:46', '0000-00-00 00:00:00', 22),
(151, 'MICCOLI Giuseppe         ', '', '2024-05-30 10:19:46', '0000-00-00 00:00:00', 22),
(152, 'MICHELOTTI Enrica', '', '2024-05-30 10:19:46', '0000-00-00 00:00:00', 22),
(153, 'MILANESIO Mario', '', '2024-05-30 10:19:46', '0000-00-00 00:00:00', 22),
(154, 'MILLESOLI Salvatore Fabio Maria ', '', '2024-05-30 10:19:46', '0000-00-00 00:00:00', 22),
(155, 'MONDINO Alberto ', '', '2024-05-30 10:19:46', '0000-00-00 00:00:00', 22),
(156, 'MONDINO Laura', '', '2024-05-30 10:19:46', '0000-00-00 00:00:00', 22),
(157, 'MONDINO Stefania', '', '2024-05-30 10:19:46', '0000-00-00 00:00:00', 22),
(158, 'MONGIARDO Marika', '', '2024-05-30 10:19:46', '0000-00-00 00:00:00', 22),
(159, 'MONTEVERDE Martino', '', '2024-05-30 10:19:46', '0000-00-00 00:00:00', 22),
(160, 'MORELLO Patrizia ', '', '2024-05-30 10:19:46', '0000-00-00 00:00:00', 22),
(161, 'MORTARA Simonetta', '', '2024-05-30 10:19:46', '0000-00-00 00:00:00', 22),
(162, 'MULATTIERI Sonia', '', '2024-05-30 10:19:46', '0000-00-00 00:00:00', 22),
(163, 'MUSSETTO Giuliana', '', '2024-05-30 10:19:46', '0000-00-00 00:00:00', 22),
(164, 'MUSSO Bernardo', '', '2024-05-30 10:19:46', '0000-00-00 00:00:00', 22),
(165, 'NARDI Mirella', '', '2024-05-30 10:19:46', '0000-00-00 00:00:00', 22),
(166, 'NECCHI Luca ', '', '2024-05-30 10:19:46', '0000-00-00 00:00:00', 22),
(167, 'NESI Valter', '', '2024-05-30 10:19:46', '0000-00-00 00:00:00', 22),
(168, 'OPERTI Silvana', '', '2024-05-30 10:19:46', '0000-00-00 00:00:00', 22),
(169, 'OSELLA Chiara', '', '2024-05-30 10:19:46', '0000-00-00 00:00:00', 22),
(170, 'OSELLA Vilma', '', '2024-05-30 10:19:46', '0000-00-00 00:00:00', 22),
(171, 'OTTONELLO Mauro', '', '2024-05-30 10:19:46', '0000-00-00 00:00:00', 22),
(172, 'PAGLIERO Germano', '', '2024-05-30 10:19:46', '0000-00-00 00:00:00', 22),
(173, 'PALA Maria Clelia', '', '2024-05-30 10:19:46', '0000-00-00 00:00:00', 22),
(174, 'PANERO Sabina', '', '2024-05-30 10:19:46', '0000-00-00 00:00:00', 22),
(175, 'PANERO Simona', '', '2024-05-30 10:19:46', '0000-00-00 00:00:00', 22),
(176, 'PANSA Marco Giuseppe', '', '2024-05-30 10:19:46', '0000-00-00 00:00:00', 22),
(177, 'PASCALE Mariagiovanna', '', '2024-05-30 10:19:46', '0000-00-00 00:00:00', 22),
(178, 'PASCHETTA Marco', '', '2024-05-30 10:19:46', '0000-00-00 00:00:00', 22),
(179, 'PASTORE Luca', '', '2024-05-30 10:19:46', '0000-00-00 00:00:00', 22),
(180, 'PEANO Maurizio', '', '2024-05-30 10:19:46', '0000-00-00 00:00:00', 22),
(181, 'PEDUTO Agnes Myriam Stephanie', '', '2024-05-30 10:19:46', '0000-00-00 00:00:00', 22),
(182, 'PELLEGRINO Ilaria ', '', '2024-05-30 10:19:46', '0000-00-00 00:00:00', 22),
(183, 'PERLO Marco Massimo', '', '2024-05-30 10:19:46', '0000-00-00 00:00:00', 22),
(184, 'PERUCCA Giuseppe', '', '2024-05-30 10:19:46', '0000-00-00 00:00:00', 22),
(185, 'PICCHETTI Federico', '', '2024-05-30 10:19:46', '0000-00-00 00:00:00', 22),
(186, 'PLATEROTI Lucia', '', '2024-05-30 10:19:46', '0000-00-00 00:00:00', 22),
(187, 'PORASSO Alice ', '', '2024-05-30 10:19:46', '0000-00-00 00:00:00', 22),
(188, 'PRIVITERA Luca ', '', '2024-05-30 10:19:46', '0000-00-00 00:00:00', 22),
(189, 'RACCA Mauro', '', '2024-05-30 10:19:46', '0000-00-00 00:00:00', 22),
(190, 'RACCA Michela ', '', '2024-05-30 10:19:46', '0000-00-00 00:00:00', 22),
(191, 'RACCA Simone', '', '2024-05-30 10:19:46', '0000-00-00 00:00:00', 22),
(192, 'RATEO Maurizio', '', '2024-05-30 10:19:46', '0000-00-00 00:00:00', 22),
(193, 'RATTI Marco', '', '2024-05-30 10:19:46', '0000-00-00 00:00:00', 22),
(194, 'RAVIOLA Alessia', '', '2024-05-30 10:19:46', '0000-00-00 00:00:00', 22),
(195, 'ROCCA Maria   ', '', '2024-05-30 10:19:46', '0000-00-00 00:00:00', 22),
(196, 'ROLFO Pieraldo', '', '2024-05-30 10:19:46', '0000-00-00 00:00:00', 22),
(197, 'ROSSI Daniela ', '', '2024-05-30 10:19:46', '0000-00-00 00:00:00', 22),
(198, 'ROSSI Francesca', '', '2024-05-30 10:19:46', '0000-00-00 00:00:00', 22),
(199, 'ROSSI Marcello', '', '2024-05-30 10:19:46', '0000-00-00 00:00:00', 22),
(200, 'RUARO Carlo', '', '2024-05-30 10:19:46', '0000-00-00 00:00:00', 22),
(201, 'RUSSO Roberto', '', '2024-05-30 10:19:46', '0000-00-00 00:00:00', 22),
(202, 'SALMERI Vincenza', '', '2024-05-30 10:19:46', '0000-00-00 00:00:00', 22),
(203, 'SALONE Giuseppe', '', '2024-05-30 10:19:46', '0000-00-00 00:00:00', 22),
(204, 'SAMPO\' Maurizio', '', '2024-05-30 10:19:46', '0000-00-00 00:00:00', 22),
(205, 'SANDRI Sandro', '', '2024-05-30 10:19:46', '0000-00-00 00:00:00', 22),
(206, 'SANFILIPPO Antonio', '', '2024-05-30 10:19:46', '0000-00-00 00:00:00', 22),
(207, 'SANINO Alessandro', '', '2024-05-30 10:19:46', '0000-00-00 00:00:00', 22),
(208, 'SANTANGELO Eleonora', '', '2024-05-30 10:19:46', '0000-00-00 00:00:00', 22),
(209, 'SBARDELLINI Tiziano', '', '2024-05-30 10:19:46', '0000-00-00 00:00:00', 22),
(210, 'SCAPATICCI Marina        ', '', '2024-05-30 10:19:46', '0000-00-00 00:00:00', 22),
(211, 'SERVETTI Debora', '', '2024-05-30 10:19:46', '0000-00-00 00:00:00', 22),
(212, 'TAMAGNO Cristiano', '', '2024-05-30 10:19:46', '0000-00-00 00:00:00', 22),
(213, 'TIANO Michele', '', '2024-05-30 10:19:46', '0000-00-00 00:00:00', 22),
(214, 'TOMATIS Claudio', '', '2024-05-30 10:19:46', '0000-00-00 00:00:00', 22),
(215, 'TONELLO Cristina', '', '2024-05-30 10:19:46', '0000-00-00 00:00:00', 22),
(216, 'TORASSA Danilo', '', '2024-05-30 10:19:46', '0000-00-00 00:00:00', 22),
(217, 'TORTONE Roberto', '', '2024-05-30 10:19:46', '0000-00-00 00:00:00', 22),
(218, 'TOSELLI Aldo', '', '2024-05-30 10:19:46', '0000-00-00 00:00:00', 22),
(219, 'TOSELLI Alessio', '', '2024-05-30 10:19:46', '0000-00-00 00:00:00', 22),
(220, 'VALLAURI Maria Lucia ', '', '2024-05-30 10:19:46', '0000-00-00 00:00:00', 22),
(221, 'VASCHETTO Francesco', '', '2024-05-30 10:19:46', '0000-00-00 00:00:00', 22),
(222, 'VERNASSA Gabriella', '', '2024-05-30 10:19:46', '0000-00-00 00:00:00', 22),
(223, 'VERTAMY Laura', '', '2024-05-30 10:19:46', '0000-00-00 00:00:00', 22),
(224, 'VIADA Paolo', '', '2024-05-30 10:19:46', '0000-00-00 00:00:00', 22),
(225, 'VILLOSIO Maria Angela', '', '2024-05-30 10:19:46', '0000-00-00 00:00:00', 22),
(226, 'VIRZI Domenico', '', '2024-05-30 10:19:46', '0000-00-00 00:00:00', 22),
(227, 'VISSIO Giancarlo', '', '2024-05-30 10:19:46', '0000-00-00 00:00:00', 22),
(228, 'ZINO Andrea', '', '2024-05-30 10:19:46', '0000-00-00 00:00:00', 22),
(229, '', '', '2024-05-30 10:19:46', '0000-00-00 00:00:00', 22),
(230, '', '', '2024-05-30 10:19:46', '0000-00-00 00:00:00', 22);

-- --------------------------------------------------------

--
-- Struttura della tabella `utenti`
--

CREATE TABLE `utenti` (
  `ID_Utente` int(11) NOT NULL,
  `Nome` varchar(50) NOT NULL,
  `Cognome` varchar(50) NOT NULL,
  `Email` varchar(100) NOT NULL,
  `Ruolo` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dump dei dati per la tabella `utenti`
--

INSERT INTO `utenti` (`ID_Utente`, `Nome`, `Cognome`, `Email`, `Ruolo`) VALUES
(1, 'Forna', 'Riki', 'rikifor05@gmail.com', 'docente esterno'),
(2, 'Narzole', 'Padel', 'narzolepadel@gmail.com', 'docente esterno'),
(3, 'Riccardo', 'Fornaseri', 'r.fornaseri.2245@vallauri.edu', 'amministratore');

--
-- Indici per le tabelle scaricate
--

--
-- Indici per le tabelle `collegi`
--
ALTER TABLE `collegi`
  ADD PRIMARY KEY (`ID_Collegio`),
  ADD KEY `Anno_Scolastico` (`Anno_Scolastico`);

--
-- Indici per le tabelle `delibere`
--
ALTER TABLE `delibere`
  ADD PRIMARY KEY (`ID_Delibera`),
  ADD KEY `ID_Collegio` (`ID_Collegio`);

--
-- Indici per le tabelle `presenze`
--
ALTER TABLE `presenze`
  ADD PRIMARY KEY (`ID_Presenza`),
  ADD KEY `FK_Collegio_Presenze` (`ID_Collegio`);

--
-- Indici per le tabelle `utenti`
--
ALTER TABLE `utenti`
  ADD PRIMARY KEY (`ID_Utente`);

--
-- AUTO_INCREMENT per le tabelle scaricate
--

--
-- AUTO_INCREMENT per la tabella `collegi`
--
ALTER TABLE `collegi`
  MODIFY `ID_Collegio` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT per la tabella `delibere`
--
ALTER TABLE `delibere`
  MODIFY `ID_Delibera` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT per la tabella `presenze`
--
ALTER TABLE `presenze`
  MODIFY `ID_Presenza` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=231;

--
-- AUTO_INCREMENT per la tabella `utenti`
--
ALTER TABLE `utenti`
  MODIFY `ID_Utente` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Limiti per le tabelle scaricate
--

--
-- Limiti per la tabella `delibere`
--
ALTER TABLE `delibere`
  ADD CONSTRAINT `FK_Collegio_delibere` FOREIGN KEY (`ID_Collegio`) REFERENCES `collegi` (`ID_Collegio`);

--
-- Limiti per la tabella `presenze`
--
ALTER TABLE `presenze`
  ADD CONSTRAINT `FK_Collegio_Presenze` FOREIGN KEY (`ID_Collegio`) REFERENCES `collegi` (`ID_Collegio`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
