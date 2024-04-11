
CREATE TABLE Utenti (
    ID_Utente INT AUTO_INCREMENT PRIMARY KEY,
    Nome VARCHAR(50) NOT NULL,
    Cognome VARCHAR(50) NOT NULL,
    Email VARCHAR(100) NOT NULL,
    Ruolo ENUM('docente', 'non amministratore', 'amministratore') NOT NULL,
    Password VARCHAR(255) NOT NULL
);

CREATE TABLE Collegi (
    ID_Collegio INT AUTO_INCREMENT PRIMARY KEY,
    Titolo VARCHAR(100) NOT NULL,
    Data_Inizio DATE NOT NULL,
    Data_Fine DATE,
    File_CSV VARCHAR(255) DEFAULT NULL
);

CREATE TABLE Delibere (
    ID_Delibera INT AUTO_INCREMENT PRIMARY KEY,
    ID_Collegio INT NOT NULL,
    Descrizione TEXT NOT NULL,
    Stato ENUM('in attesa', 'avviata') NOT NULL DEFAULT  ‘in attesa’,
    Risultato ENUM('approvata', 'non approvata', 'astenuta') DEFAULT NULL,
    FOREIGN KEY (ID_Collegio) REFERENCES Collegi(ID_Collegio)
);

CREATE TABLE Presenze (
    ID_Presenza INT AUTO_INCREMENT PRIMARY KEY,
    ID_Utente INT NOT NULL,
    ID_Collegio INT NOT NULL,
    DataOra_Registrazione DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (ID_Utente) REFERENCES Utenti(ID_Utente),
    FOREIGN KEY (ID_Collegio) REFERENCES Collegi(ID_Collegio)
);

CREATE TABLE Voti (
    ID_Voto INT AUTO_INCREMENT PRIMARY KEY,
    ID_Utente INT NOT NULL,
    ID_Delibera INT NOT NULL,
    TipoVoto ENUM('approvato', 'non approvato', 'astenuto') NOT NULL,
    FOREIGN KEY (ID_Utente) REFERENCES Utenti(ID_Utente),
    FOREIGN KEY (ID_Delibera) REFERENCES Delibere(ID_Delibera)
);
