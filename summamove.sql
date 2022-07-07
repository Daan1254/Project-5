-- --------------------------------------------------------
-- Host:                         191.96.96.200
-- Server versie:                10.6.8-MariaDB-1:10.6.8+maria~focal - mariadb.org binary distribution
-- Server OS:                    debian-linux-gnu
-- HeidiSQL Versie:              11.0.0.5919
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


-- Databasestructuur van s3192_DaanApi wordt geschreven
CREATE DATABASE IF NOT EXISTS `s3192_DaanApi` /*!40100 DEFAULT CHARACTER SET utf8mb4 */;
USE `s3192_DaanApi`;

-- Structuur van  tabel s3192_DaanApi.oefeningen wordt geschreven
CREATE TABLE IF NOT EXISTS `oefeningen` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(40) NOT NULL,
  `description` varchar(640) NOT NULL,
  `picture` longtext NOT NULL DEFAULT 'http://cdn.onlinewebfonts.com/svg/img_118586.png',
  `spiergroepid` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_oefeningen_spiergroepen` (`spiergroepid`),
  CONSTRAINT `FK_oefeningen_spiergroepen` FOREIGN KEY (`spiergroepid`) REFERENCES `spiergroepen` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=latin1;

-- Dumpen data van tabel s3192_DaanApi.oefeningen: ~5 rows (ongeveer)
/*!40000 ALTER TABLE `oefeningen` DISABLE KEYS */;
INSERT INTO `oefeningen` (`id`, `name`, `description`, `picture`, `spiergroepid`) VALUES
	(2, 'Squad', 'Een squat kan je uitvoeren met of zonder extra gewicht. Zonder gewicht train je je benen, billen, heupen, kuiten en buik. En door gewichten toe te voegen pak je ook je rug en armen mee. dit is een testtt', 'https://media.istockphoto.com/photos/handsome-man-working-out-at-the-gym-picture-id1205094548?k=20&m=1205094548&s=612x612&w=0&h=7NoNAagLKKRkKGzWHxY9qqVwVgnD9zXyK6AZAlwoBIg=', 1),
	(3, 'Bench press', 'Bankdrukken pakt vooral de borstspieren, voorkant van je schouders en triceps aan. Wanneer je het gewicht weer naar beneden brengt, roep je ook (in mindere mate) je rugspieren en biceps aan om te stabiliseren. Dat maakt de oefening een mooie allrounder voor het hele bovenlichaam.', 'https://www.muscleandfitness.com/wp-content/uploads/2020/02/Ronnie-Coleman-Decline-Barbell-Press-Chest-Workout.jpg?w=1109&h=614&crop=1&quality=86&strip=all', 4),
	(4, 'Lungee', 'Bij de lunge train je vooral op sterke benen en billen. Maar je spreekt ook andere groepen aan, zoals de rug, hamstring, bovenbenen en kuiten. Door te variëren met verschillende typen lunges pak je steeds weer andere spieren mee.', 'data:image/jpeg;base64,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', 1),
	(10, 'Pull up', 'Je hangt aan een bar en probeert jezelf met goede vorm omhoog te trekken. Als het goed uitgevoerd wordt dan voel je dit in je rug.', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDsy3Ve0gAGTujf772elNafOlUuGGQvhfj_Wc0uy9w6rgyEBstum_7b_VfHwe_e_H_DqA&usqp=CAU', 3),
	(17, 'Deadlift', 'hele taaie oefening voor sterke mannen', 'https://www.muscleandfitness.com/wp-content/uploads/2018/12/1109-Larry-Wheels-Deadlift.jpg?w=1109&quality=86&strip=all', NULL);
/*!40000 ALTER TABLE `oefeningen` ENABLE KEYS */;

-- Structuur van  tabel s3192_DaanApi.prestaties wordt geschreven
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
  KEY `oefeningid` (`oefeningid`),
  CONSTRAINT `prestaties_ibfk_1` FOREIGN KEY (`userid`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `prestaties_ibfk_2` FOREIGN KEY (`oefeningid`) REFERENCES `oefeningen` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=latin1;

-- Dumpen data van tabel s3192_DaanApi.prestaties: ~3 rows (ongeveer)
/*!40000 ALTER TABLE `prestaties` DISABLE KEYS */;
INSERT INTO `prestaties` (`id`, `userid`, `oefeningid`, `datum`, `starttijd`, `eindtijd`, `reps`) VALUES
	(1, 1, 3, '2022-06-23', '12:12:00', '23:15:00', 3),
	(2, 21, 2, '2022-06-23', '12:45:00', '12:40:00', 6),
	(8, 1, 2, '2022-06-03', '12:12:00', '12:12:00', 22);
/*!40000 ALTER TABLE `prestaties` ENABLE KEYS */;

-- Structuur van  tabel s3192_DaanApi.roles wordt geschreven
CREATE TABLE IF NOT EXISTS `roles` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `role` varchar(360) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

-- Dumpen data van tabel s3192_DaanApi.roles: ~2 rows (ongeveer)
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` (`id`, `role`) VALUES
	(1, 'Admin'),
	(2, 'Gebruiker');
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;

-- Structuur van  tabel s3192_DaanApi.spiergroepen wordt geschreven
CREATE TABLE IF NOT EXISTS `spiergroepen` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT NULL,
  `img` longtext DEFAULT NULL,
  `description` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4;

-- Dumpen data van tabel s3192_DaanApi.spiergroepen: ~4 rows (ongeveer)
/*!40000 ALTER TABLE `spiergroepen` DISABLE KEYS */;
INSERT INTO `spiergroepen` (`id`, `name`, `img`, `description`) VALUES
	(1, 'Legs', 'https://www.muscleandfitness.com/wp-content/uploads/2000/09/Man-And-Woman-Showing-Muscular-Legs.jpg?w=1109&quality=86&strip=all', 'op legg day trainen we de heel je onder lichaam. hierbij hoort Quads, Glutes, hamstring en Calves. '),
	(2, 'Upper body', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfkJG5UhD_cUQgTXeI9_mHWl7-fGI2eyKptA&usqp=CAU', 'Als je upper body trained train je heel je boven lichaam. Wij leggen het meeste focus op de chest, omdat deze moeilijker is om te groeien bij de meeste mensen.'),
	(3, 'Pull day', 'https://olimpsport.com/media/mageplaza/blog/post/image//t/r/trening-4_1.jpg', 'Een push dag bestaat uit spiergroepen waarbij je een drukbeweging doet. Dit gaat voornamelijk om de spiergroepen van de voorkant van je lichaam, zoals je borst, schouders, triceps, bovenbenen, buikspieren en kuiten. Een pull dag bestaat uit spiergroepen waarbij je een trekbeweging doet.'),
	(4, 'Push day', 'https://onnitacademy.imgix.net/wp-content/uploads/2018/12/ChestGuy.jpg', 'een push-day-training bestaat uit oefeningen voor het bovenlichaam waarbij gebruik wordt gemaakt van een duwende beweging. Deze oefeningen zijn voornamelijk gericht op de borst, schouders en triceps.');
/*!40000 ALTER TABLE `spiergroepen` ENABLE KEYS */;



-- Structuur van  tabel s3192_DaanApi.users wordt geschreven
CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(25) NOT NULL,
  `password` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  `roleid` int(11) NOT NULL DEFAULT 2,
  PRIMARY KEY (`id`),
  KEY `roleid` (`roleid`),
  CONSTRAINT `users_ibfk_1` FOREIGN KEY (`roleid`) REFERENCES `roles` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=latin1;

-- Dumpen data van tabel s3192_DaanApi.users: ~5 rows (ongeveer)
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` (`id`, `username`, `password`, `email`, `roleid`) VALUES
	(1, 'admin', 'admin', 'admin@gmail.com', 1),
	(21, 'Tijn', 'Tijn', 'tijn@tijnknapen.nl', 1),
	(22, 'Daan', 'Daan', 'Daan', 2),
	(23, 'gebruiker', 'password', 'gebruiker@gmail.com', 2),
	(24, 'gebruiker', 'gebruiker', 'gebruiker@gmail.com', 1),
	(29, 'Jantje', 'password', 'gebruiker@gmail.com', 1);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
