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
  KEY `FK_Collegio` (`ID_Collegio`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
--
-- Struttura della tabella `utenti`
--

CREATE TABLE `utenti` (
  `ID_Utente` int(11) NOT NULL AUTO_INCREMENT,
  `NomeCognome` varchar(50) NOT NULL,
  `Email` varchar(100) NOT NULL,
  `Ruolo` varchar(100) NOT NULL,
  `ID_Collegio` int(11) NOT NULL,
    PRIMARY KEY (`ID_Utente`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dump dei dati per la tabella `utenti`
--

INSERT INTO `utenti` (`ID_Utente`, `NomeCognome`, `Email`, `Ruolo`,`ID_Collegio`) VALUES
(1, 'Forna Riki', 'rikifor05@gmail.com', 'docente esterno',1),
(2, 'Narzole Padel', 'Padel', 'narzolepadel@gmail.com', 'docente esterno',1),
(3, 'FORNASERI RICCARDO', 'r.fornaseri.2245@vallauri.edu', 'amministratore',1);

--
-- Indici per le tabelle scaricate
--

--
-- Indici per le tabelle `collegi`
--
ALTER TABLE `collegi`
  ADD PRIMARY KEY (`ID_Collegio`),
 

--
-- Indici per le tabelle `delibere`
--
ALTER TABLE `delibere`
  ADD PRIMARY KEY (`ID_Delibera`),
 
--
-- Indici per le tabelle `presenze`
--
ALTER TABLE `presenze`
  ADD PRIMARY KEY (`ID_Presenza`),
 

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
--
-- Limiti per la tabella `presenze`
--


/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
