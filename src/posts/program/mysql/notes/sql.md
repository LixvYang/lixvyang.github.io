---
icon: logos:mysql
date: 2026-03-08
isOriginal: true
category:
  - tutorial
tag:
  - mysql
---

SQL是后端程序员经常会打交道的语句，但是很惭愧，我只是在工作中用到，并没有精通熟悉，这篇文章主要记录我SQL一些不熟悉的地方。

<!-- more -->

# SQL 熟练使用

#### 内连接和外连接的区别

| JOIN 类型    | 返回数据  |
| ---------- | ----- |
| INNER JOIN | 两表都匹配 |
| LEFT JOIN  | 左表全部  |
| RIGHT JOIN | 右表全部  |
| FULL JOIN  | 两表全部  |

题目： 组合两个表  

https://leetcode.cn/problems/combine-two-tables/solutions/3573/zu-he-liang-ge-biao-by-leetcode/

```sql
表: Person

+-------------+---------+
| 列名         | 类型     |
+-------------+---------+
| PersonId    | int     |
| FirstName   | varchar |
| LastName    | varchar |
+-------------+---------+
personId 是该表的主键（具有唯一值的列）。
该表包含一些人的 ID 和他们的姓和名的信息。
 

表: Address

+-------------+---------+
| 列名         | 类型    |
+-------------+---------+
| AddressId   | int     |
| PersonId    | int     |
| City        | varchar |
| State       | varchar |
+-------------+---------+
addressId 是该表的主键（具有唯一值的列）。
该表的每一行都包含一个 ID = PersonId 的人的城市和州的信息。
 

编写解决方案，报告 Person 表中每个人的姓、名、城市和州。如果 personId 的地址不在 Address 表中，则报告为 null 。

以 任意顺序 返回结果表。

结果格式如下所示。

 

示例 1:

输入: 
Person表:
+----------+----------+-----------+
| personId | lastName | firstName |
+----------+----------+-----------+
| 1        | Wang     | Allen     |
| 2        | Alice    | Bob       |
+----------+----------+-----------+
Address表:
+-----------+----------+---------------+------------+
| addressId | personId | city          | state      |
+-----------+----------+---------------+------------+
| 1         | 2        | New York City | New York   |
| 2         | 3        | Leetcode      | California |
+-----------+----------+---------------+------------+
输出: 
+-----------+----------+---------------+----------+
| firstName | lastName | city          | state    |
+-----------+----------+---------------+----------+
| Allen     | Wang     | Null          | Null     |
| Bob       | Alice    | New York City | New York |
+-----------+----------+---------------+----------+
解释: 
地址表中没有 personId = 1 的地址，所以它们的城市和州返回 null。
addressId = 1 包含了 personId = 2 的地址信息。
```

这个题目的关键在于了解内外连接的区别，得清楚什么时候用内，外连接 

#### 标量子查询（scalar subquery）在没有结果时的返回规则

题目： https://leetcode.cn/problems/second-highest-salary/

```sql
Employee 表：
+-------------+------+
| Column Name | Type |
+-------------+------+
| id          | int  |
| salary      | int  |
+-------------+------+
id 是这个表的主键。
表的每一行包含员工的工资信息。
 

查询并返回 Employee 表中第二高的 不同 薪水 。如果不存在第二高的薪水，查询应该返回 null(Pandas 则返回 None) 。

查询结果如下例所示。

 

示例 1：

输入：
Employee 表：
+----+--------+
| id | salary |
+----+--------+
| 1  | 100    |
| 2  | 200    |
| 3  | 300    |
+----+--------+
输出：
+---------------------+
| SecondHighestSalary |
+---------------------+
| 200                 |
+---------------------+
示例 2：

输入：
Employee 表：
+----+--------+
| id | salary |
+----+--------+
| 1  | 100    |
+----+--------+
输出：
+---------------------+
| SecondHighestSalary |
+---------------------+
| null                |
+---------------------+
```

解答：

```
SELECT (SELECT DISTINCT salary as SecondHighestSalary FROM Employee ORDER BY salary desc LIMIT 1 OFFSET 1) AS SecondHighestSalary
```

#### 窗口函数

窗口函数（Window Function）的核心作用是：

在不减少行数的情况下，对一组相关行进行计算。

这是和 GROUP BY 最大的区别。

###### 窗口函数基本语法

```sql
function() OVER(...)

function() OVER(
    PARTITION BY ...
    ORDER BY ...
)

RANK() OVER(ORDER BY salary DESC) 按照 salary 从高到低排序 为每一行计算排名

为什么结果看起来自动排序,例如：

SELECT
  name,
  salary,
  RANK() OVER(ORDER BY salary DESC) AS rank
FROM employees;

| name  | salary | rank |
| ----- | ------ | ---- |
| Bob   | 200    | 1    |
| Carol | 150    | 2    |
| Alice | 100    | 3    |

原因：

数据库在计算窗口函数时必须先排序。

执行流程通常是：

Sort salary DESC
    ↓
WindowAgg (计算 rank)
    ↓
Output

因为排序已经做过，所以输出看起来是有序的。

窗口函数在真实业务中非常常见。
RANK()
ROW_NUMBER()
DENSE_RANK()
```


https://leetcode.cn/problems/rank-scores/

```sql

表: Scores

+-------------+---------+
| Column Name | Type    |
+-------------+---------+
| id          | int     |
| score       | decimal |
+-------------+---------+
id 是该表的主键（有不同值的列）。
该表的每一行都包含了一场比赛的分数。Score 是一个有两位小数点的浮点值。
 

编写一个解决方案来查询分数的排名。排名按以下规则计算:

分数应按从高到低排列。
如果两个分数相等，那么两个分数的排名应该相同。
在排名相同的分数后，排名数应该是下一个连续的整数。换句话说，排名之间不应该有空缺的数字。
按 score 降序返回结果表。

查询结果格式如下所示。

 

示例 1:

输入: 
Scores 表:
+----+-------+
| id | score |
+----+-------+
| 1  | 3.50  |
| 2  | 3.65  |
| 3  | 4.00  |
| 4  | 3.85  |
| 5  | 4.00  |
| 6  | 3.65  |
+----+-------+
输出: 
+-------+------+
| score | rank |
+-------+------+
| 4.00  | 1    |
| 4.00  | 1    |
| 3.85  | 2    |
| 3.65  | 3    |
| 3.65  | 3    |
| 3.50  | 4    |
+-------+------+

解答：

SELECT s.score, DENSE_RANK() OVER (ORDER BY S.score DESC) AS 'rank' FROM Scores S ORDER BY S.score DESC;
```

#### 表连接的时候 ON和WHERE的区别

| 位置    | 作用            |
| ----- | ------------- |
| ON    | 定义表之间的匹配关系    |
| WHERE | 对 JOIN 结果进行过滤 |

ON 的功能

ON 的作用是定义两张表如何匹配。

例如：

SELECT *
FROM users u
JOIN orders o
ON u.id = o.user_id;

含义：

users.id 和 orders.user_id 相等时才连接

ON 定义的是：

表之间的关系

INNER JOIN 时 ON 和 WHERE 的关系

当使用 INNER JOIN 时：

很多时候 ON 和 WHERE 的效果一样。

例如：

写法1
SELECT *
FROM A
JOIN B
ON A.id = B.id;
写法2
SELECT *
FROM A, B
WHERE A.id = B.id;

结果通常一样。

因为：

INNER JOIN 只保留匹配行

