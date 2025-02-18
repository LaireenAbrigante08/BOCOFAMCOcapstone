-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 16, 2025 at 08:01 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `capstone1`
--

-- --------------------------------------------------------

--
-- Table structure for table `members`
--

CREATE TABLE `members` (
  `id` int(11) NOT NULL,
  `cb_number` varchar(50) NOT NULL,
  `first_name` varchar(100) NOT NULL,
  `middle_name` varchar(100) DEFAULT NULL,
  `last_name` varchar(100) NOT NULL,
  `address` text NOT NULL,
  `dob` date NOT NULL,
  `email` varchar(255) NOT NULL,
  `gender` enum('Male','Female') NOT NULL,
  `contact_number` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `members`
--

INSERT INTO `members` (`id`, `cb_number`, `first_name`, `middle_name`, `last_name`, `address`, `dob`, `email`, `gender`, `contact_number`) VALUES
(1, 'Eman123', 'Emmanuel', 'Manalo', 'Abrigante', 'Sta Rita Calapan City', '2000-12-12', 'Eman@gmail.com', 'Male', '09287032144'),
(2, 'Kert123', 'Kert', 'Sese', 'Manalo', 'Sta. Rita. Calapan City', '2005-02-16', 'kert@gmail.com', 'Male', '09876543212'),
(3, 'Reyven123', 'reyven', 'Bonak', 'manalo', 'labiang 2', '2000-12-12', 'pangit@gmail.com', 'Male', '09876543212');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `cb_number` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('admin','member') NOT NULL DEFAULT 'member',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `cb_number`, `password`, `role`, `created_at`) VALUES
(3, 'ADMIN_NEW', '$2b$10$GaV/JApi108ShGJXxjSQOODYLpIAB6z60mN2VMuxFSqG/278SPygm', 'admin', '2025-02-16 01:57:41'),
(4, 'Lai123', '$2b$10$1/bD0natxn8DUP08NW2zk.2FYiiry19KO9.lClMPbmitZ98Ywyt9q', 'member', '2025-02-16 02:11:41'),
(5, 'Jen123', '$2b$10$h0PMgksma9ZWY4R7d.kk6e3E0DeM.wOpFLbHDZeVl3Y6GX/OK/LiW', 'member', '2025-02-16 04:07:50'),
(6, 'Eman123', '$2b$10$lwJhgjoUhdHOA6l5ZfRZX.tbSyLfJM0xEZU8Wpt6mIDoO/AeAgDPO', 'member', '2025-02-16 04:32:11'),
(7, 'Kert123', '$2b$10$1cMt5QnXICS2MkhpBiv9C.BK92YvzGT8iHCBwYrgigkG.dwVNq5S6', 'member', '2025-02-16 06:25:50'),
(9, 'Reyven123', '$2b$10$L2tMST2V1NWHvJOgaFqn8e.g.LZWugSlVgd4WO/aynr43e9U3Tm7m', 'member', '2025-02-16 06:53:19');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `members`
--
ALTER TABLE `members`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `cb_number` (`cb_number`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `cb_number` (`cb_number`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `members`
--
ALTER TABLE `members`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `members`
--
ALTER TABLE `members`
  ADD CONSTRAINT `fk_members_users` FOREIGN KEY (`cb_number`) REFERENCES `users` (`cb_number`) ON DELETE CASCADE,
  ADD CONSTRAINT `members_ibfk_1` FOREIGN KEY (`cb_number`) REFERENCES `users` (`cb_number`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
