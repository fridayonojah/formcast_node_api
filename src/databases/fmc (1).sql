-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 12, 2023 at 09:42 PM
-- Server version: 10.4.14-MariaDB
-- PHP Version: 7.4.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `fmc`
--

-- --------------------------------------------------------

--
-- Table structure for table `account`
--

CREATE TABLE `account` (
  `id` int(11) NOT NULL,
  `firstname` varchar(500) NOT NULL,
  `lastname` varchar(500) NOT NULL,
  `email` varchar(500) NOT NULL,
  `phone` varchar(500) NOT NULL,
  `password` varchar(500) NOT NULL,
  `plan` bigint(20) NOT NULL,
  `status` bigint(20) DEFAULT 1,
  `country` varchar(300) NOT NULL,
  `address` varchar(300) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `account`
--

INSERT INTO `account` (`id`, `firstname`, `lastname`, `email`, `phone`, `password`, `plan`, `status`, `country`, `address`) VALUES
(1, 'friday', 'onojah', 'fridayonojah360@gmail.com', '09018019637', '$2y$10$8iAr9a4HQ7t9dA8OUCkxbONyLHJASlCU07ZgKzOkebvF3HGR/OwCi', 1, 1, 'nigeria', 'no:22 audu street jabi'),
(2, 'friday', 'onojah', 'forscaling@gmail.com', '09018019630', '$2y$10$SUlxt4ASXcsDmUhXdVjqaOjpQvxI4qTSa2kE.5u5SRwypQDfgnFcy', 1, 1, 'nigeria', 'no:22 audu'),
(3, 'friday', 'onojah', 'admin@gmail.com', '0901801987', '$2y$10$e6Tf75IjT5hevl9XnuWFCOBg7MvA6x2Pcz8wHzAaEU5Wjq8uqPvsC', 2, 1, 'nigeria', 'no:22 audu'),
(4, 'friday', 'onojah', 'ad@gmail.com', '090180190', '$2y$10$VxAbgc2z2wdQAhf/pXA8HuFG4S1EJrJ66sUSWYh6RYPexxl5xHxEa', 1, 1, 'nigeria', 'no:22 audu');

-- --------------------------------------------------------

--
-- Table structure for table `buildings`
--

CREATE TABLE `buildings` (
  `id` int(11) NOT NULL,
  `design_id` varchar(100) NOT NULL,
  `companyname` varchar(500) NOT NULL,
  `phonenumber` varchar(17) NOT NULL,
  `emailaddress` varchar(500) NOT NULL,
  `building_cate` varchar(500) NOT NULL,
  `building_type` varchar(500) NOT NULL,
  `building_status` varchar(500) NOT NULL,
  `bed` varchar(500) NOT NULL,
  `Bath` varchar(500) NOT NULL,
  `Sqft` varchar(500) NOT NULL,
  `price` varchar(100) NOT NULL,
  `building_description` text NOT NULL,
  `archplanOne` varchar(500) NOT NULL,
  `archplanTwo` varchar(500) NOT NULL,
  `archplantThree` varchar(500) NOT NULL,
  `archplantfour` varchar(500) NOT NULL,
  `archplanfive` varchar(500) NOT NULL,
  `archplansix` varchar(500) NOT NULL,
  `archplantseven` varchar(500) NOT NULL,
  `archplanteight` varchar(500) NOT NULL,
  `StructplanOne` varchar(500) NOT NULL,
  `StructplanTwo` varchar(500) NOT NULL,
  `StructplanThree` varchar(500) NOT NULL,
  `Structplanfour` varchar(500) NOT NULL,
  `Structplanfive` varchar(500) NOT NULL,
  `Structplansix` varchar(500) NOT NULL,
  `Structplanseven` varchar(500) NOT NULL,
  `Structplaneight` varchar(500) NOT NULL,
  `ElectricalplanOne` varchar(500) NOT NULL,
  `ElectricalplanTwo` varchar(500) NOT NULL,
  `ElectricalplanThree` text NOT NULL,
  `Electricalplanfour` text NOT NULL,
  `Electricalplanfive` text NOT NULL,
  `Electricalplansix` varchar(500) NOT NULL,
  `Electricalplanseven` text NOT NULL,
  `Electricalplaneight` text NOT NULL,
  `MechanicalplanOne` text NOT NULL,
  `MechanicalplanTwo` text NOT NULL,
  `MechanicalplanThree` text NOT NULL,
  `Mechanicalplanfour` text NOT NULL,
  `Mechanicalplanfive` text NOT NULL,
  `Mechanicalplansix` text NOT NULL,
  `Mechanicalplanseven` text NOT NULL,
  `Mechanicalplaneight` text NOT NULL,
  `main_view` text NOT NULL,
  `front_view` varchar(500) NOT NULL,
  `side_view` varchar(500) NOT NULL,
  `back_view` varchar(500) NOT NULL,
  `main_interior_one` text NOT NULL,
  `interior_two` text NOT NULL,
  `interior_three` text NOT NULL,
  `interior_four` text NOT NULL,
  `video` text NOT NULL,
  `animation` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `buildings`
--

INSERT INTO `buildings` (`id`, `design_id`, `companyname`, `phonenumber`, `emailaddress`, `building_cate`, `building_type`, `building_status`, `bed`, `Bath`, `Sqft`, `price`, `building_description`, `archplanOne`, `archplanTwo`, `archplantThree`, `archplantfour`, `archplanfive`, `archplansix`, `archplantseven`, `archplanteight`, `StructplanOne`, `StructplanTwo`, `StructplanThree`, `Structplanfour`, `Structplanfive`, `Structplansix`, `Structplanseven`, `Structplaneight`, `ElectricalplanOne`, `ElectricalplanTwo`, `ElectricalplanThree`, `Electricalplanfour`, `Electricalplanfive`, `Electricalplansix`, `Electricalplanseven`, `Electricalplaneight`, `MechanicalplanOne`, `MechanicalplanTwo`, `MechanicalplanThree`, `Mechanicalplanfour`, `Mechanicalplanfive`, `Mechanicalplansix`, `Mechanicalplanseven`, `Mechanicalplaneight`, `main_view`, `front_view`, `side_view`, `back_view`, `main_interior_one`, `interior_two`, `interior_three`, `interior_four`, `video`, `animation`) VALUES
(1, 'Formcast178', 'fin', '09018019637', 'forscaling@gmail.com', 'Duplex', '2 Bed duplex', 'Sale', '12', '3', '128', '12000', 'content', 'loor-to-ceiling', 'Site Plan', 'Site Plan', 'loor-to-ceiling', 'loor-to-ceiling', 'loor-to-ceiling', 'loor-to-ceiling', 'loor-to-ceiling', 'loor-to-ceiling', 'loor-to-ceiling', 'Site Plan', 'Site Plan', 'Site Plan', 'Site Plan', 'Site Plan', 'Site Plan', 'Site Plan', 'Site Plan', 'loor-to-ceiling', 'Site Plan', 'loor-to-ceiling', 'Site Plan', 'loor-to-ceiling', 'loor-to-ceiling', 'Column Section', 'loor-to-ceiling', 'Column Section', 'loor-to-ceiling', 'Column Section', 'Column Section', 'Column Section', 'Column second table', 'fmc_pix_1671561892.', 'fmc_pix_1671561892.', 'fmc_pix_1671561892.', 'fmc_pix_1671561892.', 'fmc_pix_1671561892.', 'fmc_pix_1671561892.', 'fmc_pix_1671561892.', 'fmc_pix_1671561892.', 'fmc_pix_1671561892.', 'fmc_pix_1671561892.'),
(3, '124556', 'harjo tech', '09018019637', 'forscaling@gmail.com', 'Hotel', '2 Bed duplex', 'Sale', '12', '3', '128', '12000', 'If you&amp;amp;rsquo;re looking to design of your dream home but don&amp;amp;rsquo;t know where to begin, you&amp;amp;rsquo;re in the right place!', 'loor-to-ceiling', 'Site Plan', 'Site Plan', 'loor-to-ceiling', 'loor-to-ceiling', 'loor-to-ceiling', 'loor-to-ceiling', 'loor-to-ceiling', 'loor-to-ceiling', 'loor-to-ceiling', 'Site Plan', 'Site Plan', 'Site Plan', 'Site Plan', 'Site Plan', 'Site Plan', 'Site Plan', 'Site Plan', 'loor-to-ceiling', 'Site Plan', 'loor-to-ceiling', 'Site Plan', 'loor-to-ceiling', 'loor-to-ceiling', 'Column Section', 'loor-to-ceiling', 'Column Section', 'loor-to-ceiling', 'Column Section', 'Column Section', 'Column Section', 'Column second table', 'fmc_pix_1680611579.', 'fmc_pix_1680611579.', 'fmc_pix_1680611579.', 'fmc_pix_1680611579.', 'fmc_pix_1680611579.', 'fmc_pix_1680611579.', 'fmc_pix_1680611579.', 'fmc_pix_1680611579.', 'fmc_pix_1680611579.', 'fmc_pix_1680611579.'),
(8, 'FORMCAST276', 'harjo tech', '09018019637', 'fridayonojah360@gmail.com', 'Simi Duplex', '4 bedroom flat', 'Sale', '3', '4', '13', '3000000', 'The languages only differ in their grammar, their pronunciation and their most common words. Everyone realizes why a new common language would be desirable: one could refuse to pay expensive translators.', 'loor-to-ceiling', 'loor-to-ceiling', 'loor-to-ceiling', 'loor-to-ceiling', 'loor-to-ceiling', 'loor-to-ceiling', 'loor-to-ceiling', 'loor-to-ceiling', 'loor-to-ceiling', 'loor-to-ceiling', 'loor-to-ceiling', 'loor-to-ceiling', 'loor-to-ceiling', 'loor-to-ceiling', 'loor-to-ceiling', 'loor-to-ceiling', 'loor-to-ceiling', 'loor-to-ceiling', 'loor-to-ceiling', 'loor-to-ceiling', 'loor-to-ceiling', 'loor-to-ceiling', 'loor-to-ceiling', 'loor-to-ceiling', 'loor-to-ceiling', 'loor-to-ceiling', 'loor-to-ceiling', 'loor-to-ceiling', 'loor-to-ceiling', 'loor-to-ceiling', 'loor-to-ceiling', 'loor-to-ceiling', 'fmc_pix_1684313860.jpeg', 'fmc_pix_1684313860.jpeg', 'fmc_pix_1684313860.jpeg', 'fmc_pix_1684313860.jpeg', 'fmc_pix_1684313860.jpg', 'fmc_pix_1684313860.jpg', 'fmc_pix_1684313860.jpg', 'fmc_pix_1684313860.jpeg', 'fmc_pix_1684313860.mp4', 'fmc_pix_1684313860.mp4'),
(9, 'FORMCAST276', 'harjo tech', '09018019637', 'fridayonojah360@gmail.com', 'Simi Duplex', '4 bedroom flat', 'Sale', '3', '4', '13', '3000000', 'The languages only differ in their grammar, their pronunciation and their most common words. Everyone realizes why a new common language would be desirable: one could refuse to pay expensive translators.', 'loor-to-ceiling', 'loor-to-ceiling', 'loor-to-ceiling', 'loor-to-ceiling', 'loor-to-ceiling', 'loor-to-ceiling', 'loor-to-ceiling', 'loor-to-ceiling', 'loor-to-ceiling', 'loor-to-ceiling', 'loor-to-ceiling', 'loor-to-ceiling', 'loor-to-ceiling', 'loor-to-ceiling', 'loor-to-ceiling', 'loor-to-ceiling', 'loor-to-ceiling', 'loor-to-ceiling', 'loor-to-ceiling', 'loor-to-ceiling', 'loor-to-ceiling', 'loor-to-ceiling', 'loor-to-ceiling', 'loor-to-ceiling', 'loor-to-ceiling', 'loor-to-ceiling', 'loor-to-ceiling', 'loor-to-ceiling', 'loor-to-ceiling', 'loor-to-ceiling', 'loor-to-ceiling', 'loor-to-ceiling', 'fmc_pix_1684313930.jpeg', 'fmc_pix_1684313930.jpeg', 'fmc_pix_1684313930.jpeg', 'fmc_pix_1684313930.jpeg', 'fmc_pix_1684313930.jpg', 'fmc_pix_1684313930.jpg', 'fmc_pix_1684313930.jpg', 'fmc_pix_1684313930.jpeg', 'fmc_pix_1684313930.jpeg', 'fmc_pix_1684313930.jpeg');

-- --------------------------------------------------------

--
-- Table structure for table `building_types`
--

CREATE TABLE `building_types` (
  `id` int(11) NOT NULL,
  `typename` varchar(100) NOT NULL,
  `author` varchar(100) NOT NULL,
  `date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `building_types`
--

INSERT INTO `building_types` (`id`, `typename`, `author`, `date`) VALUES
(6, '1 Bedroom Bungalows', 'formcast', '2022-09-24 14:09:31'),
(7, '4 bedroom flat', 'formcast', '2022-09-28 14:33:58'),
(8, '3 bedroom flat', 'formcast', '2022-09-29 12:48:44');

-- --------------------------------------------------------

--
-- Table structure for table `categorey`
--

CREATE TABLE `categorey` (
  `id` int(11) NOT NULL,
  `categoreyname` varchar(100) NOT NULL,
  `author` varchar(100) NOT NULL,
  `date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `categorey`
--

INSERT INTO `categorey` (`id`, `categoreyname`, `author`, `date`) VALUES
(10, 'Hotel', 'formcast', '2022-10-19 11:18:23'),
(11, 'Simi Duplex', 'formcast', '2022-10-29 13:31:57');

-- --------------------------------------------------------

--
-- Table structure for table `client_tbl`
--

CREATE TABLE `client_tbl` (
  `id` int(11) NOT NULL,
  `client` varchar(500) NOT NULL,
  `project` varchar(500) NOT NULL,
  `design_id` varchar(500) NOT NULL,
  `user_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `client_tbl`
--

INSERT INTO `client_tbl` (`id`, `client`, `project`, `design_id`, `user_id`) VALUES
(104, 'james test abuja', 'abuja', '23456', 6),
(105, 'JAMES', 'JAMES CONST PLOT @90 WUSE', '23456', 23);

-- --------------------------------------------------------

--
-- Table structure for table `file`
--

CREATE TABLE `file` (
  `id` int(11) NOT NULL,
  `file` text NOT NULL,
  `design_id` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `file`
--

INSERT INTO `file` (`id`, `file`, `design_id`) VALUES
(1, 'fmc_pix_1685607534.zip', '23456');

-- --------------------------------------------------------

--
-- Table structure for table `files_tbl`
--

CREATE TABLE `files_tbl` (
  `id` int(11) NOT NULL,
  `design_by` varchar(300) NOT NULL,
  `checked_by` varchar(256) NOT NULL,
  `scale` varchar(225) NOT NULL,
  `date` varchar(80) NOT NULL,
  `swd` varchar(14) NOT NULL,
  `design_id` varchar(100) NOT NULL,
  `file` varchar(100) NOT NULL,
  `title` varchar(500) NOT NULL,
  `other_files` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `files_tbl`
--

INSERT INTO `files_tbl` (`id`, `design_by`, `checked_by`, `scale`, `date`, `swd`, `design_id`, `file`, `title`, `other_files`) VALUES
(56, 'FORMCAST', 'JAMES DANIEL', '1:100', '2023-06-14', '02', '23456', 'Nigerian-houseplan.jpg', 'GROUND FLOOR', 'fmc_pix_1685607534.zip'),
(57, 'JAMES PAUL', 'WIND', '1:100', '2023-06-01', '03', '23456', 'without-border.jpg', 'WIND TWO', 'fmc_pix_1685649368.zip'),
(60, 'Formcast', 'Gskills Computer', '1:100', '2023-06-08', '01', '23456', 'ROOF.pdf', 'TRYING WITH PDFS', 'fmc_pix_1686233696.jpeg');

-- --------------------------------------------------------

--
-- Table structure for table `news_sub_tbl`
--

CREATE TABLE `news_sub_tbl` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `news_sub_tbl`
--

INSERT INTO `news_sub_tbl` (`id`, `name`, `email`) VALUES
(1, 'friday wwww onojah', 'forscaling@gmail.com'),
(2, 'dev', 'fridayonojah360@gmail.com'),
(3, 'dev', 'fridayonojah360@gmail.com'),
(4, 'friday wwww onojah', 'fridayonojah360@gmail.com'),
(5, 'friday wwww onojah', 'fridayonojah360@gmail.com');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `email` varchar(100) NOT NULL,
  `fullname` varchar(225) NOT NULL,
  `password` varchar(100) NOT NULL,
  `username` varchar(100) NOT NULL,
  `role` int(6) NOT NULL,
  `profile_pix` varchar(225) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `email`, `fullname`, `password`, `username`, `role`, `profile_pix`) VALUES
(3, 'fridayonojah360@gmail.com', 'friday onojah', '$2y$10$aTDurG9EFNuClXZElAeKkOijDL2blK12H8pjXaLcUQJOkxNR2286e', 'onojah', 1, 'dashboard.png'),
(4, 'formcast@gmail.com', 'formcast', '$2y$10$N8xCYF/KaU3TFfQwlVCzwO3AdutmWClG7cd8KZLX0Bc0xj3lVKlTK', 'formcast', 1, 'bg-auth.jpg'),
(5, 'admin@gmail.com', 'friday onojah', '$2y$10$UAeFZxUPFly.cyBS8lRZkuUHNgviszNt/r2bw9.Yqlf/lO8gu9V/2', 'admin_12345', 1, 'card.png');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `account`
--
ALTER TABLE `account`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `buildings`
--
ALTER TABLE `buildings`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `building_types`
--
ALTER TABLE `building_types`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `categorey`
--
ALTER TABLE `categorey`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `client_tbl`
--
ALTER TABLE `client_tbl`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `file`
--
ALTER TABLE `file`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `files_tbl`
--
ALTER TABLE `files_tbl`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `news_sub_tbl`
--
ALTER TABLE `news_sub_tbl`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `account`
--
ALTER TABLE `account`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `buildings`
--
ALTER TABLE `buildings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `building_types`
--
ALTER TABLE `building_types`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `categorey`
--
ALTER TABLE `categorey`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `client_tbl`
--
ALTER TABLE `client_tbl`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=106;

--
-- AUTO_INCREMENT for table `file`
--
ALTER TABLE `file`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `files_tbl`
--
ALTER TABLE `files_tbl`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=61;

--
-- AUTO_INCREMENT for table `news_sub_tbl`
--
ALTER TABLE `news_sub_tbl`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
