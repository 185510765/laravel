/*
 Navicat MySQL Data Transfer

 Source Server         : localhost xampp
 Source Server Type    : MySQL
 Source Server Version : 100425
 Source Host           : localhost:3306
 Source Schema         : mini_game

 Target Server Type    : MySQL
 Target Server Version : 100425
 File Encoding         : 65001

 Date: 16/11/2022 18:01:58
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for equipment
-- ----------------------------
DROP TABLE IF EXISTS `equipment`;
CREATE TABLE `equipment`  (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '装备名称',
  `describe` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '装备描述',
  `equipment_type_id` tinyint(3) UNSIGNED NOT NULL COMMENT '装备类型id  equipment_type 主键id',
  `is_suit` tinyint(3) UNSIGNED NOT NULL COMMENT '是否套装 0:否 1:是',
  `equipment_suit_ids` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '套装id 就是此表主键 用,号隔开',
  `image` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '图片',
  `level` tinyint(3) UNSIGNED NOT NULL COMMENT '等级',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `equipment_type_id`(`equipment_type_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 7 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '装备表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of equipment
-- ----------------------------
INSERT INTO `equipment` VALUES (1, '木棍', '', 1, 0, '0', '', 1);
INSERT INTO `equipment` VALUES (2, '头盔', '', 1, 0, '0', '', 1);
INSERT INTO `equipment` VALUES (3, '坚硬的木棍', '', 2, 0, '0', '', 1);
INSERT INTO `equipment` VALUES (4, '坚硬的头盔', '', 2, 0, '0', '', 1);
INSERT INTO `equipment` VALUES (5, '哥布林木棍', '', 3, 0, '5,6', '', 1);
INSERT INTO `equipment` VALUES (6, '哥布林头盔', '', 3, 0, '5,6', '', 1);

-- ----------------------------
-- Table structure for equipment_type
-- ----------------------------
DROP TABLE IF EXISTS `equipment_type`;
CREATE TABLE `equipment_type`  (
  `id` tinyint(3) UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` char(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '类型名称',
  `color` char(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '颜色',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 10 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '装备类型表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of equipment_type
-- ----------------------------
INSERT INTO `equipment_type` VALUES (1, '普通', 'white');
INSERT INTO `equipment_type` VALUES (2, '高级', 'green');
INSERT INTO `equipment_type` VALUES (3, '套装', 'blue');
INSERT INTO `equipment_type` VALUES (4, '稀有', 'purple');
INSERT INTO `equipment_type` VALUES (5, '传承', '');
INSERT INTO `equipment_type` VALUES (6, '神器', 'pink');
INSERT INTO `equipment_type` VALUES (7, '勇者', 'brown');
INSERT INTO `equipment_type` VALUES (8, '传说', 'yellow');
INSERT INTO `equipment_type` VALUES (9, '史诗', '');

-- ----------------------------
-- Table structure for failed_jobs
-- ----------------------------
DROP TABLE IF EXISTS `failed_jobs`;
CREATE TABLE `failed_jobs`  (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `uuid` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `connection` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp(0) NOT NULL DEFAULT current_timestamp(0),
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `failed_jobs_uuid_unique`(`uuid`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of failed_jobs
-- ----------------------------

-- ----------------------------
-- Table structure for migrations
-- ----------------------------
DROP TABLE IF EXISTS `migrations`;
CREATE TABLE `migrations`  (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `migration` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int(11) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 5 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of migrations
-- ----------------------------
INSERT INTO `migrations` VALUES (1, '2014_10_12_000000_create_users_table', 1);
INSERT INTO `migrations` VALUES (2, '2014_10_12_100000_create_password_resets_table', 1);
INSERT INTO `migrations` VALUES (3, '2019_08_19_000000_create_failed_jobs_table', 1);
INSERT INTO `migrations` VALUES (4, '2019_12_14_000001_create_personal_access_tokens_table', 1);

-- ----------------------------
-- Table structure for password_resets
-- ----------------------------
DROP TABLE IF EXISTS `password_resets`;
CREATE TABLE `password_resets`  (
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp(0) NULL DEFAULT NULL,
  INDEX `password_resets_email_index`(`email`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of password_resets
-- ----------------------------

-- ----------------------------
-- Table structure for personal_access_tokens
-- ----------------------------
DROP TABLE IF EXISTS `personal_access_tokens`;
CREATE TABLE `personal_access_tokens`  (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `tokenable_type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `tokenable_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `abilities` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL,
  `last_used_at` timestamp(0) NULL DEFAULT NULL,
  `created_at` timestamp(0) NULL DEFAULT NULL,
  `updated_at` timestamp(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `personal_access_tokens_token_unique`(`token`) USING BTREE,
  INDEX `personal_access_tokens_tokenable_type_tokenable_id_index`(`tokenable_type`, `tokenable_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 13 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of personal_access_tokens
-- ----------------------------
INSERT INTO `personal_access_tokens` VALUES (2, 'App\\Models\\game\\User', 1, '123456', '15d7a902298c8e605b3e91785853aa0fa7b5caa0b0c175596fc8602d95104329', '[\"*\"]', NULL, '2022-11-15 11:17:15', '2022-11-15 11:17:15');
INSERT INTO `personal_access_tokens` VALUES (3, 'App\\Models\\game\\User', 1, '123456', '7f2998d34368d8b36a0b36a713c3a9ca6429c28ac97addea856d9896adb0992c', '[\"*\"]', '2022-11-16 09:53:14', '2022-11-15 11:17:20', '2022-11-16 09:53:14');
INSERT INTO `personal_access_tokens` VALUES (4, 'App\\Models\\game\\User', 1, '123456', '544d0b9fffea8658d731406e3742a98bfb28ca7992c714917c91eac612adba80', '[\"*\"]', NULL, '2022-11-15 11:18:10', '2022-11-15 11:18:10');
INSERT INTO `personal_access_tokens` VALUES (5, 'App\\Models\\game\\User', 1, '123456', '62df70eaaa3dd32e7d8cbf2b581e4034b8b66e919b85a049d60056c2aa592660', '[\"123456\"]', NULL, '2022-11-15 17:00:51', '2022-11-15 17:00:51');
INSERT INTO `personal_access_tokens` VALUES (6, 'App\\Models\\game\\User', 1, '123456', 'f5471974f986a776ea7a2257d5748cfd33a5f7eaf0f110aaaddfaf792e3b839c', '[\"*\"]', NULL, '2022-11-15 17:01:53', '2022-11-15 17:01:53');
INSERT INTO `personal_access_tokens` VALUES (7, 'App\\Models\\game\\User', 1, '123456', '4e96c667ba2910edc42044bdb6b44508eecaf1fec60ba4e7a64b093e9068792d', '[\"*\"]', NULL, '2022-11-15 17:01:54', '2022-11-15 17:01:54');
INSERT INTO `personal_access_tokens` VALUES (8, 'App\\Models\\game\\User', 1, '123456', 'e6d89d3d41fc9735092f37d901afbd23af8a40e2ded57b617f35471360a5314e', '[\"*\"]', NULL, '2022-11-15 17:03:15', '2022-11-15 17:03:15');
INSERT INTO `personal_access_tokens` VALUES (9, 'App\\Models\\game\\User', 1, '123456', '98bcf231d3abc9cc1fb78a37d5689b772432a1fb24f26111ec5495bea448482b', '[\"*\"]', NULL, '2022-11-15 17:03:20', '2022-11-15 17:03:20');
INSERT INTO `personal_access_tokens` VALUES (10, 'App\\Models\\game\\User', 1, '123456', '4e64edf336d7080feedfd185ad11bcec5e0accc71d6bffe504d047771738c61a', '[\"*\"]', NULL, '2022-11-15 17:03:31', '2022-11-15 17:03:31');
INSERT INTO `personal_access_tokens` VALUES (11, 'App\\Models\\game\\User', 1, '123456', '8e479cf66d74fa9dd27e7227647e25249358c5a08346992a65eaf690e158983c', '[\"*\"]', '2022-11-16 10:59:04', '2022-11-16 09:20:40', '2022-11-16 10:59:04');
INSERT INTO `personal_access_tokens` VALUES (12, 'App\\Models\\game\\User', 2, '185510765', '271a7d988877d6d034997c8120c1001959ad749cef3c015168fa6fa6362897d0', '[\"*\"]', '2022-11-16 11:00:42', '2022-11-16 10:59:37', '2022-11-16 11:00:42');

-- ----------------------------
-- Table structure for role_equipment
-- ----------------------------
DROP TABLE IF EXISTS `role_equipment`;
CREATE TABLE `role_equipment`  (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `user_rore_id` bigint(20) UNSIGNED NOT NULL COMMENT '角色id user_role 表主键id',
  `equipment_id` bigint(20) UNSIGNED NOT NULL COMMENT '装备id equipment 表主键id',
  `is_open` tinyint(3) UNSIGNED NOT NULL COMMENT '是否解封 0:否未解封 1:已解封',
  `strengthening_level` tinyint(3) UNSIGNED NOT NULL COMMENT '强化等级',
  `forging_level` tinyint(3) UNSIGNED NOT NULL COMMENT '锻造等级',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `user_rore_id`(`user_rore_id`) USING BTREE,
  INDEX `equipment_id`(`equipment_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '用户装备表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of role_equipment
-- ----------------------------

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user`  (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `username` char(40) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `password` char(40) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `open_id` char(60) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `union_id` char(60) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `created_at` datetime(0) NULL DEFAULT NULL,
  `updated_at` datetime(0) NULL DEFAULT NULL,
  `deleted_at` datetime(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '用户表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES (1, '123456', '123456', '', '', '2022-11-09 16:00:54', NULL, NULL);
INSERT INTO `user` VALUES (2, '185510765', '123456', '', '', '2022-11-09 16:01:05', NULL, NULL);

-- ----------------------------
-- Table structure for user_role
-- ----------------------------
DROP TABLE IF EXISTS `user_role`;
CREATE TABLE `user_role`  (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '疲劳值',
  `user_id` bigint(20) UNSIGNED NOT NULL COMMENT '用户id user表主键',
  `name` char(40) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '角色名',
  `tired_value` tinyint(3) UNSIGNED NOT NULL DEFAULT 160 COMMENT '疲劳值 默认160',
  `created_at` datetime(0) NULL DEFAULT NULL,
  `updated_at` datetime(0) NULL DEFAULT NULL,
  `deleted_at` datetime(0) NULL DEFAULT NULL,
  `experience` bigint(20) UNSIGNED NOT NULL COMMENT '经验',
  `hp` bigint(20) UNSIGNED NOT NULL COMMENT '生命',
  `mp` bigint(20) UNSIGNED NOT NULL COMMENT '魔力',
  `power` int(10) UNSIGNED NOT NULL COMMENT '力量',
  `intelligence` int(10) UNSIGNED NOT NULL COMMENT '智力',
  `strength` int(10) UNSIGNED NOT NULL COMMENT '体力',
  `spirit` int(10) UNSIGNED NOT NULL COMMENT '精神',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `user_id`(`user_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '用户角色表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user_role
-- ----------------------------
INSERT INTO `user_role` VALUES (1, 1, '测试1号', 160, '2022-11-09 16:42:13', '2022-11-16 14:30:00', NULL, 0, 0, 0, 0, 0, 0, 0);
INSERT INTO `user_role` VALUES (2, 1, '测试2号', 160, '2022-11-09 16:42:16', '2022-11-16 14:30:00', NULL, 0, 0, 0, 0, 0, 0, 0);
INSERT INTO `user_role` VALUES (3, 1, '测试3号', 160, '2022-11-09 16:42:20', '2022-11-16 14:30:00', NULL, 0, 0, 0, 0, 0, 0, 0);

-- ----------------------------
-- Table structure for users_bak
-- ----------------------------
DROP TABLE IF EXISTS `users_bak`;
CREATE TABLE `users_bak`  (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `email_verified_at` timestamp(0) NULL DEFAULT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `remember_token` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `created_at` timestamp(0) NULL DEFAULT NULL,
  `updated_at` timestamp(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `users_email_unique`(`email`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of users_bak
-- ----------------------------

SET FOREIGN_KEY_CHECKS = 1;
