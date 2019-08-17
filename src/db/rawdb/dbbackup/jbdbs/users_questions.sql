-- MySQL dump 10.13  Distrib 8.0.14, for Win64 (x86_64)
--
-- Host: localhost    Database: users
-- ------------------------------------------------------
-- Server version	8.0.14

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
 SET NAMES utf8 ;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `questions`
--

DROP TABLE IF EXISTS `questions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `questions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `category_id` varchar(45) DEFAULT NULL,
  `data` json DEFAULT NULL,
  `order` int(11) DEFAULT NULL,
  `date` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `type` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='type ''select'' radio, type ''file'', type ''text'', type ''table'', type ''check''';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `questions`
--

LOCK TABLES `questions` WRITE;
/*!40000 ALTER TABLE `questions` DISABLE KEYS */;
INSERT INTO `questions` VALUES (1,'1','{\"articles\": [\"yes\", \"no\"], \"question\": \"Do you think that aliens exist?\"}',0,'2019-08-17 21:46:22','select'),(2,'1','{\"articles\": [\"find\", \"thanks\", \"you\", \"no thanks\"], \"question\": \"If your job gave you a surprise three day paid break to rest and recuperate, what would you do with those three days\"}',1,'2019-08-17 21:51:04','select'),(3,'1','{\"articles\": [\"find\", \"thanks\", \"you\", \"no thanks\"], \"question\": \"If your job gave you a surprise three day paid break to rest and recuperate, what would you do with those three days\"}',2,'2019-08-17 21:51:04','check'),(4,'1','{\"articles\": [\"yes\", \"no\", \"I don\'t know\"], \"question\": \"What weird food combinations do you really enjoy?\"}',3,'2019-08-17 21:51:04','file'),(5,'1','{\"table\": [{\"datas\": [\"20%\", \"20%\", \"30%\", \"40%\"], \"title\": \"article1\"}, {\"datas\": [\"21%\", \"21%\", \"31%\", \"41%\"], \"title\": \"article2\"}, {\"datas\": [\"22%\", \"22%\", \"32%\", \"42%\"], \"title\": \"article3\"}], \"question\": \"What actors or actresses play the same character in almost every movie or show they do?\"}',4,'2019-08-17 21:51:04','table'),(6,'1','{\"question\": \"Do you think that aliens exist?\"}',5,'2019-08-17 21:51:04','text');
/*!40000 ALTER TABLE `questions` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-08-17 22:00:49
