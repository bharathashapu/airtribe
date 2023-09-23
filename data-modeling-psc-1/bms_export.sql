-- MySQL dump 10.13  Distrib 8.0.34, for Linux (x86_64)
--
-- Host: localhost    Database: bms
-- ------------------------------------------------------
-- Server version	8.0.34-0ubuntu0.22.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `movie`
--

DROP TABLE IF EXISTS `movie`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `movie` (
  `id` bigint NOT NULL,
  `name` varchar(100) NOT NULL,
  `description` varchar(250) DEFAULT NULL,
  `languages` varchar(50) DEFAULT NULL,
  `genre` varchar(30) DEFAULT NULL,
  `releaseDate` date DEFAULT NULL,
  `duration` int DEFAULT NULL,
  `certificate` varchar(5) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `movie`
--

LOCK TABLES `movie` WRITE;
/*!40000 ALTER TABLE `movie` DISABLE KEYS */;
INSERT INTO `movie` VALUES (1,'Jawan','A high-octane action thriller that outlines the emotional journey of a man who is set to rectify the wrongs in society','Hindi, Telugu, Tamil','Action, Thriller','2023-09-07',169,'U/A'),(2,'The Nun II','The sequel to the worldwide smash hit follows Sister Irene as she once again comes face-to-face with Valak, the demon nun','English, Hindi, Telugu, Tamil','Horror, Mystery, Thriller','2023-09-07',111,'A'),(3,'Gadar II','Gadar 2 brings back India\'s most loved family of Tara, Sakeena and Jeete; 22 years after its predecessor. Set against the backdrop of Indo-Pakistan war 1971, Tara Singh, oce again, will face every enemey to protect the honor of country and family','Hindi','Action, Drama, Period','2023-08-11',170,'U/A');
/*!40000 ALTER TABLE `movie` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `shows`
--

DROP TABLE IF EXISTS `shows`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `shows` (
  `id` bigint NOT NULL,
  `date` date NOT NULL,
  `time` time NOT NULL,
  `totalSeats` int DEFAULT NULL,
  `format` varchar(50) DEFAULT NULL,
  `language` varchar(30) DEFAULT NULL,
  `dimension` varchar(10) DEFAULT NULL,
  `hallNumber` int DEFAULT NULL,
  `theatreID` bigint DEFAULT NULL,
  `movieID` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `theatreID` (`theatreID`),
  KEY `movieID` (`movieID`),
  CONSTRAINT `shows_ibfk_1` FOREIGN KEY (`theatreID`) REFERENCES `theatre` (`id`),
  CONSTRAINT `shows_ibfk_2` FOREIGN KEY (`movieID`) REFERENCES `movie` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `shows`
--

LOCK TABLES `shows` WRITE;
/*!40000 ALTER TABLE `shows` DISABLE KEYS */;
INSERT INTO `shows` VALUES (1,'2023-09-07','11:15:00',60,'IMAX','Telugu','2D',1,1,1),(2,'2023-09-07','15:45:00',60,'DOLBY 5.1','Hindi','2D',2,1,2),(3,'2023-09-07','22:10:00',60,'RDX SOUND','Hindi','2D',3,1,3),(4,'2023-09-08','11:00:00',120,'ICE','Hindi','2D',1,2,1),(5,'2023-09-08','14:00:00',120,'DOLBY 8.1','English','4DX',2,2,2),(6,'2023-09-08','18:00:00',120,'IMAX','Hindi','3D',3,2,3),(7,'2023-09-08','21:00:00',120,'DOLBY 5.1','Tamil','2D',4,2,1),(8,'2023-09-09','11:45:00',150,'DOLBY 8.1','Telugu','2D',1,3,1),(9,'2023-09-09','13:15:00',150,'4K PROJECTION','English','2D',2,3,2),(10,'2023-09-09','16:40:00',150,'DOLBY ATMOS','Hindi','2D',3,3,3),(11,'2023-09-09','20:30:00',150,'DOLBY 8.1','Tamil','2D',4,3,1);
/*!40000 ALTER TABLE `shows` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `theatre`
--

DROP TABLE IF EXISTS `theatre`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `theatre` (
  `id` bigint NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `totalHalls` int DEFAULT NULL,
  `city` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `theatre`
--

LOCK TABLES `theatre` WRITE;
/*!40000 ALTER TABLE `theatre` DISABLE KEYS */;
INSERT INTO `theatre` VALUES (1,'PVR: Hyderabad',7,'Hyderabad'),(2,'PVR: Bangalore Electronic City',5,'Banaglore'),(3,'PVR: Nogix Superplex Mall',7,'Noida'),(4,'AMB Cinemas: Gachibowli',7,'Hyderabad');
/*!40000 ALTER TABLE `theatre` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-09-23 21:10:39
