-- MySQL dump 10.13  Distrib 8.0.17, for Win64 (x86_64)
--
-- Host: localhost    Database: qesgs
-- ------------------------------------------------------
-- Server version	8.0.17

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
-- Table structure for table `answers`
--

DROP TABLE IF EXISTS `answers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `answers` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uid` varchar(45) DEFAULT NULL,
  `answers` json DEFAULT NULL,
  `user_id` varchar(25) DEFAULT NULL,
  `category_id` int(11) DEFAULT NULL,
  `date` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `answers`
--

LOCK TABLES `answers` WRITE;
/*!40000 ALTER TABLE `answers` DISABLE KEYS */;
/*!40000 ALTER TABLE `answers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `answers_confirm`
--

DROP TABLE IF EXISTS `answers_confirm`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `answers_confirm` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uid` varchar(45) DEFAULT NULL,
  `answers` json DEFAULT NULL,
  `user_id` varchar(255) DEFAULT NULL,
  `category_id` int(11) DEFAULT NULL,
  `date` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `answers_confirm`
--

LOCK TABLES `answers_confirm` WRITE;
/*!40000 ALTER TABLE `answers_confirm` DISABLE KEYS */;
/*!40000 ALTER TABLE `answers_confirm` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `desc` varchar(45) DEFAULT NULL,
  `child` tinyint(4) DEFAULT NULL,
  `parent_id` int(11) DEFAULT NULL,
  `company_code` varchar(45) DEFAULT NULL,
  `haschild` tinyint(4) DEFAULT '0',
  `part` varchar(255) DEFAULT '',
  `order` int(11) DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (9,'근로조건1','근로조건1',1,11,'sam1',0,'',0),(10,'근로조건2','근로조건2',1,11,'sam1',0,'',0),(11,'근로조건','일반관리조사',0,NULL,'sam1',0,'',0),(12,'일반관리','일반관리조사',0,NULL,'sam1',0,'',1),(13,'환경','환경관리조사',0,NULL,'sam1',0,'',2);
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ccategories`
--

DROP TABLE IF EXISTS `ccategories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ccategories` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `company_id` int(11) DEFAULT NULL,
  `part` varchar(45) DEFAULT NULL,
  `data` json DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `desc` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ccategories`
--

LOCK TABLES `ccategories` WRITE;
/*!40000 ALTER TABLE `ccategories` DISABLE KEYS */;
/*!40000 ALTER TABLE `ccategories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `company_info`
--

DROP TABLE IF EXISTS `company_info`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `company_info` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `code` varchar(45) DEFAULT NULL,
  `name` varchar(45) DEFAULT NULL,
  `desc` varchar(45) DEFAULT NULL,
  `part` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `code_UNIQUE` (`code`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `company_info`
--

LOCK TABLES `company_info` WRITE;
/*!40000 ALTER TABLE `company_info` DISABLE KEYS */;
INSERT INTO `company_info` VALUES (1,'amo1',' AMOREPACIFIC CORPORATION','아모레 퍼시픽',NULL),(2,'sam1','삼성전자 사업부','삼성 전자 사업부',NULL);
/*!40000 ALTER TABLE `company_info` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cquestions`
--

DROP TABLE IF EXISTS `cquestions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cquestions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `category_id` int(11) DEFAULT NULL,
  `data` json DEFAULT NULL,
  `order` int(11) DEFAULT NULL,
  `date` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `type` varchar(45) DEFAULT NULL,
  `activate` tinyint(4) DEFAULT '1',
  `revision` int(11) NOT NULL DEFAULT '0',
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=99 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='type ''select'' radio, type ''file'', type ''text'', type ''table'', type ''check''';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cquestions`
--

LOCK TABLES `cquestions` WRITE;
/*!40000 ALTER TABLE `cquestions` DISABLE KEYS */;
INSERT INTO `cquestions` VALUES (83,12,'{\"pages\": [{\"name\": \"페이지1\", \"elements\": [{\"name\": \"패널2\", \"type\": \"panel\", \"elements\": [{\"name\": \"질문1\", \"type\": \"radiogroup\", \"title\": \"귀사에는 사회적 지속가능성 책임 관리자가 있습니까?\", \"choices\": [{\"text\": \"아니오\", \"value\": \"item1\"}, {\"text\": \"예  ※ 예라면 담당자 기입바랍니다\", \"value\": \"item2\"}], \"colCount\": 2, \"titleLocation\": \"top\"}, {\"name\": \"질문3\", \"type\": \"text\", \"title\": \"* 책임 관리자 담당자 기입\", \"indent\": 1, \"visibleIf\": \"{질문1} = \\\"item2\\\"\", \"startWithNewLine\": false}]}, {\"name\": \"패널1\", \"type\": \"panel\", \"elements\": [{\"name\": \"질문2\", \"type\": \"radiogroup\", \"title\": \"귀사에는 컴플라이언스 담당자(준법담당자)가 있습니까?\", \"choices\": [{\"text\": \"아니오\", \"value\": \"item1\"}, {\"text\": \"예  ※ 예라면 담당자 기입바랍니다\", \"value\": \"item2\"}], \"colCount\": 2}, {\"name\": \"질문4\", \"type\": \"text\", \"title\": \"* 준법담당자 기입\", \"indent\": 1, \"prefix\": \"p\", \"visibleIf\": \"{질문2} = \\\"item2\\\"\", \"startWithNewLine\": false}]}, {\"name\": \"패널3\", \"type\": \"panel\"}, {\"name\": \"질문5\", \"type\": \"radiogroup\", \"title\": \"귀사에는 환경 지속가능성 책임 관리자가 있습니까?\", \"choices\": [{\"text\": \"아니오\", \"value\": \"item1\"}, {\"text\": \"예  ※ 예라면 담당자 기입바랍니다\", \"value\": \"item2\"}]}, {\"name\": \"질문6\", \"type\": \"text\", \"title\": \"* 환경 지속 담당자 기입\", \"indent\": 1, \"prefix\": \"p\", \"visibleIf\": \"{질문5} = \\\"item2\\\"\", \"startWithNewLine\": false}, {\"name\": \"질문7\", \"type\": \"radiogroup\", \"title\": \"CSR 또는 지속가능성 보고서에 회사의 모든 운영 내용이 포함되어 있습니까?\", \"choices\": [{\"text\": \"예\", \"value\": \"item1\"}, {\"text\": \"아니요\", \"value\": \"item2\"}]}, {\"name\": \"패널4\", \"type\": \"panel\", \"indent\": -1, \"elements\": [{\"name\": \"질문8\", \"type\": \"radiogroup\", \"title\": \"귀사는 행동강령을 시행하고 있습니까?\", \"choices\": [{\"text\": \"예\", \"value\": \"item1\"}, {\"text\": \"아니요\", \"value\": \"item2\"}], \"otherText\": \"※ 관련 문서 첨부 필요\"}, {\"name\": \"질문9\", \"type\": \"file\", \"title\": \"행동 강력 시행 여부 관련 첨부파일\", \"maxSize\": 0}], \"readOnly\": true, \"isRequired\": true}]}]}',NULL,'2019-09-14 22:43:54',NULL,1,0,NULL),(84,12,'{\"pages\": [{\"name\": \"페이지1\", \"elements\": [{\"name\": \"패널2\", \"type\": \"panel\", \"elements\": [{\"name\": \"질문1\", \"type\": \"radiogroup\", \"title\": \"귀사에는 사회적 지속가능성 책임 관리자가 있습니까?\", \"choices\": [{\"text\": \"아니오\", \"value\": \"item1\"}, {\"text\": \"예  ※ 예라면 담당자 기입바랍니다\", \"value\": \"item2\"}], \"titleLocation\": \"top\"}, {\"name\": \"질문3\", \"type\": \"text\", \"title\": \"* 책임 관리자 담당자 기입\", \"indent\": 1, \"visibleIf\": \"{질문1} = \\\"item2\\\"\", \"startWithNewLine\": false}]}, {\"name\": \"패널1\", \"type\": \"panel\", \"elements\": [{\"name\": \"질문2\", \"type\": \"radiogroup\", \"title\": \"귀사에는 컴플라이언스 담당자(준법담당자)가 있습니까?\", \"choices\": [{\"text\": \"아니오\", \"value\": \"item1\"}, {\"text\": \"예  ※ 예라면 담당자 기입바랍니다\", \"value\": \"item2\"}]}, {\"name\": \"질문4\", \"type\": \"text\", \"title\": \"* 준법담당자 기입\", \"indent\": 1, \"prefix\": \"p\", \"visibleIf\": \"{질문2} = \\\"item2\\\"\", \"startWithNewLine\": false}]}, {\"name\": \"패널3\", \"type\": \"panel\"}, {\"name\": \"질문5\", \"type\": \"radiogroup\", \"title\": \"귀사에는 환경 지속가능성 책임 관리자가 있습니까?\", \"choices\": [{\"text\": \"아니오\", \"value\": \"item1\"}, {\"text\": \"예  ※ 예라면 담당자 기입바랍니다\", \"value\": \"item2\"}]}, {\"name\": \"질문6\", \"type\": \"text\", \"title\": \"* 환경 지속 담당자 기입\", \"indent\": 1, \"prefix\": \"p\", \"visibleIf\": \"{질문5} = \\\"item2\\\"\", \"startWithNewLine\": false}, {\"name\": \"질문7\", \"type\": \"radiogroup\", \"title\": \"CSR 또는 지속가능성 보고서에 회사의 모든 운영 내용이 포함되어 있습니까?\", \"choices\": [{\"text\": \"예\", \"value\": \"item1\"}, {\"text\": \"아니요\", \"value\": \"item2\"}]}, {\"name\": \"패널4\", \"type\": \"panel\", \"indent\": -1, \"elements\": [{\"name\": \"질문8\", \"type\": \"radiogroup\", \"title\": \"귀사는 행동강령을 시행하고 있습니까?\", \"choices\": [{\"text\": \"예\", \"value\": \"item1\"}, {\"text\": \"아니요\", \"value\": \"item2\"}], \"otherText\": \"※ 관련 문서 첨부 필요\"}, {\"name\": \"질문9\", \"type\": \"file\", \"title\": \"행동 강력 시행 여부 관련 첨부파일\", \"maxSize\": 0}], \"readOnly\": true, \"isRequired\": true}]}]}',NULL,'2019-09-14 22:46:01',NULL,1,0,NULL),(85,12,'{\"pages\": [{\"name\": \"페이지1\", \"elements\": [{\"name\": \"패널2\", \"type\": \"panel\", \"elements\": [{\"name\": \"질문1\", \"type\": \"radiogroup\", \"title\": \"귀사에는 사회적 지속가능성 책임 관리자가 있습니까?\", \"choices\": [{\"text\": \"아니오\", \"value\": \"item1\"}, {\"text\": \"예  ※ 예라면 담당자 기입바랍니다\", \"value\": \"item2\"}], \"titleLocation\": \"top\"}, {\"name\": \"질문3\", \"type\": \"text\", \"title\": \"* 책임 관리자 담당자 기입\", \"indent\": 1, \"visibleIf\": \"{질문1} = \\\"item2\\\"\", \"startWithNewLine\": false}]}, {\"name\": \"패널1\", \"type\": \"panel\", \"elements\": [{\"name\": \"질문2\", \"type\": \"radiogroup\", \"title\": \"귀사에는 컴플라이언스 담당자(준법담당자)가 있습니까?\", \"choices\": [{\"text\": \"아니오\", \"value\": \"item1\"}, {\"text\": \"예  ※ 예라면 담당자 기입바랍니다\", \"value\": \"item2\"}]}, {\"name\": \"질문4\", \"type\": \"text\", \"title\": \"* 준법담당자 기입\", \"indent\": 1, \"prefix\": \"p\", \"visibleIf\": \"{질문2} = \\\"item2\\\"\", \"startWithNewLine\": false}]}, {\"name\": \"패널3\", \"type\": \"panel\"}, {\"name\": \"질문5\", \"type\": \"radiogroup\", \"title\": \"귀사에는 환경 지속가능성 책임 관리자가 있습니까?\", \"choices\": [{\"text\": \"아니오\", \"value\": \"item1\"}, {\"text\": \"예  ※ 예라면 담당자 기입바랍니다\", \"value\": \"item2\"}]}, {\"name\": \"질문6\", \"type\": \"text\", \"title\": \"* 환경 지속 담당자 기입\", \"indent\": 1, \"prefix\": \"p\", \"visibleIf\": \"{질문5} = \\\"item2\\\"\", \"startWithNewLine\": false}, {\"name\": \"질문7\", \"type\": \"radiogroup\", \"title\": \"CSR 또는 지속가능성 보고서에 회사의 모든 운영 내용이 포함되어 있습니까?\", \"choices\": [{\"text\": \"예\", \"value\": \"item1\"}, {\"text\": \"아니요\", \"value\": \"item2\"}]}, {\"name\": \"패널4\", \"type\": \"panel\", \"indent\": -1, \"elements\": [{\"name\": \"질문8\", \"type\": \"radiogroup\", \"title\": \"귀사는 행동강령을 시행하고 있습니까?\", \"choices\": [{\"text\": \"예\", \"value\": \"item1\"}, {\"text\": \"아니요\", \"value\": \"item2\"}], \"otherText\": \"※ 관련 문서 첨부 필요\"}, {\"name\": \"질문9\", \"type\": \"file\", \"title\": \"행동 강력 시행 여부 관련 첨부파일\", \"maxSize\": 0}], \"isRequired\": true}]}]}',NULL,'2019-09-14 22:46:38',NULL,1,0,NULL),(86,12,'{\"pages\": [{\"name\": \"페이지1\", \"elements\": [{\"name\": \"패널2\", \"type\": \"panel\", \"elements\": [{\"name\": \"질문1\", \"type\": \"radiogroup\", \"title\": \"귀사에는 사회적 지속가능성 책임 관리자가 있습니까?\", \"choices\": [{\"text\": \"아니오\", \"value\": \"item1\"}, {\"text\": \"예  ※ 예라면 담당자 기입바랍니다\", \"value\": \"item2\"}], \"titleLocation\": \"top\"}, {\"name\": \"질문3\", \"type\": \"text\", \"title\": \"* 책임 관리자 담당자 기입\", \"indent\": 1, \"visibleIf\": \"{질문1} = \\\"item2\\\"\", \"startWithNewLine\": false}]}, {\"name\": \"패널1\", \"type\": \"panel\", \"elements\": [{\"name\": \"질문2\", \"type\": \"radiogroup\", \"title\": \"귀사에는 컴플라이언스 담당자(준법담당자)가 있습니까?\", \"choices\": [{\"text\": \"아니오\", \"value\": \"item1\"}, {\"text\": \"예  ※ 예라면 담당자 기입바랍니다\", \"value\": \"item2\"}]}, {\"name\": \"질문4\", \"type\": \"text\", \"title\": \"* 준법담당자 기입\", \"indent\": 1, \"prefix\": \"p\", \"visibleIf\": \"{질문2} = \\\"item2\\\"\", \"startWithNewLine\": false}]}, {\"name\": \"패널3\", \"type\": \"panel\"}, {\"name\": \"질문5\", \"type\": \"radiogroup\", \"title\": \"귀사에는 환경 지속가능성 책임 관리자가 있습니까?\", \"choices\": [{\"text\": \"아니오\", \"value\": \"item1\"}, {\"text\": \"예  ※ 예라면 담당자 기입바랍니다\", \"value\": \"item2\"}]}, {\"name\": \"질문6\", \"type\": \"text\", \"title\": \"* 환경 지속 담당자 기입\", \"indent\": 1, \"prefix\": \"p\", \"visibleIf\": \"{질문5} = \\\"item2\\\"\", \"startWithNewLine\": false}, {\"name\": \"질문7\", \"type\": \"radiogroup\", \"title\": \"CSR 또는 지속가능성 보고서에 회사의 모든 운영 내용이 포함되어 있습니까?\", \"choices\": [{\"text\": \"예\", \"value\": \"item1\"}, {\"text\": \"아니요\", \"value\": \"item2\"}]}, {\"name\": \"패널4\", \"type\": \"panel\", \"elements\": [{\"name\": \"질문8\", \"type\": \"radiogroup\", \"title\": \"귀사는 행동강령을 시행하고 있습니까?\", \"choices\": [{\"text\": \"예\", \"value\": \"item1\"}, {\"text\": \"아니요\", \"value\": \"item2\"}], \"otherText\": \"※ 관련 문서 첨부 필요\"}, {\"name\": \"질문9\", \"type\": \"file\", \"title\": \"행동 강력 시행 여부 관련 첨부파일\", \"maxSize\": 0}], \"isRequired\": true}], \"navigationButtonsVisibility\": \"show\"}]}',NULL,'2019-09-14 22:54:58',NULL,1,0,NULL),(87,12,'{\"pages\": [{\"name\": \"페이지1\", \"elements\": [{\"name\": \"패널2\", \"type\": \"panel\", \"elements\": [{\"name\": \"질문1\", \"type\": \"radiogroup\", \"title\": \"귀사에는 사회적 지속가능성 책임 관리자가 있습니까?\", \"choices\": [{\"text\": \"아니오\", \"value\": \"item1\"}, {\"text\": \"예  ※ 예라면 담당자 기입바랍니다\", \"value\": \"item2\"}], \"titleLocation\": \"top\"}, {\"name\": \"질문3\", \"type\": \"text\", \"title\": \"* 책임 관리자 담당자 기입\", \"indent\": 1, \"visibleIf\": \"{질문1} = \\\"item2\\\"\", \"startWithNewLine\": false}]}, {\"name\": \"패널1\", \"type\": \"panel\", \"elements\": [{\"name\": \"질문2\", \"type\": \"radiogroup\", \"title\": \"귀사에는 컴플라이언스 담당자(준법담당자)가 있습니까?\", \"choices\": [{\"text\": \"아니오\", \"value\": \"item1\"}, {\"text\": \"예  ※ 예라면 담당자 기입바랍니다\", \"value\": \"item2\"}]}, {\"name\": \"질문4\", \"type\": \"text\", \"title\": \"* 준법담당자 기입\", \"indent\": 1, \"prefix\": \"p\", \"visibleIf\": \"{질문2} = \\\"item2\\\"\", \"startWithNewLine\": false}]}, {\"name\": \"패널3\", \"type\": \"panel\"}, {\"name\": \"질문5\", \"type\": \"radiogroup\", \"title\": \"귀사에는 환경 지속가능성 책임 관리자가 있습니까?\", \"choices\": [{\"text\": \"아니오\", \"value\": \"item1\"}, {\"text\": \"예  ※ 예라면 담당자 기입바랍니다\", \"value\": \"item2\"}]}, {\"name\": \"질문6\", \"type\": \"text\", \"title\": \"* 환경 지속 담당자 기입\", \"indent\": 1, \"prefix\": \"p\", \"visibleIf\": \"{질문5} = \\\"item2\\\"\", \"startWithNewLine\": false}, {\"name\": \"질문7\", \"type\": \"radiogroup\", \"title\": \"CSR 또는 지속가능성 보고서에 회사의 모든 운영 내용이 포함되어 있습니까?\", \"choices\": [{\"text\": \"예\", \"value\": \"item1\"}, {\"text\": \"아니요\", \"value\": \"item2\"}]}, {\"name\": \"패널4\", \"type\": \"panel\", \"elements\": [{\"name\": \"질문8\", \"type\": \"radiogroup\", \"title\": \"귀사는 행동강령을 시행하고 있습니까?\", \"choices\": [{\"text\": \"예\", \"value\": \"item1\"}, {\"text\": \"아니요\", \"value\": \"item2\"}], \"otherText\": \"※ 관련 문서 첨부 필요\"}, {\"name\": \"질문9\", \"type\": \"file\", \"title\": \"행동 강력 시행 여부 관련 첨부파일\", \"maxSize\": 0}], \"isRequired\": true}], \"navigationButtonsVisibility\": \"show\"}], \"locale\": \"ko\"}',NULL,'2019-09-14 22:55:17',NULL,1,0,NULL),(88,12,'{\"pages\": [{\"name\": \"페이지1\", \"elements\": [{\"name\": \"패널2\", \"type\": \"panel\", \"elements\": [{\"name\": \"질문1\", \"type\": \"radiogroup\", \"title\": \"귀사에는 사회적 지속가능성 책임 관리자가 있습니까?\", \"choices\": [{\"text\": \"아니오\", \"value\": \"item1\"}, {\"text\": \"예  ※ 예라면 담당자 기입바랍니다\", \"value\": \"item2\"}], \"titleLocation\": \"top\"}, {\"name\": \"질문3\", \"type\": \"text\", \"title\": \"* 책임 관리자 담당자 기입\", \"indent\": 1, \"visibleIf\": \"{질문1} = \\\"item2\\\"\", \"startWithNewLine\": false}]}, {\"name\": \"패널1\", \"type\": \"panel\", \"elements\": [{\"name\": \"질문2\", \"type\": \"radiogroup\", \"title\": \"귀사에는 컴플라이언스 담당자(준법담당자)가 있습니까?\", \"choices\": [{\"text\": \"아니오\", \"value\": \"item1\"}, {\"text\": \"예  ※ 예라면 담당자 기입바랍니다\", \"value\": \"item2\"}]}, {\"name\": \"질문4\", \"type\": \"text\", \"title\": \"* 준법담당자 기입\", \"indent\": 1, \"prefix\": \"p\", \"visibleIf\": \"{질문2} = \\\"item2\\\"\", \"startWithNewLine\": false}]}, {\"name\": \"패널3\", \"type\": \"panel\"}, {\"name\": \"질문5\", \"type\": \"radiogroup\", \"title\": \"귀사에는 환경 지속가능성 책임 관리자가 있습니까?\", \"choices\": [{\"text\": \"아니오\", \"value\": \"item1\"}, {\"text\": \"예  ※ 예라면 담당자 기입바랍니다\", \"value\": \"item2\"}]}, {\"name\": \"질문6\", \"type\": \"text\", \"title\": \"* 환경 지속 담당자 기입\", \"indent\": 1, \"prefix\": \"p\", \"visibleIf\": \"{질문5} = \\\"item2\\\"\", \"startWithNewLine\": false}, {\"name\": \"질문7\", \"type\": \"radiogroup\", \"title\": \"CSR 또는 지속가능성 보고서에 회사의 모든 운영 내용이 포함되어 있습니까?\", \"choices\": [{\"text\": \"예\", \"value\": \"item1\"}, {\"text\": \"아니요\", \"value\": \"item2\"}]}, {\"name\": \"패널4\", \"type\": \"panel\", \"elements\": [{\"name\": \"질문8\", \"type\": \"radiogroup\", \"title\": \"귀사는 행동강령을 시행하고 있습니까?\", \"choices\": [{\"text\": \"예\", \"value\": \"item1\"}, {\"text\": \"아니요\", \"value\": \"item2\"}], \"otherText\": \"※ 관련 문서 첨부 필요\"}, {\"name\": \"질문9\", \"type\": \"file\", \"title\": \"행동 강력 시행 여부 관련 첨부파일\", \"maxSize\": 0}], \"isRequired\": true}], \"navigationButtonsVisibility\": \"show\"}], \"locale\": \"ko\"}',NULL,'2019-09-14 22:55:32',NULL,1,0,NULL),(89,12,'{\"pages\": [{\"name\": \"페이지1\", \"elements\": [{\"name\": \"패널2\", \"type\": \"panel\", \"elements\": [{\"name\": \"질문1\", \"type\": \"radiogroup\", \"title\": \"귀사에는 사회적 지속가능성 책임 관리자가 있습니까?\", \"choices\": [{\"text\": \"아니오\", \"value\": \"item1\"}, {\"text\": \"예  ※ 예라면 담당자 기입바랍니다\", \"value\": \"item2\"}], \"titleLocation\": \"top\"}, {\"name\": \"질문3\", \"type\": \"text\", \"title\": \"* 책임 관리자 담당자 기입\", \"indent\": 1, \"visibleIf\": \"{질문1} = \\\"item2\\\"\", \"startWithNewLine\": false}]}, {\"name\": \"패널1\", \"type\": \"panel\", \"elements\": [{\"name\": \"질문2\", \"type\": \"radiogroup\", \"title\": \"귀사에는 컴플라이언스 담당자(준법담당자)가 있습니까?\", \"choices\": [{\"text\": \"아니오\", \"value\": \"item1\"}, {\"text\": \"예  ※ 예라면 담당자 기입바랍니다\", \"value\": \"item2\"}]}, {\"name\": \"질문4\", \"type\": \"text\", \"title\": \"* 준법담당자 기입\", \"indent\": 1, \"prefix\": \"p\", \"visibleIf\": \"{질문2} = \\\"item2\\\"\", \"startWithNewLine\": false}]}, {\"name\": \"패널3\", \"type\": \"panel\"}, {\"name\": \"질문5\", \"type\": \"radiogroup\", \"title\": \"귀사에는 환경 지속가능성 책임 관리자가 있습니까?\", \"choices\": [{\"text\": \"아니오\", \"value\": \"item1\"}, {\"text\": \"예  ※ 예라면 담당자 기입바랍니다\", \"value\": \"item2\"}]}, {\"name\": \"질문6\", \"type\": \"text\", \"title\": \"* 환경 지속 담당자 기입\", \"indent\": 1, \"prefix\": \"p\", \"visibleIf\": \"{질문5} = \\\"item2\\\"\", \"startWithNewLine\": false}, {\"name\": \"질문7\", \"type\": \"radiogroup\", \"title\": \"CSR 또는 지속가능성 보고서에 회사의 모든 운영 내용이 포함되어 있습니까?\", \"choices\": [{\"text\": \"예\", \"value\": \"item1\"}, {\"text\": \"아니요\", \"value\": \"item2\"}]}, {\"name\": \"패널4\", \"type\": \"panel\", \"elements\": [{\"name\": \"질문8\", \"type\": \"radiogroup\", \"title\": \"귀사는 행동강령을 시행하고 있습니까?\", \"choices\": [{\"text\": \"예\", \"value\": \"item1\"}, {\"text\": \"아니요\", \"value\": \"item2\"}], \"otherText\": \"※ 관련 문서 첨부 필요\"}, {\"name\": \"질문9\", \"type\": \"file\", \"title\": \"행동 강력 시행 여부 관련 첨부파일\", \"maxSize\": 0}], \"isRequired\": true}], \"navigationButtonsVisibility\": \"show\"}]}',NULL,'2019-09-14 22:56:05',NULL,1,0,NULL),(90,12,'{\"pages\": [{\"name\": \"페이지1\", \"elements\": [{\"name\": \"패널2\", \"type\": \"panel\", \"elements\": [{\"name\": \"질문1\", \"type\": \"radiogroup\", \"title\": \"귀사에는 사회적 지속가능성 책임 관리자가 있습니까?\", \"choices\": [{\"text\": \"아니오\", \"value\": \"item1\"}, {\"text\": \"예  ※ 예라면 담당자 기입바랍니다\", \"value\": \"item2\"}], \"titleLocation\": \"top\"}, {\"name\": \"질문3\", \"type\": \"text\", \"title\": \"* 책임 관리자 담당자 기입\", \"indent\": 1, \"visibleIf\": \"{질문1} = \\\"item2\\\"\", \"startWithNewLine\": false}]}, {\"name\": \"패널1\", \"type\": \"panel\", \"elements\": [{\"name\": \"질문2\", \"type\": \"radiogroup\", \"title\": \"귀사에는 컴플라이언스 담당자(준법담당자)가 있습니까?\", \"choices\": [{\"text\": \"아니오\", \"value\": \"item1\"}, {\"text\": \"예  ※ 예라면 담당자 기입바랍니다\", \"value\": \"item2\"}]}, {\"name\": \"질문4\", \"type\": \"text\", \"title\": \"* 준법담당자 기입\", \"indent\": 1, \"prefix\": \"p\", \"visibleIf\": \"{질문2} = \\\"item2\\\"\", \"startWithNewLine\": false}]}, {\"name\": \"패널3\", \"type\": \"panel\"}, {\"name\": \"질문5\", \"type\": \"radiogroup\", \"title\": \"귀사에는 환경 지속가능성 책임 관리자가 있습니까?\", \"choices\": [{\"text\": \"아니오\", \"value\": \"item1\"}, {\"text\": \"예  ※ 예라면 담당자 기입바랍니다\", \"value\": \"item2\"}]}, {\"name\": \"질문6\", \"type\": \"text\", \"title\": \"* 환경 지속 담당자 기입\", \"indent\": 1, \"prefix\": \"p\", \"visibleIf\": \"{질문5} = \\\"item2\\\"\", \"startWithNewLine\": false}, {\"name\": \"질문7\", \"type\": \"radiogroup\", \"title\": \"CSR 또는 지속가능성 보고서에 회사의 모든 운영 내용이 포함되어 있습니까?\", \"choices\": [{\"text\": \"예\", \"value\": \"item1\"}, {\"text\": \"아니요\", \"value\": \"item2\"}]}, {\"name\": \"패널4\", \"type\": \"panel\", \"elements\": [{\"name\": \"질문8\", \"type\": \"radiogroup\", \"title\": \"귀사는 행동강령을 시행하고 있습니까?\", \"choices\": [{\"text\": \"예\", \"value\": \"item1\"}, {\"text\": \"아니요\", \"value\": \"item2\"}], \"otherText\": \"※ 관련 문서 첨부 필요\"}, {\"name\": \"질문9\", \"type\": \"file\", \"title\": \"행동 강력 시행 여부 관련 첨부파일\", \"maxSize\": 0}], \"isRequired\": true}], \"navigationButtonsVisibility\": \"show\"}]}',NULL,'2019-09-14 22:59:48',NULL,1,0,NULL),(91,9,'{\"pages\": [{\"name\": \"페이지1\", \"elements\": [{\"name\": \"질문1\", \"type\": \"radiogroup\", \"title\": \"다음 중 귀사의 근로 조건 및 인권 관련 정책에 포함되어있는 항목은 무엇입니까?\", \"choices\": [{\"text\": \"아동노동\", \"value\": \"item1\"}, {\"text\": \"임금, 복지\", \"value\": \"item2\"}, {\"text\": \"근로시간\", \"value\": \"item3\"}, {\"text\": \"강제노동, 인신매매\", \"value\": \"item4\"}, {\"text\": \"결사 및 단체교섭의 자유\", \"value\": \"item5\"}, {\"text\": \"안전, 보건\", \"value\": \"item6\"}, {\"text\": \"직장 내 괴롭힘\", \"value\": \"item7\"}]}]}]}',NULL,'2019-09-14 23:30:22',NULL,1,0,NULL),(92,9,'{\"pages\": [{\"name\": \"페이지1\", \"elements\": [{\"name\": \"질문1\", \"type\": \"radiogroup\", \"title\": \"다음 중 귀사의 근로 조건 및 인권 관련 정책에 포함되어있는 항목은 무엇입니까?\", \"choices\": [{\"text\": \"아동노동\", \"value\": \"item1\"}, {\"text\": \"임금, 복지\", \"value\": \"item2\"}, {\"text\": \"근로시간\", \"value\": \"item3\"}, {\"text\": \"강제노동, 인신매매\", \"value\": \"item4\"}, {\"text\": \"결사 및 단체교섭의 자유\", \"value\": \"item5\"}, {\"text\": \"안전, 보건\", \"value\": \"item6\"}, {\"text\": \"직장 내 괴롭힘\", \"value\": \"item7\"}]}, {\"name\": \"질문2\", \"rows\": [\"2019년\", \"2020년\", \"2021년\"], \"type\": \"matrixdropdown\", \"title\": \"귀사는 위에서 언급한 근로조건과 인권문제를 관리하기 위한 관리체계를 갖추고 있습니까?\", \"choices\": [\"만족함\", \"불만족\"], \"columns\": [{\"name\": \"개인 의견 기술\", \"cellType\": \"text\"}, {\"name\": \"근로조건\", \"cellType\": \"dropdown\"}, {\"name\": \"인권문제\", \"cellType\": \"radiogroup\"}]}]}]}',NULL,'2019-09-14 23:40:11',NULL,1,0,NULL),(93,10,'{\"pages\": [{\"name\": \"페이지1\", \"elements\": [{\"name\": \"질문1\", \"type\": \"radiogroup\", \"title\": \"귀사는  안전, 보건관리 시스템을 갖추고 있습니까?\", \"choices\": [{\"text\": \"아니요. 우리는 문서화된 절차만 가지고 있고, 관리 시스템이 인증되지 않았습니다\", \"value\": \"item1\"}, {\"text\": \"예, 국제적으로 공인된 안전, 보건 관리 시스템을 갖추고 있습니다.\", \"value\": \"item2\"}]}, {\"name\": \"질문3\", \"type\": \"matrixdynamic\", \"title\": \"\\\"예\\\"라고 답한 경우, 인증을 획득한 방법을 표시하십시오.\", \"choices\": [1, 2, 3, 4, 5], \"columns\": [{\"name\": \"인증기관\"}, {\"name\": \"인증번호\"}, {\"name\": \"유효기간\"}], \"cellType\": \"text\", \"rowCount\": 1, \"addRowLocation\": \"bottom\"}, {\"name\": \"질문2\", \"type\": \"file\", \"title\": \"안전, 보건관리 시스템 관련 파일 첨부\", \"maxSize\": 0}]}]}',NULL,'2019-09-14 23:46:53',NULL,1,0,NULL),(94,10,'{\"pages\": [{\"name\": \"페이지1\", \"elements\": [{\"name\": \"질문1\", \"type\": \"radiogroup\", \"title\": \"귀사는  안전, 보건관리 시스템을 갖추고 있습니까?\", \"choices\": [{\"text\": \"아니요. 우리는 문서화된 절차만 가지고 있고, 관리 시스템이 인증되지 않았습니다\", \"value\": \"item1\"}, {\"text\": \"예, 국제적으로 공인된 안전, 보건 관리 시스템을 갖추고 있습니다.\", \"value\": \"item2\"}]}, {\"name\": \"질문3\", \"type\": \"matrixdynamic\", \"title\": \"\\\"예\\\"라고 답한 경우, 인증을 획득한 방법을 표시하십시오.\", \"choices\": [1, 2, 3, 4, 5], \"columns\": [{\"name\": \"인증기관\"}, {\"name\": \"인증번호\"}, {\"name\": \"유효기간\"}], \"cellType\": \"text\", \"rowCount\": 1, \"visibleIf\": \"{질문1} = \\\"item2\\\"\", \"addRowLocation\": \"bottom\"}, {\"name\": \"질문2\", \"type\": \"file\", \"title\": \"안전, 보건관리 시스템 관련 파일 첨부\", \"maxSize\": 0}]}]}',NULL,'2019-09-14 23:49:05',NULL,1,0,NULL),(95,13,'{\"pages\": [{\"name\": \"페이지1\", \"elements\": [{\"name\": \"질문1\", \"type\": \"radiogroup\", \"title\": \"귀사는 법적 준수에 대한 실행, 지속적인 측정 및 지속적인 환경 성과 개선을 포함하는 공식적인 환경 정책을 가지고 있습니까?\", \"choices\": [{\"text\": \"아니요\", \"value\": \"item1\"}, {\"text\": \"예\", \"value\": \"item2\"}], \"hasOther\": true, \"otherText\": \"기타\", \"useDisplayValuesInTitle\": false}]}]}',NULL,'2019-09-14 23:53:23',NULL,1,0,NULL),(96,13,'{\"pages\": [{\"name\": \"페이지1\", \"elements\": [{\"name\": \"질문1\", \"type\": \"radiogroup\", \"title\": \"귀사는 법적 준수에 대한 실행, 지속적인 측정 및 지속적인 환경 성과 개선을 포함하는 공식적인 환경 정책을 가지고 있습니까?\", \"choices\": [{\"text\": \"아니요\", \"value\": \"item1\"}, {\"text\": \"예\", \"value\": \"item2\"}], \"hasOther\": true, \"otherText\": \"기타\", \"useDisplayValuesInTitle\": false}, {\"name\": \"질문2\", \"type\": \"radiogroup\", \"title\": \"해당 정책 또는 관련 절차 및 과정이 다음 영역을 포함하고 있습니까?\", \"choices\": [{\"text\": \"에너지 소비와 온실가스 배출량\", \"value\": \"item1\"}, {\"text\": \"수질 및 소비\", \"value\": \"item2\"}, {\"text\": \"대기질\", \"value\": \"item3\"}, {\"text\": \"천연자원관리 및 폐기물 감량\", \"value\": \"item4\"}, {\"text\": \"화학관리책임 \", \"value\": \"item5\"}], \"hasOther\": true, \"otherText\": \"다른 분야(명기필요)\"}]}]}',NULL,'2019-09-14 23:54:33',NULL,1,0,NULL),(97,13,'{\"pages\": [{\"name\": \"페이지1\", \"elements\": [{\"name\": \"질문1\", \"type\": \"radiogroup\", \"title\": \"귀사는 법적 준수에 대한 실행, 지속적인 측정 및 지속적인 환경 성과 개선을 포함하는 공식적인 환경 정책을 가지고 있습니까?\", \"choices\": [{\"text\": \"아니요\", \"value\": \"item1\"}, {\"text\": \"예\", \"value\": \"item2\"}], \"hasOther\": true, \"otherText\": \"기타\", \"useDisplayValuesInTitle\": false}, {\"name\": \"질문2\", \"type\": \"radiogroup\", \"title\": \"해당 정책 또는 관련 절차 및 과정이 다음 영역을 포함하고 있습니까?\", \"choices\": [{\"text\": \"에너지 소비와 온실가스 배출량\", \"value\": \"item1\"}, {\"text\": \"수질 및 소비\", \"value\": \"item2\"}, {\"text\": \"대기질\", \"value\": \"item3\"}, {\"text\": \"천연자원관리 및 폐기물 감량\", \"value\": \"item4\"}, {\"text\": \"화학관리책임 \", \"value\": \"item5\"}], \"hasOther\": true, \"otherText\": \"다른 분야(명기필요)\"}, {\"name\": \"질문3\", \"type\": \"radiogroup\", \"title\": \"귀사의 환경 정책에 따라 연간 목표 수립과 활동을 수행하십니까?\", \"choices\": [{\"text\": \"아니요\", \"value\": \"item1\"}, {\"text\": \"예\", \"value\": \"item2\"}]}, {\"name\": \"질문4\", \"type\": \"radiogroup\", \"title\": \"\\\"예\\\"라고 답한 경우, 귀사는 다음 중 한 가지 채널을 사용하여 직원들에게 정책을 전달하고 있습니까?\", \"choices\": [{\"text\": \"인트라넷 / 미팅 / 브로셔 등\", \"value\": \"item1\"}, {\"text\": \"교육\", \"value\": \"item2\"}], \"hasOther\": true, \"otherText\": \"기타(지정하십시오) \"}, {\"name\": \"질문5\", \"type\": \"radiogroup\", \"title\": \"귀사는 공인된 환경관리 시스템을 갖추고 있습니까?\", \"choices\": [{\"text\": \"아니오\", \"value\": \"item1\"}, {\"text\": \"아니오, 인증된 시스템은 주요 생산지에서만 이용 가능\", \"value\": \"item2\"}, {\"text\": \"예, ISO 14001:2015에 따라 또는 EU 에코 관리 및 평가 계획(EMAS) \", \"value\": \"item3\"}, {\"text\": \"예, 다른 글로벌 표준에 따름(인증된 표준의 이름 입력)\", \"value\": \"item4\"}]}, {\"name\": \"질문6\", \"type\": \"radiogroup\", \"title\": \"귀사는 유해 물질을 식별하고 관리하는 절차를 갖추고 있습니까?\", \"choices\": [{\"text\": \"아니오\", \"value\": \"item1\"}, {\"text\": \"예\", \"value\": \"item2\"}]}]}]}',NULL,'2019-09-14 23:57:11',NULL,1,0,NULL),(98,13,'{\"pages\": [{\"name\": \"페이지1\", \"elements\": [{\"name\": \"질문1\", \"type\": \"radiogroup\", \"title\": \"귀사는 법적 준수에 대한 실행, 지속적인 측정 및 지속적인 환경 성과 개선을 포함하는 공식적인 환경 정책을 가지고 있습니까?\", \"choices\": [{\"text\": \"아니요\", \"value\": \"item1\"}, {\"text\": \"예\", \"value\": \"item2\"}], \"hasOther\": true, \"otherText\": \"기타\", \"useDisplayValuesInTitle\": false}, {\"name\": \"질문2\", \"type\": \"radiogroup\", \"title\": \"해당 정책 또는 관련 절차 및 과정이 다음 영역을 포함하고 있습니까?\", \"choices\": [{\"text\": \"에너지 소비와 온실가스 배출량\", \"value\": \"item1\"}, {\"text\": \"수질 및 소비\", \"value\": \"item2\"}, {\"text\": \"대기질\", \"value\": \"item3\"}, {\"text\": \"천연자원관리 및 폐기물 감량\", \"value\": \"item4\"}, {\"text\": \"화학관리책임 \", \"value\": \"item5\"}], \"hasOther\": true, \"otherText\": \"다른 분야(명기필요)\"}, {\"name\": \"질문3\", \"type\": \"radiogroup\", \"title\": \"귀사의 환경 정책에 따라 연간 목표 수립과 활동을 수행하십니까?\", \"choices\": [{\"text\": \"아니요\", \"value\": \"item1\"}, {\"text\": \"예\", \"value\": \"item2\"}]}, {\"name\": \"질문4\", \"type\": \"radiogroup\", \"title\": \"\\\"예\\\"라고 답한 경우, 귀사는 다음 중 한 가지 채널을 사용하여 직원들에게 정책을 전달하고 있습니까?\", \"choices\": [{\"text\": \"인트라넷 / 미팅 / 브로셔 등\", \"value\": \"item1\"}, {\"text\": \"교육\", \"value\": \"item2\"}], \"hasOther\": true, \"otherText\": \"기타(지정하십시오) \"}, {\"name\": \"질문5\", \"type\": \"radiogroup\", \"title\": \"귀사는 공인된 환경관리 시스템을 갖추고 있습니까?\", \"choices\": [{\"text\": \"아니오\", \"value\": \"item1\"}, {\"text\": \"아니오, 인증된 시스템은 주요 생산지에서만 이용 가능\", \"value\": \"item2\"}, {\"text\": \"예, ISO 14001:2015에 따라 또는 EU 에코 관리 및 평가 계획(EMAS) \", \"value\": \"item3\"}, {\"text\": \"예, 다른 글로벌 표준에 따름(인증된 표준의 이름 입력)\", \"value\": \"item4\"}]}, {\"name\": \"질문6\", \"type\": \"radiogroup\", \"title\": \"귀사는 유해 물질을 식별하고 관리하는 절차를 갖추고 있습니까?\", \"choices\": [{\"text\": \"아니오\", \"value\": \"item1\"}, {\"text\": \"예\", \"value\": \"item2\"}]}, {\"name\": \"질문7\", \"type\": \"radiogroup\", \"title\": \"재료 데이터를 국제 재료 데이터 시스템(IMDS 데이터베이스)에 업로드하십니까?\", \"choices\": [{\"text\": \"아니요\", \"value\": \"item1\"}, {\"text\": \"예\", \"value\": \"item2\"}]}]}]}',NULL,'2019-09-14 23:57:38',NULL,1,0,NULL);
/*!40000 ALTER TABLE `cquestions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `questions`
--

DROP TABLE IF EXISTS `questions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `questions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `category_id` int(11) DEFAULT NULL,
  `data` json DEFAULT NULL,
  `order` int(11) DEFAULT NULL,
  `date` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `type` varchar(45) DEFAULT NULL,
  `company_id` int(11) DEFAULT '0',
  `activate` tinyint(4) DEFAULT '1',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=70 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='type ''select'' radio, type ''file'', type ''text'', type ''table'', type ''check''';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `questions`
--

LOCK TABLES `questions` WRITE;
/*!40000 ALTER TABLE `questions` DISABLE KEYS */;
INSERT INTO `questions` VALUES (1,9,'{\"articles\": {\"type\": \"input\"}, \"question\": [{\"type\": \"text\", \"datas\": \"회사의 경영시스템 내에 기업 윤리와 관련한 팀에 건의 하고 싶은 사항을 기술해 주세요\"}]}',0,'2019-09-01 15:39:50','select',0,1),(2,9,'{\"articles\": {\"form\": [\"예\", \"아니요\", \"모르겠다\"], \"type\": \"select\"}, \"question\": [{\"type\": \"text\", \"datas\": \"회사의 경영시스템 내에 기업 윤리와 관련한 팀을 운영하고 있습니까?\"}]}',1,'2019-09-01 15:39:50','select',0,1),(50,9,'{\"articles\": {\"form\": [\"이권 개입 등의 금지\", \"직위의 사적 이용 금지\", \"알선ㆍ청탁 등의 금지\", \"금전의 차용 금지\", \"경조사의 통지와 경조금품의 수수 제한\"], \"type\": \"check\"}, \"question\": [{\"type\": \"text\", \"datas\": \"귀사의 행동 강령지침을 모두 선택 하세요\"}]}',2,'2019-09-01 15:39:51','select',0,1),(51,9,'{\"articles\": {\"form\": [\"2013\", \"2014\", \"2015\", \"2016\", \"2017\", \"2019\"], \"type\": \"select\"}, \"question\": [{\"type\": \"text\", \"datas\": \"지속적인 측정 및 지속적인 환경 성과 개선을 포함하는 공식적인 환경 정책의 성과가 가장 좋다고 느끼는 년도는?\"}, {\"type\": \"table\", \"datas\": {\"datas\": [{\"a1\": \"제 1 실\", \"a2\": \"2013년\", \"a3\": \"김과장\", \"a4\": \"2013년도 성과\"}, {\"a1\": \"제 2 실\", \"a2\": \"2014년\", \"a3\": \"김실장\", \"a4\": \"2014년도 성과\"}, {\"a1\": \"제 3 실\", \"a2\": \"2015년\", \"a3\": \"이대리\", \"a4\": \"2015년도 성과\"}, {\"a1\": \"제 4 실\", \"a2\": \"2016년\", \"a3\": \"정이사\", \"a4\": \"2016년도 성과\"}, {\"a1\": \"제 5 실\", \"a2\": \"2017년\", \"a3\": \"우실장\", \"a4\": \"2017년도 성과\"}, {\"a1\": \"제 6 실\", \"a2\": \"2019년\", \"a3\": \"정과장\", \"a4\": \"2018년도 성과\", \"_rowVariant\": \"success\"}], \"fields\": [{\"key\": \"a1\", \"label\": \"부서\"}, {\"key\": \"a2\", \"label\": \"년도\", \"sortable\": true}, {\"key\": \"a3\", \"label\": \"담당자\"}, {\"key\": \"a4\", \"label\": \"설명\"}], \"caption\": \"연도별 데이타\"}}]}',3,'2019-09-01 15:39:51','select',0,1),(52,9,'{\"articles\": {\"form\": [\"1월\", \"2월\", \"3월\", \"4월\", \"5월\", \"6월\", \"7월\", \"8월\", \"9월\", \"10월\", \"11월\", \"12월\"], \"type\": \"select\"}, \"question\": [{\"type\": \"text\", \"datas\": \"환경 성과 개선의 성과가 가장 좋았다고 느끼는 달은 언제 입니까?\"}, {\"type\": \"chart\", \"datas\": {\"labels\": [\"1월\", \"2월\", \"3월\", \"4월\", \"5월\", \"6월\", \"7월\", \"8월\", \"9월\", \"10월\", \"11월\", \"12월\"], \"datasets\": [{\"data\": [40, 20, 12, 39, 10, 40, 39, 80, 40, 20, 12, 11], \"label\": \"성과(단위%)\", \"backgroundColor\": \"#f87979\"}]}}]}',4,'2019-09-01 15:39:51','select',0,1),(53,9,'{\"articles\": {\"form\": [\"예\", \"아니요\", \"모르겠다\"], \"type\": \"select-file\"}, \"question\": [{\"type\": \"text\", \"datas\": \"회사의 경영시스템 내에 기업 윤리와 관련한 팀을 운영하고 있습니까?\"}]}',5,'2019-09-01 15:39:51','select',0,1),(54,10,'{\"articles\": {\"form\": [\"2013\", \"2014\", \"2015\", \"2016\", \"2017\", \"2019\"], \"type\": \"select\"}, \"question\": [{\"type\": \"text\", \"datas\": \"지속적인 측정 및 지속적인 환경 성과 개선을 포함하는 공식적인 환경 정책의 성과가 가장 좋다고 느끼는 년도는?\"}, {\"type\": \"table\", \"datas\": {\"datas\": [{\"a1\": \"제 1 실\", \"a2\": \"2013년\", \"a3\": \"김과장\", \"a4\": \"2013년도 성과\"}, {\"a1\": \"제 2 실\", \"a2\": \"2014년\", \"a3\": \"김실장\", \"a4\": \"2014년도 성과\"}, {\"a1\": \"제 3 실\", \"a2\": \"2015년\", \"a3\": \"이대리\", \"a4\": \"2015년도 성과\"}, {\"a1\": \"제 4 실\", \"a2\": \"2016년\", \"a3\": \"정이사\", \"a4\": \"2016년도 성과\"}, {\"a1\": \"제 5 실\", \"a2\": \"2017년\", \"a3\": \"우실장\", \"a4\": \"2017년도 성과\"}, {\"a1\": \"제 6 실\", \"a2\": \"2019년\", \"a3\": \"정과장\", \"a4\": \"2018년도 성과\", \"_rowVariant\": \"success\"}], \"fields\": [{\"key\": \"a1\", \"label\": \"부서\"}, {\"key\": \"a2\", \"label\": \"년도\", \"sortable\": true}, {\"key\": \"a3\", \"label\": \"담당자\"}, {\"key\": \"a4\", \"label\": \"설명\"}], \"caption\": \"연도별 데이타\"}}]}',1,'2019-09-01 15:39:51','select',0,1),(55,10,'{\"articles\": {\"form\": [\"1월\", \"2월\", \"3월\", \"4월\", \"5월\", \"6월\", \"7월\", \"8월\", \"9월\", \"10월\", \"11월\", \"12월\"], \"type\": \"select\"}, \"question\": [{\"type\": \"text\", \"datas\": \"환경 성과 개선의 성과가 가장 좋았다고 느끼는 달은 언제 입니까?\"}, {\"type\": \"chart\", \"datas\": {\"labels\": [\"1월\", \"2월\", \"3월\", \"4월\", \"5월\", \"6월\", \"7월\", \"8월\", \"9월\", \"10월\", \"11월\", \"12월\"], \"datasets\": [{\"data\": [40, 20, 12, 39, 10, 40, 39, 80, 40, 20, 12, 11], \"label\": \"성과(단위%)\", \"backgroundColor\": \"#f87979\"}]}}]}',2,'2019-09-01 15:39:51','select',0,1),(56,2,'{\"articles\": {\"form\": [\"예\", \"아니요\", \"모르겠다\"], \"type\": \"select\"}, \"question\": [{\"type\": \"text\", \"datas\": \"회사의 경영시스템 내에 기업 윤리와 관련한 팀을 운영하고 있습니까?\"}]}',1,'2019-09-01 15:39:50','select',0,1),(57,2,'{\"articles\": {\"form\": [\"이권 개입 등의 금지\", \"직위의 사적 이용 금지\", \"알선ㆍ청탁 등의 금지\", \"금전의 차용 금지\", \"경조사의 통지와 경조금품의 수수 제한\"], \"type\": \"check\"}, \"question\": [{\"type\": \"text\", \"datas\": \"귀사의 행동 강령지침을 모두 선택 하세요\"}]}',2,'2019-09-01 15:39:51','select',0,1),(58,4,'{\"articles\": {\"type\": \"input\"}, \"question\": [{\"type\": \"text\", \"datas\": \"회사의 경영시스템 내에 기업 윤리와 관련한 팀에 건의 하고 싶은 사항을 기술해 주세요\"}]}',0,'2019-09-01 15:39:50','select',0,1),(59,4,'{\"articles\": {\"form\": [\"예\", \"아니요\", \"모르겠다\"], \"type\": \"select\"}, \"question\": [{\"type\": \"text\", \"datas\": \"회사의 경영시스템 내에 기업 윤리와 관련한 팀을 운영하고 있습니까?\"}]}',1,'2019-09-01 15:39:50','select',0,1),(60,4,'{\"articles\": {\"form\": [\"이권 개입 등의 금지\", \"직위의 사적 이용 금지\", \"알선ㆍ청탁 등의 금지\", \"금전의 차용 금지\", \"경조사의 통지와 경조금품의 수수 제한\"], \"type\": \"check\"}, \"question\": [{\"type\": \"text\", \"datas\": \"귀사의 행동 강령지침을 모두 선택 하세요\"}]}',2,'2019-09-01 15:39:51','select',0,1),(61,4,'{\"articles\": {\"form\": [\"2013\", \"2014\", \"2015\", \"2016\", \"2017\", \"2019\"], \"type\": \"select\"}, \"question\": [{\"type\": \"text\", \"datas\": \"지속적인 측정 및 지속적인 환경 성과 개선을 포함하는 공식적인 환경 정책의 성과가 가장 좋다고 느끼는 년도는?\"}, {\"type\": \"table\", \"datas\": {\"datas\": [{\"a1\": \"제 1 실\", \"a2\": \"2013년\", \"a3\": \"김과장\", \"a4\": \"2013년도 성과\"}, {\"a1\": \"제 2 실\", \"a2\": \"2014년\", \"a3\": \"김실장\", \"a4\": \"2014년도 성과\"}, {\"a1\": \"제 3 실\", \"a2\": \"2015년\", \"a3\": \"이대리\", \"a4\": \"2015년도 성과\"}, {\"a1\": \"제 4 실\", \"a2\": \"2016년\", \"a3\": \"정이사\", \"a4\": \"2016년도 성과\"}, {\"a1\": \"제 5 실\", \"a2\": \"2017년\", \"a3\": \"우실장\", \"a4\": \"2017년도 성과\"}, {\"a1\": \"제 6 실\", \"a2\": \"2019년\", \"a3\": \"정과장\", \"a4\": \"2018년도 성과\", \"_rowVariant\": \"success\"}], \"fields\": [{\"key\": \"a1\", \"label\": \"부서\"}, {\"key\": \"a2\", \"label\": \"년도\", \"sortable\": true}, {\"key\": \"a3\", \"label\": \"담당자\"}, {\"key\": \"a4\", \"label\": \"설명\"}], \"caption\": \"연도별 데이타\"}}]}',3,'2019-09-01 15:39:51','select',0,1),(62,4,'{\"articles\": {\"form\": [\"1월\", \"2월\", \"3월\", \"4월\", \"5월\", \"6월\", \"7월\", \"8월\", \"9월\", \"10월\", \"11월\", \"12월\"], \"type\": \"select\"}, \"question\": [{\"type\": \"text\", \"datas\": \"환경 성과 개선의 성과가 가장 좋았다고 느끼는 달은 언제 입니까?\"}, {\"type\": \"chart\", \"datas\": {\"labels\": [\"1월\", \"2월\", \"3월\", \"4월\", \"5월\", \"6월\", \"7월\", \"8월\", \"9월\", \"10월\", \"11월\", \"12월\"], \"datasets\": [{\"data\": [40, 20, 12, 39, 10, 40, 39, 80, 40, 20, 12, 11], \"label\": \"성과(단위%)\", \"backgroundColor\": \"#f87979\"}]}}]}',4,'2019-09-01 15:39:51','select',0,1),(63,5,'{\"articles\": {\"type\": \"input\"}, \"question\": [{\"type\": \"text\", \"datas\": \"회사의 경영시스템 내에 기업 윤리와 관련한 팀에 건의 하고 싶은 사항을 기술해 주세요\"}]}',1,'2019-09-01 15:39:50','select',0,1),(64,5,'{\"articles\": {\"form\": [\"예\", \"아니요\", \"모르겠다\"], \"type\": \"select\"}, \"question\": [{\"type\": \"text\", \"datas\": \"회사의 경영시스템 내에 기업 윤리와 관련한 팀을 운영하고 있습니까?\"}]}',2,'2019-09-01 15:39:50','select',0,1),(65,5,'{\"articles\": {\"form\": [\"이권 개입 등의 금지\", \"직위의 사적 이용 금지\", \"알선ㆍ청탁 등의 금지\", \"금전의 차용 금지\", \"경조사의 통지와 경조금품의 수수 제한\"], \"type\": \"check\"}, \"question\": [{\"type\": \"text\", \"datas\": \"귀사의 행동 강령지침을 모두 선택 하세요\"}]}',3,'2019-09-01 15:39:51','select',0,1),(66,6,'{\"articles\": {\"form\": [\"예\", \"아니요\", \"모르겠다\"], \"type\": \"select\"}, \"question\": [{\"type\": \"text\", \"datas\": \"회사의 경영시스템 내에 기업 윤리와 관련한 팀을 운영하고 있습니까?\"}]}',2,'2019-09-01 15:39:50','select',0,1),(67,7,'{\"articles\": {\"form\": [\"예\", \"아니요\", \"모르겠다\"], \"type\": \"select\"}, \"question\": [{\"type\": \"text\", \"datas\": \"회사의 경영시스템 내에 기업 윤리와 관련한 팀을 운영하고 있습니까?\"}]}',2,'2019-09-01 15:39:50','select',0,1),(68,8,'{\"articles\": {\"form\": [\"예\", \"아니요\", \"모르겠다\"], \"type\": \"select\"}, \"question\": [{\"type\": \"text\", \"datas\": \"회사의 경영시스템 내에 기업 윤리와 관련한 팀을 운영하고 있습니까?\"}]}',2,'2019-09-01 15:39:50','select',0,1),(69,8,'{\"articles\": {\"form\": [\"예\", \"아니요\", \"모르겠다\"], \"type\": \"select\"}, \"question\": [{\"type\": \"text\", \"datas\": \"회사의 경영시스템 내에 기업 윤리와 관련한 팀을 운영하고 있습니까?\"}]}',2,'2019-09-01 15:39:50','select',0,1);
/*!40000 ALTER TABLE `questions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_info`
--

DROP TABLE IF EXISTS `user_info`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_info` (
  `id` varchar(255) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(45) DEFAULT NULL,
  `profile` varchar(45) DEFAULT NULL,
  `photo` varchar(255) DEFAULT NULL,
  `user_name` varchar(45) DEFAULT NULL,
  `first_name` varchar(45) DEFAULT NULL,
  `last_name` varchar(45) DEFAULT NULL,
  `phone` varchar(45) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `city` varchar(45) DEFAULT NULL,
  `country` varchar(45) DEFAULT NULL,
  `postal_code` varchar(45) DEFAULT NULL,
  `about` varchar(255) DEFAULT NULL,
  `code` varchar(45) DEFAULT '',
  `level` int(11) DEFAULT '0',
  `company_code` varchar(45) DEFAULT NULL,
  `date` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `agreement` tinyint(4) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_info`
--

LOCK TABLES `user_info` WRITE;
/*!40000 ALTER TABLE `user_info` DISABLE KEYS */;
INSERT INTO `user_info` VALUES ('210CF7AA5E1682C9C9D4111F88FA1789','dev4@dev4.com','dev4',NULL,'/image/210CF7AA5E2682C9C9D4511F88FE2789/admin.jpg','이응용','dev4','Power','0104443333','132, My Street,','Seoul','Kor','123123','this is admin account do not use this account','',0,'sam1','2019-09-15 00:13:24',1),('210CF7AA5E1682C9C9D4511F88FA2789','dev@dev.com','dev',NULL,'/image/210CF7AA5E2682C9C9D4511F88FE2789/admin.jpg','김철수','dev','Power','0104443333','132, My Street,','Seoul','Kor','123123','this is admin account do not use this account','',0,'sam1','2019-09-15 00:13:08',1),('210CF7AA5E2182C9C9D4511F88FE2789','admin@admin.com','admin',NULL,'/image/210CF7AA5E2682C9C9D4511F88FE2789/admin.jpg','관리자','Super','Admin','0104443333','132, My Street,','Seoul','Kor','123123','this is admin account do not use this account','admincode',1,'sam1','2019-09-15 00:13:08',1),('210CF7AA5E2482C9C9D4311F88FA1789','dev3@dev3.com','dev4',NULL,'/image/210CF7AA5E2682C9C9D4511F88FE2789/admin.jpg','김다래','dev3','Power','0104443333','132, My Street,','Seoul','Kor','123123','this is admin account do not use this account','',0,'sam1','2019-09-15 00:13:24',0),('210CF7AA5E2682C9C9D4511F88FA1789','dev2@dev2.com','dev2',NULL,'/image/210CF7AA5E2682C9C9D4511F88FE2789/admin.jpg','박민수','dev2','Power','0104443333','132, My Street,','Seoul','Kor','123123','this is admin account do not use this account','',0,'sam1','2019-09-15 00:13:24',1),('210CF7AA5E4682C9C9D4511F88FE2778','user@user.com','user',NULL,'/image/210CF7AA5E2682C9C9D4511F88FE2789/admin.jpg','김승철','Normal','Mad','0104443333','132, My Street,','Jeju','Kor','333444','this is user account ','',0,'sam1','2019-09-15 00:13:24',0);
/*!40000 ALTER TABLE `user_info` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-09-15  0:19:37
