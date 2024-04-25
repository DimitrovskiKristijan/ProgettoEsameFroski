-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Creato il: Apr 16, 2024 alle 16:52
-- Versione del server: 10.4.28-MariaDB
-- Versione PHP: 8.2.4

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
  `ID_Collegio` int(11) NOT NULL,
  `Titolo` varchar(100) NOT NULL,
  `Ora_Inizio` date NOT NULL,
  `Ora_Fine` date DEFAULT NULL,
  `Data_Collegio` date DEFAULT NULL,
  `File_CSV` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
  `ID_Presenza` int(11) NOT NULL,
  `ID_Utente` int(11) NOT NULL,
  `ID_Collegio` int(11) NOT NULL,
  `DataOra_Registrazione` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struttura della tabella `utenti`
--

CREATE TABLE `utenti` (
  `ID_Utente` int(11) NOT NULL,
  `Nome` varchar(50) NOT NULL,
  `Cognome` varchar(50) NOT NULL,
  `Email` varchar(100) NOT NULL,
  `Ruolo` varchar(100) NOT NULL,
  `Password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struttura della tabella `voti`
--

CREATE TABLE `voti` (
  `ID_Voto` int(11) NOT NULL,
  `ID_Utente` int(11) NOT NULL,
  `ID_Delibera` int(11) NOT NULL,
  `TipoVoto` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indici per le tabelle scaricate
--

--
-- Indici per le tabelle `collegi`
--
ALTER TABLE `collegi`
  ADD PRIMARY KEY (`ID_Collegio`);

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
  ADD KEY `ID_Utente` (`ID_Utente`),
  ADD KEY `ID_Collegio` (`ID_Collegio`);

--
-- Indici per le tabelle `utenti`
--
ALTER TABLE `utenti`
  ADD PRIMARY KEY (`ID_Utente`);

--
-- Indici per le tabelle `voti`
--
ALTER TABLE `voti`
  ADD PRIMARY KEY (`ID_Voto`),
  ADD KEY `ID_Utente` (`ID_Utente`),
  ADD KEY `ID_Delibera` (`ID_Delibera`);

--
-- AUTO_INCREMENT per le tabelle scaricate
--

--
-- AUTO_INCREMENT per la tabella `collegi`
--
ALTER TABLE `collegi`
  MODIFY `ID_Collegio` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT per la tabella `delibere`
--
ALTER TABLE `delibere`
  MODIFY `ID_Delibera` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT per la tabella `presenze`
--
ALTER TABLE `presenze`
  MODIFY `ID_Presenza` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT per la tabella `utenti`
--
ALTER TABLE `utenti`
  MODIFY `ID_Utente` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT per la tabella `voti`
--
ALTER TABLE `voti`
  MODIFY `ID_Voto` int(11) NOT NULL AUTO_INCREMENT;

--
-- Limiti per le tabelle scaricate
--

--
-- Limiti per la tabella `delibere`
--
ALTER TABLE `delibere`
  ADD CONSTRAINT `delibere_ibfk_1` FOREIGN KEY (`ID_Collegio`) REFERENCES `collegi` (`ID_Collegio`);

--
-- Limiti per la tabella `presenze`
--
ALTER TABLE `presenze`
  ADD CONSTRAINT `presenze_ibfk_1` FOREIGN KEY (`ID_Utente`) REFERENCES `utenti` (`ID_Utente`),
  ADD CONSTRAINT `presenze_ibfk_2` FOREIGN KEY (`ID_Collegio`) REFERENCES `collegi` (`ID_Collegio`);

--
-- Limiti per la tabella `voti`
--
ALTER TABLE `voti`
  ADD CONSTRAINT `voti_ibfk_1` FOREIGN KEY (`ID_Utente`) REFERENCES `utenti` (`ID_Utente`),
  ADD CONSTRAINT `voti_ibfk_2` FOREIGN KEY (`ID_Delibera`) REFERENCES `delibere` (`ID_Delibera`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
