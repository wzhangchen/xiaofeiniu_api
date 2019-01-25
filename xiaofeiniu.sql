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
INSERT INTO xfn_admin VALUES
(null,"admin",PASSWORD("123456")),
(null,"boss",PASSWORD("999999"));


CREATE TABLE xfn_settings(
  sid INT PRIMARY KEY AUTO_INCREMENT,
  appName  VARCHAR(32),#店家名称
  apiUrl  VARCHAR(64),#数据API子系统地址
  adminUrl  VARCHAR(64),#管理后台子系统地址
  appUrl  VARCHAR(64),#顾客APP子系统地址
  icp VARCHAR(64),#系统备案号
  copyright  VARCHAR(128)#版权声明
);
INSERT INTO xfn_settings VALUES
(null,"小肥牛","http://127.0.0.1:8090","http://127.0.0.1:8091","http://127.0.0.1:8092","京ICP备12003709号-3","Copyright © 2002-2019 北京达内金桥科技有限公司版权所有");


#桌台信息
CREATE TABLE xfn_table(
  tid INT PRIMARY KEY AUTO_INCREMENT,
  tname  VARCHAR(64),#桌台昵称
  type  VARCHAR(16),#桌台类型3人桌
  status  INT #当前状态
);
INSERT INTO xfn_table VALUES
(null,"富贵厅","10人桌",0);

#桌台预定信息
CREATE TABLE xfn_reservation(
  rid INT PRIMARY KEY AUTO_INCREMENT,
  contactName  VARCHAR(64),#联系人姓名
  phone  VARCHAR(16),#联系电话
  contactTime   BIGINT,#联系时间
  dinnerTime  BIGINT#预约用餐时间
);
INSERT INTO xfn_reservation VALUES
(null,"zhangsan","15933333333",);

#菜品分类
CREATE TABLE xfn_category(
  cid INT PRIMARY KEY AUTO_INCREMENT,
  cname VARCHAR(32)#类别名称
);
INSERT INTO xfn_category VALUES
(null,"肉类");

#菜品信息
CREATE TABLE xfn_dish(
  did INT PRIMARY KEY AUTO_INCREMENT,
  title  VARCHAR(32),#菜品名称
  imgUrl  VARCHAR(128),#图片地址
  price   DECIMAL(6,2),#价格
  detail VARCHAR(128),#详细描述信息
  categoryId  INT,#所属类别编号
  FOREIGN KEY(categoryId) REFERENCES xfn_category (cid)
);
INSERT INTO xfn_dish VALUES
();

CREATE TABLE xfn_order(
  oid INT PRIMARY KEY AUTO_INCREMENT,
  startTime  BIGINT,#开始时间
  endTime  BIGINT,#结束时间
  customerCount   INT,#用餐人数
  tableld INT#桌台编号外键
);
INSERT INTO xfn_order VALUES
();

CREATE TABLE xfn_order_detail(
  did INT PRIMARY KEY AUTO_INCREMENT,
  dishId INT,#菜品编号外键did
  dishCount INT,#菜品数量
  customerName  VARCHAR(64),#点餐用户名
  orderId   INT,#订单编号 外键oid
  FOREIGN KEY(orderId) REFERENCES xfn_order (oid)
);
INSERT INTO xfn_order_detail VALUES
();
