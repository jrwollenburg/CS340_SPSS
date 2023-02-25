-- phpMyAdmin SQL Dump
-- version 5.2.0-1.el7.remi
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Feb 24, 2023 at 08:28 PM
-- Server version: 10.6.11-MariaDB-log
-- PHP Version: 8.2.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `cs340_wollenbj`
--

-- --------------------------------------------------------

--
-- Table structure for table `Instructors`
--

CREATE TABLE `Instructors` (
  `id_instructor` int(11) NOT NULL,
  `instructor_fname` varchar(45) NOT NULL,
  `instructor_lname` varchar(45) NOT NULL,
  `instructor_phone_number` varchar(15) NOT NULL,
  `years_of_experience` int(11) NOT NULL,
  `first_aid_certified` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

--
-- Dumping data for table `Instructors`
--

INSERT INTO `Instructors` (`id_instructor`, `instructor_fname`, `instructor_lname`, `instructor_phone_number`, `years_of_experience`, `first_aid_certified`) VALUES
(1, 'Jason', 'Wood', '440-652-7456', 5, 1),
(2, 'Jerold', 'Wehmeyer', '207-490-5451', 4, 1),
(3, 'Adrienne', 'Sweitzer', '843-226-9311', 3, 1),
(4, 'Janita', 'Steele', '907-340-8998', 2, 0),
(5, 'Maxine', 'Smalls', '509-528-3827', 1, 0);

-- --------------------------------------------------------

--
-- Table structure for table `Lessons`
--

CREATE TABLE `Lessons` (
  `id_lesson` int(11) NOT NULL,
  `lesson_name` varchar(255) NOT NULL,
  `id_proficiency` varchar(2) NOT NULL,
  `id_instructor` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

--
-- Dumping data for table `Lessons`
--

INSERT INTO `Lessons` (`id_lesson`, `lesson_name`, `id_proficiency`, `id_instructor`) VALUES
(1, 'Ski Gear Essentials', '1A', 5),
(2, 'French fries and pizza and other beginning movements on the slopes', '1B', 4),
(3, 'Keeping Skis Parallel and Being Mindful of Arm and Body Position', '2A', 3),
(4, 'Your First Ski Lesson', '1A', 1),
(5, 'Your Second Ski Lesson', '1B', 1);

-- --------------------------------------------------------

--
-- Table structure for table `Proficiencies`
--

CREATE TABLE `Proficiencies` (
  `id_proficiency` varchar(2) NOT NULL,
  `proficiency_name` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

--
-- Dumping data for table `Proficiencies`
--

INSERT INTO `Proficiencies` (`id_proficiency`, `proficiency_name`) VALUES
('3C', 'Advanced'),
('1C', 'Advanced Beginner'),
('2C', 'Advanced Intermediate'),
('3A', 'Early Advanced'),
('1A', 'Early Beginner'),
('2A', 'Early Intermediate'),
('3B', 'Mid Advanced'),
('1B', 'Mid Beginner'),
('2B', 'Mid Intermediate');

-- --------------------------------------------------------

--
-- Table structure for table `Students`
--

CREATE TABLE `Students` (
  `id_student` int(11) NOT NULL,
  `id_proficiency` varchar(2) DEFAULT NULL,
  `student_fname` varchar(45) NOT NULL,
  `student_lname` varchar(45) NOT NULL,
  `student_phone_number` varchar(15) DEFAULT NULL,
  `emergency_fname` varchar(45) NOT NULL,
  `emergency_lname` varchar(45) NOT NULL,
  `emergency_phone` varchar(45) NOT NULL,
  `waiver_signed` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

--
-- Dumping data for table `Students`
--

INSERT INTO `Students` (`id_student`, `id_proficiency`, `student_fname`, `student_lname`, `student_phone_number`, `emergency_fname`, `emergency_lname`, `emergency_phone`, `waiver_signed`) VALUES
(1, '1A', 'Aaron', 'Miller', '646-620-2601', 'Araceli', 'Barfield', '415-606-0643', 0),
(2, '1B', 'Anette', 'Adams', '361-484-7727', 'Sara', 'Carrera', '920-702-7461', 0),
(3, '1C', 'Gary', 'Hollingsworth', '573-300-3971', 'Lavonne', 'Jordan', '916-862-9093', 1),
(4, '2B', 'Robert', 'Thompson', '678-914-6782', 'Camelia', 'Sullivan', '971-506-9292', 0),
(5, NULL, 'Linda', 'Durant', '603-866-4438', 'Robert', 'Mason', '318-914-1704', 1);

-- --------------------------------------------------------

--
-- Table structure for table `Students_has_Lessons`
--

CREATE TABLE `Students_has_Lessons` (
  `id_student` int(11) NOT NULL,
  `id_lesson` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `Instructors`
--
ALTER TABLE `Instructors`
  ADD PRIMARY KEY (`id_instructor`),
  ADD UNIQUE KEY `id_instructor` (`id_instructor`),
  ADD UNIQUE KEY `instructor_phone_number` (`instructor_phone_number`);

--
-- Indexes for table `Lessons`
--
ALTER TABLE `Lessons`
  ADD PRIMARY KEY (`id_lesson`),
  ADD UNIQUE KEY `id_lesson` (`id_lesson`),
  ADD KEY `lesson_proficiency` (`id_proficiency`),
  ADD KEY `id_instructor` (`id_instructor`);

--
-- Indexes for table `Proficiencies`
--
ALTER TABLE `Proficiencies`
  ADD PRIMARY KEY (`id_proficiency`),
  ADD UNIQUE KEY `id_proficiency` (`id_proficiency`),
  ADD UNIQUE KEY `proficiency_name` (`proficiency_name`);

--
-- Indexes for table `Students`
--
ALTER TABLE `Students`
  ADD PRIMARY KEY (`id_student`),
  ADD UNIQUE KEY `id_student` (`id_student`),
  ADD KEY `student_proficiency` (`id_proficiency`);

--
-- Indexes for table `Students_has_Lessons`
--
ALTER TABLE `Students_has_Lessons`
  ADD PRIMARY KEY (`id_student`,`id_lesson`),
  ADD KEY `id_lesson` (`id_lesson`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `Instructors`
--
ALTER TABLE `Instructors`
  MODIFY `id_instructor` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `Lessons`
--
ALTER TABLE `Lessons`
  MODIFY `id_lesson` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `Students`
--
ALTER TABLE `Students`
  MODIFY `id_student` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `Lessons`
--
ALTER TABLE `Lessons`
  ADD CONSTRAINT `Lessons_ibfk_1` FOREIGN KEY (`id_proficiency`) REFERENCES `Proficiencies` (`id_proficiency`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `Lessons_ibfk_2` FOREIGN KEY (`id_instructor`) REFERENCES `Instructors` (`id_instructor`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `Students`
--
ALTER TABLE `Students`
  ADD CONSTRAINT `Students_ibfk_1` FOREIGN KEY (`id_proficiency`) REFERENCES `Proficiencies` (`id_proficiency`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `Students_has_Lessons`
--
ALTER TABLE `Students_has_Lessons`
  ADD CONSTRAINT `Students_has_Lessons_ibfk_1` FOREIGN KEY (`id_student`) REFERENCES `Students` (`id_student`) ON DELETE CASCADE ON UPDATE NO ACTION,
  ADD CONSTRAINT `Students_has_Lessons_ibfk_2` FOREIGN KEY (`id_lesson`) REFERENCES `Lessons` (`id_lesson`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
