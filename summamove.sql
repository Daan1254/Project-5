-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Gegenereerd op: 16 jun 2022 om 10:32
-- Serverversie: 5.7.36
-- PHP-versie: 8.0.13

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `summamove`
--
CREATE DATABASE IF NOT EXISTS `s3192_DaanApi` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `s3192_DaanApi`;

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `oefeningen`
--

DROP TABLE IF EXISTS `oefeningen`;
CREATE TABLE IF NOT EXISTS `oefeningen` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(40) NOT NULL,
  `description` varchar(640) NOT NULL,
  `picture` longtext NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

--
-- Gegevens worden geëxporteerd voor tabel `oefeningen`
--

INSERT INTO `oefeningen` (`id`, `name`, `description`, `picture`) VALUES
(1, 'Squats', 'doe 100kg squats', 'https://www.muscleandfitness.com/wp-content/uploads/2018/11/ronnie-coleman-squat-1109.jpg?quality=86&strip=all');

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `prestaties`
--

DROP TABLE IF EXISTS `prestaties`;
CREATE TABLE IF NOT EXISTS `prestaties` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userid` int(11) NOT NULL,
  `oefeningid` int(11) NOT NULL,
  `datum` date NOT NULL,
  `starttijd` time NOT NULL,
  `eindtijd` time NOT NULL,
  `reps` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `userid` (`userid`),
  KEY `oefeningid` (`oefeningid`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

--
-- Gegevens worden geëxporteerd voor tabel `prestaties`
--

INSERT INTO `prestaties` (`id`, `userid`, `oefeningid`, `datum`, `starttijd`, `eindtijd`, `reps`) VALUES
(1, 2, 1, '2022-06-16', '12:31:35', '12:39:36', 8);

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `roles`
--

DROP TABLE IF EXISTS `roles`;
CREATE TABLE IF NOT EXISTS `roles` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `role` varchar(360) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

--
-- Gegevens worden geëxporteerd voor tabel `roles`
--

INSERT INTO `roles` (`id`, `role`) VALUES
(1, 'Beheerder'),
(2, 'Gebruiker');

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(25) NOT NULL,
  `roleid` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `roleid` (`roleid`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

--
-- Gegevens worden geëxporteerd voor tabel `users`
--

INSERT INTO `users` (`id`, `username`, `roleid`) VALUES
(1, 'admin', 1),
(2, 'daan', 2);

--
-- Beperkingen voor geëxporteerde tabellen
--

--
-- Beperkingen voor tabel `prestaties`
--
ALTER TABLE `prestaties`
  ADD CONSTRAINT `prestaties_ibfk_1` FOREIGN KEY (`userid`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `prestaties_ibfk_2` FOREIGN KEY (`oefeningid`) REFERENCES `oefeningen` (`id`);

--
-- Beperkingen voor tabel `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`roleid`) REFERENCES `roles` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
