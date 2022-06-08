## Contact Management System

Project created by me to practice my NodeJs skills and execute a test for a company.
I created a RESTFUL API for the Back-end using Express, other NodeJs libraries and MySql for Database.
For the Front-end i used Bootstrap + Jquery.

- To run the project you'll need to:
  - Use some web server or similar to run the front end. I used the vscode extension - [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer).
  - Have NodeJs and Yarn to install the project dependencies.
  - You'll need to create the files inside gitignore (including .env).
  - The Database Schema can be found bellow.
  - Give the Database any name you like.

#### DATABASE SCHEMA:

```SQL

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

CREATE TABLE `tb_address` (
  `id` int(11) UNSIGNED NOT NULL,
  `contactId` int(11) NOT NULL,
  `cep` varchar(8) COLLATE utf8mb4_unicode_ci NOT NULL,
  `street` varchar(175) COLLATE utf8mb4_unicode_ci NOT NULL,
  `state` varchar(175) COLLATE utf8mb4_unicode_ci NOT NULL,
  `city` varchar(175) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


CREATE TABLE `tb_contact` (
  `id` int(11) UNSIGNED NOT NULL,
  `userId` int(11) NOT NULL,
  `name` varchar(175) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `lastName` varchar(175) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(75) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `phone` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `profilePic` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `tb_phone` (
  `id` int(11) UNSIGNED NOT NULL,
  `contactId` int(11) NOT NULL,
  `number` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `type` int(3) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `tb_user` (
  `id` int(11) UNSIGNED NOT NULL,
  `name` varchar(175) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(1000) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(150) COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `profilePic` varchar(75) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

ALTER TABLE `tb_address`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `tb_contact`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `tb_phone`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `tb_user`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `tb_address`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT;

ALTER TABLE `tb_contact`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT;

ALTER TABLE `tb_phone`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT;

ALTER TABLE `tb_user`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
```
