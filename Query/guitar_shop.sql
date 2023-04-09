-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 02, 2023 at 04:21 AM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.0.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `guitar_shop`
--

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `status` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `name`, `description`, `status`, `created_at`, `updated_at`) VALUES
(1, 'Guitar classic', NULL, 1, '2023-03-20 07:21:13', '2023-03-20 07:21:13'),
(2, 'Guitar aucostic', NULL, 1, '2023-03-20 07:21:26', '2023-03-20 07:21:26'),
(3, 'Ukulele', NULL, 1, '2023-03-20 07:21:41', '2023-03-20 07:21:41'),
(4, 'Phụ kiện', NULL, 0, '2023-03-20 07:21:55', '2023-03-30 14:28:36'),
(6, 'EQ', NULL, 1, '2023-03-30 09:03:46', '2023-03-30 09:03:46'),
(7, 'Bao đàn', NULL, 1, '2023-03-30 09:03:58', '2023-03-30 09:03:58'),
(8, 'Dây đàn', NULL, 1, '2023-03-30 09:04:30', '2023-03-30 09:04:30'),
(9, 'Capo', NULL, 1, '2023-03-30 09:07:36', '2023-03-30 09:07:36'),
(10, 'Loa', NULL, 1, '2023-03-30 09:15:15', '2023-03-30 09:15:15');

-- --------------------------------------------------------

--
-- Table structure for table `discounts`
--

CREATE TABLE `discounts` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `code` varchar(255) NOT NULL,
  `value` double(8,2) NOT NULL,
  `status` int(11) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `label` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `discounts`
--

INSERT INTO `discounts` (`id`, `code`, `value`, `status`, `created_at`, `updated_at`, `label`) VALUES
(1, 'DOANK14', 0.80, 1, '2023-03-26 08:32:01', '2023-03-26 13:18:55', 'Giảm giá 20%'),
(2, 'TestCreate', 0.70, 0, '2023-03-26 09:29:25', '2023-03-26 09:29:25', 'Giảm giá 30%');

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '2023_03_12_013618_create_categories_table', 1),
(2, '2023_03_12_014519_create_products_table', 1),
(3, '2023_03_12_022129_create_users_table', 1),
(4, '2023_03_12_022922_create_orders_table', 1),
(5, '2023_03_12_024145_create_order_details_table', 1),
(6, '2023_03_25_135712_add_brand_to_product', 2),
(7, '2023_03_26_075705_create_discount_table', 3),
(8, '2023_03_26_082746_add_label_to_discount_table', 4),
(9, '2023_03_28_020914_create_ratings_table', 5),
(10, '2023_03_29_091239_add_birth_and_gender_to_users_table', 6);

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `full_name` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `phone` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `note` varchar(255) DEFAULT NULL,
  `quantity` int(11) NOT NULL,
  `total_price` int(11) NOT NULL,
  `status` tinyint(4) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`id`, `user_id`, `full_name`, `address`, `phone`, `email`, `note`, `quantity`, `total_price`, `status`, `created_at`, `updated_at`) VALUES
(26, 2, 'Nguyễn Đức Huy', 'Cổ Nhuế 2', 362274026, 'inuyasha160201@gmail.com', NULL, 3, 10691000, 3, '2023-03-25 02:08:25', '2023-03-25 14:14:53'),
(31, NULL, 'Hung', 'Bac Tu Liem, Ha Noi', 123456987, 'duc4422@gmail.com', NULL, 1, 380000, 3, '2023-03-26 03:15:53', '2023-03-26 03:43:37'),
(37, 5, 'Nghĩa', 'Long Biên, Long Biên', 123564610, 'tuannghia.tang@gmail.com', NULL, 2, 3280000, 2, '2023-03-27 03:13:25', '2023-03-27 03:15:24'),
(38, 2, 'Nguyễn Đức Huy', 'Cổ Nhuế 2', 362274026, 'duc4422@gmail.com', NULL, 1, 1760000, 1, '2023-03-28 02:06:15', '2023-03-28 02:06:15'),
(39, 3, 'abc', 'abc', 123, 'duc4422@gmail.com', NULL, 3, 8552800, 1, '2023-03-29 02:03:44', '2023-03-29 02:03:44'),
(40, 3, 'abc', 'Việt Nam', 123456789, 'duc4422@gmail.com', NULL, 1, 1440000, 3, '2023-03-30 01:30:11', '2023-03-30 01:32:31'),
(41, NULL, 'Hung', 'Hà Nội', 123, 'admin@dev.test', NULL, 3, 7720000, 0, '2023-04-01 12:59:41', '2023-04-01 13:03:32');

-- --------------------------------------------------------

--
-- Table structure for table `order_details`
--

CREATE TABLE `order_details` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `order_id` bigint(20) UNSIGNED NOT NULL,
  `product_id` bigint(20) UNSIGNED NOT NULL,
  `quantity` int(11) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `order_details`
--

INSERT INTO `order_details` (`id`, `order_id`, `product_id`, `quantity`, `created_at`, `updated_at`) VALUES
(31, 26, 3, 2, '2023-03-25 02:08:26', '2023-03-25 02:08:26'),
(37, 31, 29, 1, '2023-03-26 03:15:54', '2023-03-26 03:15:54'),
(44, 37, 7, 1, '2023-03-27 03:13:25', '2023-03-27 03:13:25'),
(45, 37, 6, 1, '2023-03-27 03:13:25', '2023-03-27 03:13:25'),
(46, 38, 15, 1, '2023-03-28 02:06:16', '2023-03-28 02:06:16'),
(47, 39, 3, 2, '2023-03-29 02:03:45', '2023-03-29 02:03:45'),
(48, 39, 2, 1, '2023-03-29 02:03:45', '2023-03-29 02:03:45'),
(49, 40, 6, 1, '2023-03-30 01:30:12', '2023-03-30 01:30:12'),
(50, 41, 5, 1, '2023-04-01 12:59:42', '2023-04-01 12:59:42'),
(51, 41, 7, 2, '2023-04-01 12:59:42', '2023-04-01 12:59:42');

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `category_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `image` varchar(255) NOT NULL,
  `price` int(11) NOT NULL,
  `amount` int(11) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `bonus` varchar(255) DEFAULT NULL,
  `origin` varchar(255) DEFAULT NULL,
  `style` varchar(255) DEFAULT NULL,
  `material` varchar(255) DEFAULT NULL,
  `paint` varchar(255) DEFAULT NULL,
  `string_name` varchar(255) DEFAULT NULL,
  `sold` int(11) DEFAULT NULL,
  `status` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `brand` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `category_id`, `name`, `image`, `price`, `amount`, `description`, `bonus`, `origin`, `style`, `material`, `paint`, `string_name`, `sold`, `status`, `created_at`, `updated_at`, `brand`) VALUES
(1, 2, 'Mantic GT-1GCBK', 'https://tongkhonhaccu.com/Data/ResizeImage/data/upload/images/product/guitar/manticsaga/gt1-gcbk/dan_guitar_acoustic_gt1bkx500x500x4.jpg', 2500000, 19, NULL, 'Bao da 3 lớp, ty chỉnh cần, sách dạy Guitar cơ bản', 'Mỹ', 'D khuyết', 'Gỗ thông', 'Sơn bóng', 'Elixir', 36, 1, '2023-03-20 07:24:35', '2023-03-25 13:45:39', 'Mantic'),
(2, 2, 'Vọng Cổ VC-250', 'https://tongkhonhaccu.com/Data/ResizeImage/data/upload/images/product/guitar/guitar-vong-co/vc-250/dan_guitar_vong_co_vc_250_mat_truoc_saux500x500x4.jpg', 4491000, 7, NULL, 'Pick gảy, ty chỉnh cần', 'Việt Nam', 'D', 'Gỗ Mahogany', 'Sơn mờ', 'D\'Addario', 25, 1, '2023-03-20 07:27:18', '2023-03-25 14:14:54', 'Vọng Cổ'),
(3, 2, 'Poshman S30 Mini', 'https://tongkhonhaccu.com/Data/ResizeImage/data/upload/images/product/guitar/poshman/s30 mini full sapale/dan_guitar_acoustic_poshmanx500x500x4.jpg', 3100000, 44, NULL, 'Pick gảy, 1 bộ dây đàn, giáo trình dạy Guitar', 'Mỹ', 'C', 'Gỗ sồi', 'Sơn nhám', 'EZ901', 2, 1, '2023-03-20 07:29:31', '2023-03-25 14:14:54', 'Taylor'),
(4, 2, 'Rosen G11SC', 'https://tongkhonhaccu.com/Data/ResizeImage/data/upload/images/product/guitar/rosen/g11/g11sc/dan_guitar_acoustic_rosen_g11sc_xamx500x500x4.jpg', 3700000, 30, NULL, 'Khóa học đệm hát 30 ngày', 'Anh', 'D khuyết', 'Gỗ Sitka spurce', 'Sơn mờ', 'Rosen OEM', 9, 1, '2023-03-20 07:32:57', '2023-03-20 07:32:57', 'Rosen'),
(5, 2, 'Morrison MGW 405CBK', 'https://tongkhonhaccu.com/Data/ResizeImage/data/upload/images/product/guitar/morrison/405bkeqsolid/dan_guitar_acoustic_405cbkeq_solidtopx500x500x4.jpg', 5050000, 45, NULL, 'Bao da 7 lớp, ty chỉnh cần, giáo trình dạy Guitar cơ bản', 'Mỹ', 'A', 'Gỗ thông', 'Sơn nhám', 'Elixir', NULL, 1, '2023-03-20 07:34:46', '2023-03-20 07:34:46', 'Morrison'),
(6, 2, 'Ba Đờn T70', 'https://tongkhonhaccu.com/Data/ResizeImage/data/upload/images/product/guitar/badon/t70/dan_guitar_acoustic_badon_t70_1x500x500x4.jpg', 1800000, 59, NULL, 'Pick gảy, ty chỉnh cần', 'Việt Nam', 'D khuyết', 'Gỗ sồi', 'Sơn bóng', 'D\'Addario', 1, 1, '2023-03-20 07:36:28', '2023-03-30 01:32:32', 'Ba Đờn'),
(7, 2, 'Poshman N09AC', 'https://tongkhonhaccu.com/Data/ResizeImage/data/upload/images/product/guitar/poshman/n09ac/01x500x500x4.jpg', 2300000, 2, NULL, 'Bao da 3 lớp, ty chỉnh cần', 'United State', 'C', 'Gỗ thông', 'Sơn bóng', 'Elixir', 54, 1, '2023-03-20 07:38:26', '2023-03-25 12:54:51', 'Poshman'),
(8, 2, 'Rosen G11NA-A', 'https://tongkhonhaccu.com/Data/ResizeImage/data/upload/images/product/guitar/rosen/g13 cam/dan_guitar_acoustic_rosen_g13_camx500x500x4.jpg', 2500000, 35, NULL, 'EQ 405CBK, bao da 3 lớp', 'Anh', 'A', 'Gỗ phong', 'Sơn mờ', 'Elixir', 16, 1, '2023-03-20 07:41:15', '2023-03-20 07:41:15', 'Rosen'),
(9, 1, 'Yamaha C40', 'https://tongkhonhaccu.com/Data/ResizeImage/data/upload/images/product/guitar/yamaha/c40/dan_guitar_classic_c40x500x500x4.jpg', 2300000, 20, NULL, 'Bao da 3 lớp, ty chỉnh cần, sách dạy Guitar cơ bản', 'Hàn Quốc', 'D khuyết', 'Gỗ thông', 'Sơn bóng', 'Elixir', 36, 1, '2023-03-20 00:24:27', '2023-03-25 06:45:39', 'Yamaha'),
(10, 1, 'Yamaha CX40', 'https://tongkhonhaccu.com/Data/ResizeImage/data/upload/images/product/guitar/yamaha/cx40/dan_guitar_classic_yamaha_cx40x500x500x4.jpg', 3500000, 9, NULL, 'Pick gảy, ty chỉnh cần', 'Hàn Quốc', 'D', 'Gỗ Mahogany', 'Sơn mờ', 'D\'Addario', 24, 1, '2023-03-20 00:27:19', '2023-03-25 06:43:32', 'Yamaha'),
(11, 1, 'Ba Đờn C120', 'https://tongkhonhaccu.com/Data/ResizeImage/data/upload/images/product/guitar/badon/c120/dan_guitar_classic_ba_don_c120x500x500x4.jpg', 3100000, 48, NULL, 'Pick gảy, 1 bộ dây đàn, giáo trình dạy Guitar', 'Việt Nam', 'C', 'Gỗ sồi', 'Sơn nhám', 'EZ901', NULL, 1, '2023-03-20 00:29:32', '2023-03-25 06:43:32', 'Ba Đờn'),
(12, 1, 'Martinez Toledo MC18', 'https://tongkhonhaccu.com/Data/ResizeImage/data/upload/images/product/guitar/martinez/mc18/dan_guitar_toledo_mc18_01x500x500x4.jpg', 3000000, 30, NULL, 'Khóa học đệm hát 30 ngày', 'Anh', 'D khuyết', 'Gỗ Sitka spurce', 'Sơn mờ', 'Rosen OEM', 9, 1, '2023-03-20 00:38:57', '2023-03-20 00:32:57', 'Taylor'),
(13, 1, 'Ba Đờn C100J', 'https://tongkhonhaccu.com/Data/ResizeImage/data/upload/images/product/guitar/badon/c100/dan_guitar_classic_c100jx500x500x4.jpg', 5050000, 45, NULL, 'Bao da 7 lớp, ty chỉnh cần, giáo trình dạy Guitar cơ bản', 'Việt Nam', 'A', 'Gỗ thông', 'Sơn nhám', 'Elixir', NULL, 1, '2023-03-20 00:14:46', '2023-03-20 00:34:46', 'Ba Đờn'),
(14, 1, 'Yamaha C70', 'https://tongkhonhaccu.com/Data/ResizeImage/data/upload/images/product/guitar/yamaha/c70/dan_guitar_classic_c70_1_x500x500x4.jpg', 3190000, 60, NULL, 'Pick gảy, ty chỉnh cần', 'Hàn Quốc', 'D khuyết', 'Gỗ sồi', 'Sơn bóng', 'D\'Addario', NULL, 1, '2023-03-20 00:01:28', '2023-03-20 00:36:28', 'Yamaha'),
(15, 1, 'LuthierV C200', 'https://tongkhonhaccu.com/Data/ResizeImage/data/upload/images/product/guitar/luthier v/c200/dan_guitar_classic_luthierV_c200x500x500x4.jpg', 2200000, 2, NULL, 'Bao da 3 lớp, ty chỉnh cần', 'Việt Nam', 'C', 'Gỗ thông', 'Sơn bóng', 'Elixir', 54, 1, '2023-03-20 00:26:26', '2023-03-25 05:54:51', 'Việt Nam'),
(16, 1, 'Taylor Beveled T700', 'https://tongkhonhaccu.com/Data/ResizeImage/data/upload/images/product/guitar/badon/t700/dan_guitar_acosutic_badon_t700x500x500x4.jpg', 1800000, 35, NULL, 'EQ 405CBK, bao da 3 lớp', 'Anh', 'A', 'Gỗ phong', 'Sơn mờ', 'Elixir', 16, 1, '2023-03-20 00:21:15', '2023-03-20 00:41:15', 'Taylor'),
(17, 3, 'Ukulele Rosen K11BR', 'https://tongkhonhaccu.com/Data/ResizeImage/data/upload/images/product/ukulele/rosen/k11/dan_ukulele_rosen_k11_br_chinh_hang_gia_rex500x500x4.jpg', 1300000, 19, NULL, 'Bao da 3 lớp, ty chỉnh cần, sách dạy Guitar cơ bản', 'Mỹ', 'D khuyết', 'Gỗ thông', 'Sơn bóng', 'Elixir', 36, 1, '2023-03-20 00:24:35', '2023-03-25 06:45:39', 'Rosen'),
(18, 3, 'Ukulele Rosen K11NA', 'https://tongkhonhaccu.com/Data/ResizeImage/data/upload/images/product/ukulele/rosen/k11/dan_ukulele_rosen_k11_na_concert_chinh_hang_gia_rex500x500x4.jpg', 1100000, 9, NULL, 'Pick gảy, ty chỉnh cần', 'Mỹ', 'D', 'Gỗ Mahogany', 'Sơn mờ', 'D\'Addario', 24, 1, '2023-03-20 00:27:01', '2023-03-25 06:43:32', 'Rosen'),
(19, 3, 'Concert Notherly Gale', 'https://tongkhonhaccu.com/Data/ResizeImage/data/upload/images/product/guitar/ng/ukulele u10/ukulele_ng_u10_xanhx500x500x4.jpg', 3100000, 48, NULL, 'Pick gảy, 1 bộ dây đàn, giáo trình dạy Guitar', 'Mỹ', 'C', 'Gỗ sồi', 'Sơn nhám', 'EZ901', NULL, 1, '2023-03-20 00:29:33', '2023-03-25 06:43:32', 'Taylor'),
(20, 3, 'Ukulele AWADON', 'https://tongkhonhaccu.com/Data/ResizeImage/data/upload/images/product/ukulele/awadon/dan_ukulele_awadonx500x500x4.jpg', 3700000, 30, NULL, 'Khóa học đệm hát 30 ngày', 'Anh', 'D khuyết', 'Gỗ Sitka spurce', 'Sơn mờ', 'Rosen OEM', 9, 1, '2023-03-20 00:22:57', '2023-03-20 00:32:57', 'Awadon'),
(21, 6, 'EQ Fishman Presys 301', 'https://tongkhonhaccu.com/Data/ResizeImage/data/upload/images/product/eq guitar/fishman 301/eq_guitar_fishman_301_chinh_hangx500x500x4.jpg', 2100000, 19, NULL, NULL, 'Mỹ', NULL, NULL, NULL, NULL, 10, 1, '2023-03-20 00:24:42', '2023-03-30 09:18:54', 'Taylor'),
(22, 7, 'Hộp Đựng Đàn Guitar NG', 'https://tongkhonhaccu.com/Data/ResizeImage/data/upload/images/product/phukien/hop-dan-ng/hop_dung_guitar_hardcase_ng_1x500x500x4.jpg', 1800000, 9, NULL, NULL, 'Việt Nam', NULL, NULL, NULL, NULL, 24, 1, '2023-03-20 00:27:31', '2023-03-30 09:18:23', 'Việt Nam'),
(23, 7, 'Bao Đàn Guitar TYGY 6 lớp', 'https://tongkhonhaccu.com/Data/ResizeImage/data/upload/images/product/phukien/bao_dan_guitar_vai_du_6_lopx500x500x4.jpg', 350000, 48, NULL, NULL, 'Mỹ', NULL, NULL, NULL, NULL, 0, 1, '2023-03-20 00:29:34', '2023-03-30 09:16:58', 'TYGY'),
(24, 9, 'Capo B601', 'https://tongkhonhaccu.com/Data/ResizeImage/data/upload/images/product/phukien/Capo_guitar_B701_01_den_850x850_tongkhonhaccu_comx500x500x4.jpg', 2100000, 30, NULL, NULL, 'Anh', NULL, NULL, NULL, NULL, 9, 1, '2023-03-20 00:32:22', '2023-03-30 09:16:24', 'Rosen'),
(25, 10, 'Ampli Marshall MG15CF', 'https://tongkhonhaccu.com/Data/ResizeImage/data/upload/images/product/amply/ampli_marshall_mg15CF_2x500x500x4.jpg', 2100000, 19, NULL, NULL, 'Mỹ', NULL, NULL, NULL, NULL, 10, 1, '2023-03-20 00:24:36', '2023-03-30 09:19:10', 'Marshall'),
(26, 8, 'Dây Đeo Đàn Guitar Driver', 'https://tongkhonhaccu.com/Data/ResizeImage/data/upload/images/product/guitar/poshman/n11ac/day_deo_dan_driver_1x500x500x4.jpg', 1800000, 9, NULL, NULL, 'Việt Nam', NULL, NULL, NULL, NULL, 24, 1, '2023-03-20 00:27:32', '2023-03-30 09:18:39', 'Việt Nam'),
(27, 10, 'Dây line Max', 'https://tongkhonhaccu.com/Data/ResizeImage/data/upload/images/product/phukien/line_maxx500x500x4.jpg', 350000, 48, NULL, NULL, 'Mỹ', NULL, NULL, NULL, NULL, 0, 1, '2023-03-20 00:29:35', '2023-03-30 09:17:26', 'TYGY'),
(28, 7, 'Bao Đàn Organ Yamaha', 'https://tongkhonhaccu.com/Data/ResizeImage/data/upload/images/product/phukien/Bao_dan_Organ_Yamaha_1_lop_01x500x500x4.jpg', 210000, 30, NULL, NULL, 'Anh', NULL, NULL, NULL, NULL, 9, 1, '2023-03-20 00:58:57', '2023-03-30 09:16:43', 'Rosen'),
(29, 8, 'Dây đàn Elixir', 'https://tongkhonhaccu.com/Data/ResizeImage/data/upload/images/product/guitar/everest/e60lmt/download__1_x500x500x4.jpg', 380000, 125, 'Dây đàn cho đàn Guitar Aucostic', NULL, 'Mỹ', NULL, NULL, NULL, NULL, 1, 1, '2023-03-26 02:56:27', '2023-03-30 14:29:10', 'Elixir'),
(30, 1, 'Yamaha CG122MC', 'https://tongkhonhaccu.com/Data/ResizeImage/data/upload/images/product/guitar/yamaha/cg122/dan_guitar_classic_cg122mcx500x500x4.jpg', 3000000, 19, NULL, 'Bao da 3 lớp, ty chỉnh cần, sách dạy Guitar cơ bản', 'Hàn', 'D khuyết', 'Gỗ thông', 'Sơn bóng', 'Elixir', 36, 1, '2023-03-20 00:24:39', '2023-03-25 06:45:39', 'Yamaha'),
(31, 1, 'Cordoba C1', 'https://tongkhonhaccu.com/Data/ResizeImage/data/upload/images/product/guitar/cordoba/c1m/Dan_Guitar_Classic_Cordoba_C1_2x500x500x4.jpg', 4250000, 7, NULL, 'Pick gảy, ty chỉnh cần', 'Tây Ban Nha', 'D', 'Gỗ Mahogany', 'Sơn mờ', 'D\'Addario', 25, 1, '2023-03-20 00:27:20', '2023-03-25 07:14:54', 'Cordoba'),
(32, 1, 'Poshman S30 Mini', 'https://tongkhonhaccu.com/Data/ResizeImage/data/upload/images/product/guitar/poshman/s30 mini full sapale/dan_guitar_acoustic_poshmanx500x500x4.jpg', 3100000, 44, NULL, 'Pick gảy, 1 bộ dây đàn, giáo trình dạy Guitar', 'Mỹ', 'C', 'Gỗ sồi', 'Sơn nhám', 'EZ901', 2, 1, '2023-03-20 00:29:31', '2023-03-25 07:14:54', 'Taylor'),
(33, 1, 'Yamaha C80', 'https://tongkhonhaccu.com/Data/ResizeImage/data/upload/images/product/guitar/yamaha/c80/dan_guitar_classic_yamaha_c80_son_bongx500x500x4.jpg', 4400000, 30, NULL, 'Khóa học đệm hát 30 ngày', 'Hàn', 'D khuyết', 'Gỗ Sitka spurce', 'Sơn mờ', 'Rosen OEM', 9, 1, '2023-03-20 00:32:57', '2023-03-20 00:32:57', 'Yamaha'),
(34, 2, 'LuthierV LV220', 'https://tongkhonhaccu.com/Data/ResizeImage/data/upload/images/product/guitar/luthier v/lv220/dan_guitar_acosutic_lv220x500x500x4.jpg', 2200000, 45, NULL, 'Bao da 7 lớp, ty chỉnh cần, giáo trình dạy Guitar cơ bản', 'Mỹ', 'A', 'Gỗ thông', 'Sơn nhám', 'Elixir', NULL, 1, '2023-03-20 00:34:46', '2023-03-20 00:34:46', 'Taylor'),
(35, 2, 'Cordoba C5', 'https://tongkhonhaccu.com/Data/ResizeImage/data/upload/images/product/guitar/cordoba/c5/dan_classic_cordoba_c5_01x500x500x4.jpg', 5990000, 60, NULL, 'Pick gảy, ty chỉnh cần', 'Tây Ban Nha', 'D khuyết', 'Gỗ sồi', 'Sơn bóng', 'D\'Addario', NULL, 1, '2023-03-20 00:36:28', '2023-03-20 00:36:28', 'Cordoba'),
(36, 2, 'Yamaha APX600', 'https://tongkhonhaccu.com/Data/ResizeImage/data/upload/images/product/guitar/yamaha/apx600/dan_guitar_acoustic_yamaha_apx600x500x500x4.jpg', 7700000, 2, NULL, 'Bao da 3 lớp, ty chỉnh cần', 'Hàn', 'C', 'Gỗ thông', 'Sơn bóng', 'Elixir', 54, 1, '2023-03-20 00:38:26', '2023-03-25 05:54:51', 'Yamaha'),
(37, 2, 'Fender Dreadnought', 'https://tongkhonhaccu.com/Data/ResizeImage/data/upload/images/product/guitar/fender/dan_guitar_acoustic_fender_dreadnought_cd_60s_black_01x500x500x4.jpg', 5090000, 35, NULL, 'EQ 405CBK, bao da 3 lớp', 'Anh', 'A', 'Gỗ phong', 'Sơn mờ', 'Elixir', 16, 1, '2023-03-20 00:41:15', '2023-03-20 00:41:15', 'Fender'),
(38, 3, 'Concert Notherly Gale X11', 'https://tongkhonhaccu.com/Data/ResizeImage/data/upload/images/product/guitar/ng/ukulele u10/ukulele_ng_x11_redx500x500x4.jpg', 1275000, 20, NULL, 'Bao da 3 lớp, ty chỉnh cần, sách dạy Guitar cơ bản', 'Mỹ', 'D khuyết', 'Gỗ thông', 'Sơn bóng', 'Elixir', 36, 1, '2023-03-19 17:24:35', '2023-03-24 23:45:39', 'Taylor'),
(39, 3, 'Ukulele Soprano', 'https://tongkhonhaccu.com/Data/ResizeImage/data/upload/images/product/ukulele/soprano/dan_ukulele_nhieu_mau_sacx500x500x4.jpg', 400000, 9, 'Đàn ukulele Soprano với nhiều màu sắc', 'Pick gảy, ty chỉnh cần', 'Anh', 'D', 'Gỗ Mahogany', 'Sơn mờ', 'D\'Addario', 24, 1, '2023-03-19 17:27:18', '2023-03-24 23:43:32', 'Soprano'),
(40, 6, 'EQ NG D401', 'https://tongkhonhaccu.com/Data/ResizeImage/data/upload/images/product/eq guitar/ng d401/eq_guitar_ng_d401_chinh_hangx500x500x4.jpg', 450000, 48, NULL, NULL, 'Việt Nam', NULL, NULL, NULL, NULL, NULL, 1, '2023-03-19 17:29:31', '2023-03-24 23:43:32', 'Tygy'),
(41, 6, 'EQ Prefix Pro Blend', 'https://tongkhonhaccu.com/Data/ResizeImage/data/upload/images/product/eq guitar/fishman prefix pro blend/eq_guitar_fishman_prefix_pro_blend_chinh_hangx500x500x4.jpg', 1990000, 30, NULL, NULL, 'Anh', NULL, NULL, NULL, NULL, 9, 1, '2023-03-19 17:32:57', '2023-03-19 17:32:57', 'Taylor'),
(42, 6, 'EQ Fishman Prefix Plus-T', 'https://tongkhonhaccu.com/Data/ResizeImage/data/upload/images/product/eq guitar/fishman prefix plus t/eq_guitar_fishman_prefix_plus_t_chinh_hangx500x500x4.jpg', 2000000, 45, NULL, NULL, 'Việt Nam', NULL, NULL, NULL, NULL, NULL, 1, '2023-03-19 17:34:46', '2023-03-19 17:34:46', 'Fishman'),
(43, 6, 'EQ Fishman 201', 'https://tongkhonhaccu.com/Data/ResizeImage/data/upload/images/product/eq guitar/fishman 201/eq_guitar_fishman_201_chinh_hangx500x500x4.jpg', 3700000, 60, NULL, NULL, 'Hàn Quốc', NULL, NULL, NULL, NULL, NULL, 1, '2023-03-19 17:36:28', '2023-03-19 17:36:28', 'Yamaha'),
(44, 6, 'EQ 7545R', 'https://tongkhonhaccu.com/Data/ResizeImage/data/upload/images/product/eq guitar/7545/eq_guitar_7545x500x500x4.jpg', 350000, 2, NULL, NULL, 'Việt Nam', NULL, NULL, NULL, NULL, 54, 1, '2023-03-19 17:38:26', '2023-03-24 22:54:51', 'Việt Nam'),
(45, 7, 'Bao Đàn Ukulele 3 Lớp', 'https://tongkhonhaccu.com/Data/ResizeImage/data/upload/images/product/phukien/bao_dan_ukulele_bao_da_dayx500x500x4.png', 100000, 35, 'Bao đàn Ukulele 3 lớp làm bằng da', NULL, 'Anh', NULL, NULL, NULL, NULL, 16, 1, '2023-03-19 17:41:15', '2023-03-19 17:41:15', 'Taylor'),
(46, 7, 'Bao Đàn Organ 3 Lớp', 'https://tongkhonhaccu.com/Data/ResizeImage/data/upload/images/product/phukien/Bao_Da_Dan_Organ_01_wmx500x500x4.jpg', 1300000, 19, 'Bao Đàn Organ 3 Lớp làm bằng da', NULL, 'Mỹ', NULL, NULL, NULL, NULL, 36, 1, '2023-03-19 17:24:35', '2023-03-24 23:45:39', 'Rosen'),
(47, 7, 'Hộp Đựng Đàn Guitar Ayers', 'https://tongkhonhaccu.com/Data/ResizeImage/data/upload/images/product/phukien/hop-dung-dan-ayers/hop_cung_dung_dan_ayers_1_01x500x500x4.jpg', 4000000, 9, NULL, NULL, 'Mỹ', NULL, NULL, NULL, NULL, 24, 1, '2023-03-19 17:27:18', '2023-03-24 23:43:32', 'Rosen'),
(48, 8, 'Alice AW435C', 'https://tongkhonhaccu.com/Data/ResizeImage/data/upload/images/product/phukien/Day_dan_guitar_acoustic_Alice_AW435C__Bo_6_day__01x500x500x4.jpg', 115000, 48, NULL, NULL, 'Mỹ', NULL, NULL, NULL, NULL, NULL, 1, '2023-03-19 17:29:31', '2023-03-24 23:43:32', 'Alice'),
(49, 8, 'Alice AC130', 'https://tongkhonhaccu.com/Data/ResizeImage/data/upload/images/product/phukien/Day_Dan_Guitar_Classic_Alice_AC130_01_wmx500x500x4.jpg', 100000, 30, 'Dây đàn classic', NULL, 'Anh', NULL, NULL, NULL, NULL, 9, 1, '2023-03-19 17:32:57', '2023-03-19 17:32:57', 'Alice'),
(50, 8, 'DAddario EJ45', 'https://tongkhonhaccu.com/Data/ResizeImage/data/upload/images/product/phukien/Day_dan_guitar_Classic_D_Addario_EJ45x500x500x4.jpg', 240000, 19, 'Dây đàn classic', NULL, 'Mỹ', NULL, NULL, NULL, NULL, 10, 1, '2023-03-19 17:24:35', '2023-03-24 23:45:39', 'DAdario'),
(51, 8, 'Alice A107', 'https://tongkhonhaccu.com/Data/ResizeImage/data/upload/images/product/phukien/Day_Dan_Guitar_Classic_Alice_A107_Nhieu_Mau_01x500x500x4.jpg', 180000, 9, 'Dây đàn classic Alice nhiều màu', NULL, 'Anh', NULL, NULL, NULL, NULL, 24, 1, '2023-03-19 17:27:18', '2023-03-24 23:43:32', 'Alice'),
(52, 8, 'DAddario EJ13', 'https://tongkhonhaccu.com/Data/ResizeImage/data/upload/images/product/phukien/dây đàn guitar/daddario/bo_day_dan_guitar_acoustic_daddario_ej13_1x500x500x4.jpg', 160000, 48, NULL, NULL, 'Mỹ', NULL, NULL, NULL, NULL, 0, 1, '2023-03-19 17:29:31', '2023-03-24 23:43:32', 'DAdario'),
(53, 8, 'Elixir Nanoweb Phosphor', 'https://tongkhonhaccu.com/Data/ResizeImage/data/upload/images/product/phukien/acoustic_phos_bronze_16052_Frontx500x500x4.jpg', 380000, 30, NULL, NULL, 'Anh', NULL, NULL, NULL, NULL, 9, 1, '2023-03-19 17:32:57', '2023-03-19 17:32:57', 'Elixir'),
(54, 9, 'Capo Guitar Cá Mập GC30', 'https://tongkhonhaccu.com/Data/ResizeImage/data/upload/images/product/phukien/Capo_Guitar_Ca_Map_GC30_01_wmx500x500x4.jpg', 290000, 19, NULL, NULL, 'Mỹ', NULL, NULL, NULL, NULL, 10, 1, '2023-03-19 17:24:35', '2023-03-24 23:45:39', 'Marshall'),
(55, 9, 'Capo guitar Deviser PBA05', 'https://tongkhonhaccu.com/Data/ResizeImage/data/upload/images/product/phukien/Capo_guitar_Deviser_PBA05_01x500x500x4.jpg', 80000, 9, NULL, NULL, 'Việt Nam', NULL, NULL, NULL, NULL, 24, 1, '2023-03-19 17:27:18', '2023-03-24 23:43:32', 'Việt Nam'),
(56, 10, 'Amply Stagg 20W - EU', 'https://tongkhonhaccu.com/Data/ResizeImage/data/upload/images/product/amply/stagg/stagg 20w/ACOUSTIC_GT_AMPLI_REVERB_20W_eu_3x500x500x4.jpg', 2500000, 48, NULL, NULL, 'Mỹ', NULL, NULL, NULL, NULL, 0, 1, '2023-03-19 17:29:31', '2023-03-24 23:43:32', 'Taylor');

-- --------------------------------------------------------

--
-- Table structure for table `ratings`
--

CREATE TABLE `ratings` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `product_id` bigint(20) UNSIGNED NOT NULL,
  `score` tinyint(4) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `ratings`
--

INSERT INTO `ratings` (`id`, `user_id`, `product_id`, `score`, `created_at`, `updated_at`) VALUES
(1, 2, 16, 4, '2023-03-28 02:53:11', '2023-03-28 02:53:11'),
(2, 4, 16, 5, '2023-03-28 02:55:46', '2023-03-28 02:55:46'),
(3, 2, 15, 5, '2023-03-28 03:14:31', '2023-03-28 03:14:31'),
(4, 2, 3, 4, '2023-03-28 04:26:19', '2023-03-28 04:26:19'),
(5, 1, 16, 5, '2023-04-02 02:00:25', '2023-04-02 02:00:25');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `full_name` varchar(255) NOT NULL,
  `phone` int(11) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `address` varchar(255) DEFAULT NULL,
  `role` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `birth` varchar(255) DEFAULT NULL,
  `gender` tinyint(4) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `full_name`, `phone`, `email`, `address`, `role`, `created_at`, `updated_at`, `birth`, `gender`) VALUES
(1, 'admin', '123456', 'Admin', NULL, 'duc4422@gmail.com', NULL, 1, '2023-03-24 08:47:48', '2023-03-24 08:47:48', NULL, 0),
(2, 'huynd', '123456', 'Nguyễn Đức Huy', 362274026, 'inuyasha160201@gmail.com', 'Cổ Nhuế 2', 0, '2023-03-24 13:12:41', '2023-03-29 10:20:07', '2001-02-15T10:08:54.005Z', 0),
(3, 'test', '123456', 'abc', NULL, 'abc@gmail.com', NULL, 0, '2023-03-24 13:21:32', '2023-03-24 13:21:32', NULL, 0),
(4, 'phihung', '123456', 'Phi Hùng', NULL, 'phihung@gmail.com', NULL, 0, '2023-03-24 13:33:29', '2023-03-24 13:33:29', NULL, 0),
(5, 'nghia1303', '123456', 'Nghĩa', NULL, 'tuannghia.tang@gmail.com', NULL, 0, '2023-03-27 03:11:49', '2023-04-02 02:17:24', NULL, 0),
(6, 'huyen123', '123456', 'Huyền', 654322189, 'huyen123@gmail.com', 'Hà Đông', 0, '2023-03-29 12:48:02', '2023-03-29 12:48:46', '2023-03-29T12:48:18.635Z', 1),
(7, 'nhungpham', '123456', 'Nhung', NULL, 'nhungpham@gmail.com', NULL, 0, '2023-03-29 14:03:21', '2023-03-29 14:03:21', '2001-05-01T14:00:54.204Z', 1),
(8, 'aaaa123', '123456', 'aaaaa', NULL, 'aaaa@gmail.com', NULL, 0, '2023-03-30 14:36:31', '2023-03-30 14:36:31', '2023-03-07T14:36:12.127Z', 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `discounts`
--
ALTER TABLE `discounts`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `discount_code_unique` (`code`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `order_details`
--
ALTER TABLE `order_details`
  ADD PRIMARY KEY (`id`),
  ADD KEY `order_details_order_id_foreign` (`order_id`),
  ADD KEY `order_details_product_id_foreign` (`product_id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `products_category_id_foreign` (`category_id`);

--
-- Indexes for table `ratings`
--
ALTER TABLE `ratings`
  ADD PRIMARY KEY (`id`),
  ADD KEY `ratings_user_id_foreign` (`user_id`),
  ADD KEY `ratings_product_id_foreign` (`product_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_username_unique` (`username`),
  ADD UNIQUE KEY `users_email_unique` (`email`),
  ADD UNIQUE KEY `users_phone_unique` (`phone`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `discounts`
--
ALTER TABLE `discounts`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=42;

--
-- AUTO_INCREMENT for table `order_details`
--
ALTER TABLE `order_details`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=52;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=57;

--
-- AUTO_INCREMENT for table `ratings`
--
ALTER TABLE `ratings`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `order_details`
--
ALTER TABLE `order_details`
  ADD CONSTRAINT `order_details_order_id_foreign` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`),
  ADD CONSTRAINT `order_details_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`);

--
-- Constraints for table `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_category_id_foreign` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`);

--
-- Constraints for table `ratings`
--
ALTER TABLE `ratings`
  ADD CONSTRAINT `ratings_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`),
  ADD CONSTRAINT `ratings_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
