SET NAMES UTF8;
DROP DATABASE IF EXISTS xiaofeiniu;
CREATE DATABASE xiaofeiniu CHARSET=UTF8;
USE xiaofeiniu;
#管理员信息
CREATE TABLE xfn_admin(
  aid     INT PRIMARY KEY AUTO_INCREMENT,
  aname   VARCHAR(32) UNIQUE,#管理员名称
  apwd    VARCHAR(64)#管理员密码
);
#PASSWORD加密
INSERT INTO xfn_admin VALUES
(null,"admin",PASSWORD("123456")),
(null,"boss",PASSWORD("999999"));
