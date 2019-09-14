-- MySQL dump 10.13  Distrib 5.7.27, for Linux (x86_64)
--
-- Host: localhost    Database: users
-- ------------------------------------------------------
-- Server version	5.7.27

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
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
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `answers` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uid` varchar(45) DEFAULT NULL,
  `answers` json DEFAULT NULL,
  `user_id` varchar(25) DEFAULT NULL,
  `category_id` int(11) DEFAULT NULL,
  `date` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
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
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `answers_confirm` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uid` varchar(45) DEFAULT NULL,
  `answers` json DEFAULT NULL,
  `user_id` varchar(255) DEFAULT NULL,
  `category_id` int(11) DEFAULT NULL,
  `date` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;
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
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `categories` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `desc` varchar(45) DEFAULT NULL,
  `child` tinyint(4) DEFAULT NULL,
  `parent_id` int(11) DEFAULT NULL,
  `company_id` int(11) DEFAULT NULL,
  `haschild` tinyint(4) DEFAULT '0',
  `part` varchar(255) DEFAULT '',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (1,'대기배출','대기배출 문제의식 조사',0,NULL,1,1,''),(2,'기후전략','기후전략에 대한 의식 조사',0,NULL,1,0,''),(4,'노동관행','노동관행에 대한 상식',0,NULL,1,0,''),(5,'인권','인권에 대한 법률 상식',0,NULL,1,0,''),(6,'인권정책','인권정책에 대한 의식 조사',0,NULL,1,0,''),(7,'이사회 운영','이사회 운영에 대하 관심도',0,NULL,1,0,''),(8,'경영 지원','경영지원',0,NULL,1,0,''),(9,'가정대기배출','가정내 대기 배출 정도 조사',1,1,1,0,''),(10,'자동차대기배출','자동차 대기 배출 정도 조사',1,1,1,0,''),(11,'대기배출','대기배출 문제의식 조사',0,NULL,2,0,''),(12,'기후전략','기후전략에 대한 의식 조사',0,NULL,2,0,''),(13,'노동관행','노동관행에 대한 상식',0,NULL,2,0,''),(14,'인권','인권에 대한 법률 상식',0,NULL,2,0,'');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ccategories`
--

DROP TABLE IF EXISTS `ccategories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
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
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `company_info` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `code` varchar(45) DEFAULT NULL,
  `name` varchar(45) DEFAULT NULL,
  `desc` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `code_UNIQUE` (`code`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `company_info`
--

LOCK TABLES `company_info` WRITE;
/*!40000 ALTER TABLE `company_info` DISABLE KEYS */;
INSERT INTO `company_info` VALUES (1,'amo1',' AMOREPACIFIC CORPORATION','아모레 퍼시픽'),(2,'sam1','Samsung','삼성 전자 사업부');
/*!40000 ALTER TABLE `company_info` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cquestions`
--

DROP TABLE IF EXISTS `cquestions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cquestions` (
  `id` int(11) NOT NULL,
  `category_id` int(11) DEFAULT NULL,
  `data` json DEFAULT NULL,
  `order` int(11) DEFAULT NULL,
  `date` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `type` varchar(45) DEFAULT NULL,
  `company_id` int(11) DEFAULT '0',
  `activate` tinyint(4) DEFAULT '1',
  `revision` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `revision_UNIQUE` (`revision`)
) ENGINE=InnoDB AUTO_INCREMENT=70 DEFAULT CHARSET=utf8mb4 COMMENT='type ''select'' radio, type ''file'', type ''text'', type ''table'', type ''check''';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cquestions`
--

LOCK TABLES `cquestions` WRITE;
/*!40000 ALTER TABLE `cquestions` DISABLE KEYS */;
/*!40000 ALTER TABLE `cquestions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `questions`
--

DROP TABLE IF EXISTS `questions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
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
) ENGINE=InnoDB AUTO_INCREMENT=70 DEFAULT CHARSET=utf8mb4 COMMENT='type ''select'' radio, type ''file'', type ''text'', type ''table'', type ''check''';
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
/*!40101 SET character_set_client = utf8 */;
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_info`
--

LOCK TABLES `user_info` WRITE;
/*!40000 ALTER TABLE `user_info` DISABLE KEYS */;
INSERT INTO `user_info` VALUES ('210CF7AA5E1682C9C9D4111F88FA1789','dev4@dev4.com','dev4',NULL,'/image/210CF7AA5E2682C9C9D4511F88FE2789/admin.jpg','Developer','dev4','Power','0104443333','132, My Street,','Seoul','Kor','123123','this is admin account do not use this account','',0,'amo1','2019-09-08 11:57:17',1),('210CF7AA5E1682C9C9D4511F88FA2789','dev@dev.com','dev',NULL,'/image/210CF7AA5E2682C9C9D4511F88FE2789/admin.jpg','Developer','dev','Power','0104443333','132, My Street,','Seoul','Kor','123123','this is admin account do not use this account','',0,'amo1','2019-09-03 05:49:47',1),('210CF7AA5E2182C9C9D4511F88FE2789','admin@admin.com','admin',NULL,'/image/210CF7AA5E2682C9C9D4511F88FE2789/admin.jpg','Administrator','Super','Admin','0104443333','132, My Street,','Seoul','Kor','123123','this is admin account do not use this account','admincode',1,'sam1','2019-09-02 10:36:13',0),('210CF7AA5E2482C9C9D4311F88FA1789','dev3@dev3.com','dev4',NULL,'/image/210CF7AA5E2682C9C9D4511F88FE2789/admin.jpg','Developer','dev3','Power','0104443333','132, My Street,','Seoul','Kor','123123','this is admin account do not use this account','',0,'amo1','2019-09-02 10:36:11',0),('210CF7AA5E2682C9C9D4511F88FA1789','dev2@dev2.com','dev2',NULL,'/image/210CF7AA5E2682C9C9D4511F88FE2789/admin.jpg','Developer','dev2','Power','0104443333','132, My Street,','Seoul','Kor','123123','this is admin account do not use this account','',0,'amo1','2019-09-03 07:58:29',1),('210CF7AA5E4682C9C9D4511F88FE2778','user@user.com','user',NULL,'/image/210CF7AA5E2682C9C9D4511F88FE2789/admin.jpg','user','Normal','Mad','0104443333','132, My Street,','Jeju','Kor','333444','this is user account ','',0,'amo1','2019-09-02 10:36:12',0);
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

-- Dump completed on 2019-09-13 16:33:42
