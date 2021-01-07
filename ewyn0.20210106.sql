CREATE DATABASE  IF NOT EXISTS `ewyn0` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `ewyn0`;
-- MySQL dump 10.13  Distrib 8.0.21, for Win64 (x86_64)
--
-- Host: localhost    Database: ewyn0
-- ------------------------------------------------------
-- Server version	8.0.21

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `attendance`
--

DROP TABLE IF EXISTS `attendance`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `attendance` (
  `attendanceid` int NOT NULL AUTO_INCREMENT,
  `date` date NOT NULL,
  `weight` decimal(10,6) NOT NULL,
  `cardio` varchar(50) NOT NULL,
  `comment` varchar(512) NOT NULL,
  `due_to_return` date NOT NULL,
  `customerid` int NOT NULL,
  `compliancyid` int NOT NULL,
  PRIMARY KEY (`attendanceid`),
  KEY `customerid_idx` (`customerid`),
  KEY `compliancyid_idx` (`compliancyid`),
  CONSTRAINT `compliancyid` FOREIGN KEY (`compliancyid`) REFERENCES `compliancy` (`compliancyid`),
  CONSTRAINT `customerid` FOREIGN KEY (`customerid`) REFERENCES `customer` (`customerid`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `attendance`
--

LOCK TABLES `attendance` WRITE;
/*!40000 ALTER TABLE `attendance` DISABLE KEYS */;
INSERT INTO `attendance` VALUES (1,'2020-01-07',102.000000,'Exercise3','abcdef...','2020-12-15',1,1),(3,'2019-12-12',123.000000,'Exercise1','uvwxyz...','2019-12-31',2,1),(5,'2020-12-14',123.000000,'','','2020-12-21',1,1),(6,'2020-12-21',113.000000,'','','2020-12-21',1,1),(7,'2020-12-28',90.990000,'','','2021-01-07',1,1);
/*!40000 ALTER TABLE `attendance` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `compliancy`
--

DROP TABLE IF EXISTS `compliancy`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `compliancy` (
  `compliancyid` int NOT NULL AUTO_INCREMENT,
  `compliancy_name` varchar(45) NOT NULL,
  PRIMARY KEY (`compliancyid`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `compliancy`
--

LOCK TABLES `compliancy` WRITE;
/*!40000 ALTER TABLE `compliancy` DISABLE KEYS */;
INSERT INTO `compliancy` VALUES (1,'Fully Compliant'),(2,'Partically Compliant'),(3,'Forgot'),(4,'Ran out'),(5,'Refuses to take');
/*!40000 ALTER TABLE `compliancy` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `customer`
--

DROP TABLE IF EXISTS `customer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `customer` (
  `customerid` int NOT NULL AUTO_INCREMENT,
  `first_name` varchar(45) NOT NULL,
  `last_name` varchar(45) NOT NULL,
  `telephone` varchar(16) NOT NULL,
  `goal_date` date NOT NULL,
  `email` varchar(50) NOT NULL,
  `reason` varchar(512) NOT NULL,
  `start_date` date NOT NULL,
  `start_weight` decimal(10,6) NOT NULL,
  `goal_weight` decimal(10,6) NOT NULL,
  `programid` int NOT NULL,
  `productid` int NOT NULL,
  `recommend` int DEFAULT NULL,
  `actived` tinyint NOT NULL DEFAULT '1',
  PRIMARY KEY (`customerid`),
  KEY `productid_idx` (`productid`),
  KEY `recommend_idx` (`recommend`),
  CONSTRAINT `productid` FOREIGN KEY (`productid`) REFERENCES `product` (`productid`),
  CONSTRAINT `programid` FOREIGN KEY (`productid`) REFERENCES `program` (`programid`),
  CONSTRAINT `recommend` FOREIGN KEY (`recommend`) REFERENCES `product` (`productid`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customer`
--

LOCK TABLES `customer` WRITE;
/*!40000 ALTER TABLE `customer` DISABLE KEYS */;
INSERT INTO `customer` VALUES (1,'Jason','Wang','1231231234','2021-12-31','abc@abc.com','xxx...','2020-12-31',321.000000,123.000000,1,2,2,1),(2,'Mark','Ma','3213214321','2022-01-04','def@def.com','xyz','2019-09-22',213.000000,132.000000,5,1,3,1),(3,'Test','Robot','1112223333','2021-12-31','abc@zxy.com','xxx...abc','2020-12-31',456.000000,312.000000,1,1,2,1);
/*!40000 ALTER TABLE `customer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `measurement`
--

DROP TABLE IF EXISTS `measurement`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `measurement` (
  `measurementid` int NOT NULL AUTO_INCREMENT,
  `date` date NOT NULL,
  `phc_initial` varchar(45) DEFAULT NULL,
  `weight` decimal(10,6) NOT NULL,
  `bust_chest` decimal(10,6) NOT NULL,
  `waist` decimal(10,6) NOT NULL,
  `mid_section` decimal(10,6) NOT NULL,
  `hips` decimal(10,6) NOT NULL,
  `right_arm` decimal(10,6) NOT NULL,
  `right_thigh` decimal(10,6) NOT NULL,
  `total_inches` decimal(10,6) DEFAULT NULL,
  `inches_lost_to_date` decimal(10,6) DEFAULT NULL,
  `customerid` int NOT NULL,
  PRIMARY KEY (`measurementid`),
  KEY `customerid_idx` (`customerid`),
  CONSTRAINT `customerid_measurement` FOREIGN KEY (`customerid`) REFERENCES `customer` (`customerid`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `measurement`
--

LOCK TABLES `measurement` WRITE;
/*!40000 ALTER TABLE `measurement` DISABLE KEYS */;
INSERT INTO `measurement` VALUES (1,'2020-12-15','abc',123.000000,3.000000,0.000000,0.000000,0.000000,0.000000,0.000000,NULL,NULL,1);
/*!40000 ALTER TABLE `measurement` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product`
--

DROP TABLE IF EXISTS `product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product` (
  `productid` int NOT NULL AUTO_INCREMENT,
  `product_name` varchar(45) NOT NULL,
  `optional` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`productid`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product`
--

LOCK TABLES `product` WRITE;
/*!40000 ALTER TABLE `product` DISABLE KEYS */;
INSERT INTO `product` VALUES (1,'Product Option 1',0),(2,'Product Option 2',0),(3,'Product Option 3',1);
/*!40000 ALTER TABLE `product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `program`
--

DROP TABLE IF EXISTS `program`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `program` (
  `programid` int NOT NULL AUTO_INCREMENT,
  `program_name` varchar(45) NOT NULL,
  PRIMARY KEY (`programid`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `program`
--

LOCK TABLES `program` WRITE;
/*!40000 ALTER TABLE `program` DISABLE KEYS */;
INSERT INTO `program` VALUES (1,'Phase 1'),(2,'Phase 1 + Protein'),(3,'Stabilization (1,2,3)'),(4,'Active'),(5,'Maintenance');
/*!40000 ALTER TABLE `program` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `purchase`
--

DROP TABLE IF EXISTS `purchase`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `purchase` (
  `purchaseid` int NOT NULL AUTO_INCREMENT,
  `customerid` int NOT NULL,
  `productid` int NOT NULL,
  `due_date` date NOT NULL,
  `sold_date` date NOT NULL,
  `initial` varchar(45) DEFAULT NULL,
  `week` int NOT NULL DEFAULT '1',
  PRIMARY KEY (`purchaseid`),
  KEY `customerid_idx` (`customerid`),
  KEY `productid_purchase_idx` (`productid`),
  CONSTRAINT `customerid_purchase` FOREIGN KEY (`customerid`) REFERENCES `customer` (`customerid`),
  CONSTRAINT `productid_purchase` FOREIGN KEY (`productid`) REFERENCES `product` (`productid`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `purchase`
--

LOCK TABLES `purchase` WRITE;
/*!40000 ALTER TABLE `purchase` DISABLE KEYS */;
INSERT INTO `purchase` VALUES (1,1,1,'2020-12-23','2020-12-23',NULL,1),(2,1,2,'2020-12-23','2020-12-23',NULL,1),(3,1,3,'2020-12-23','2020-12-23',NULL,1),(4,1,2,'2020-12-30','2020-12-30',NULL,2);
/*!40000 ALTER TABLE `purchase` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `userid` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `first_name` varchar(45) NOT NULL,
  `last_name` varchar(45) NOT NULL,
  `startdate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `enddate` datetime DEFAULT NULL,
  `actived` tinyint NOT NULL DEFAULT '1',
  `permission` varchar(45) NOT NULL DEFAULT 'USER:1,ADMIN:0',
  `password` varchar(256) NOT NULL DEFAULT '3awRGXRe1erxzpsJuAPo5g==',
  `access_token` varchar(128) NOT NULL DEFAULT '',
  PRIMARY KEY (`userid`),
  UNIQUE KEY `userid_UNIQUE` (`userid`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'admin','Ewyn','Studios','2020-12-17 20:03:14',NULL,1,'USER:1,ADMIN:-1','3awRGXRe1erxzpsJuAPo5g==',''),(2,'admin_0','Mark','Ma','2020-12-18 00:41:32',NULL,1,'USER:1,ADMIN:0','3awRGXRe1erxzpsJuAPo5g==','gjHhSkkfNy7ISiis0BjEQgqbihRpAuaWBz1qespmW9qkETBSmeek7f1DFPYHGzkdAXkJ1iHdYeer2J3KnE/RNbpOw2nG2sUPHtF9pAytMTxoq9mog9oebwAY2DsOi8FV'),(3,'jason','Jason','Wang','2020-12-21 16:08:41',NULL,0,'USER:1,ADMIN:0','3awRGXRe1erxzpsJuAPo5g==','');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'ewyn0'
--

--
-- Dumping routines for database 'ewyn0'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-01-06 20:32:31
