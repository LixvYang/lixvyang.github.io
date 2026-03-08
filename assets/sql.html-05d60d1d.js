import{_ as l}from"./plugin-vue_export-helper-c27b6911.js";import{r,o as t,c as i,b as s,f as d,e as o,d as a,a as p}from"./app-0e844b37.js";const c={},k={href:"https://leetcode.cn/problems/combine-two-tables/solutions/3573/zu-he-liang-ge-biao-by-leetcode/",target:"_blank",rel:"noopener noreferrer"},u={href:"https://leetcode.cn/problems/second-highest-salary/",target:"_blank",rel:"noopener noreferrer"},v={href:"https://leetcode.cn/problems/rank-scores/",target:"_blank",rel:"noopener noreferrer"},m={href:"http://u.id",target:"_blank",rel:"noopener noreferrer"},b={href:"http://users.id",target:"_blank",rel:"noopener noreferrer"},y={href:"http://A.id",target:"_blank",rel:"noopener noreferrer"},E={href:"http://B.id",target:"_blank",rel:"noopener noreferrer"},N={href:"http://A.id",target:"_blank",rel:"noopener noreferrer"},w={href:"http://B.id",target:"_blank",rel:"noopener noreferrer"};function g(O,n){const e=r("ExternalLinkIcon");return t(),i("div",null,[n[40]||(n[40]=s("p",null,"SQL是后端程序员经常会打交道的语句，但是很惭愧，我只是在工作中用到，并没有精通熟悉，这篇文章主要记录我SQL一些不熟悉的地方。",-1)),d(" more "),n[41]||(n[41]=o('<h1 id="sql-熟练使用" tabindex="-1"><a class="header-anchor" href="#sql-熟练使用" aria-hidden="true">#</a> SQL 熟练使用</h1><h4 id="内连接和外连接的区别" tabindex="-1"><a class="header-anchor" href="#内连接和外连接的区别" aria-hidden="true">#</a> 内连接和外连接的区别</h4><table><thead><tr><th>JOIN 类型</th><th>返回数据</th></tr></thead><tbody><tr><td>INNER JOIN</td><td>两表都匹配</td></tr><tr><td>LEFT JOIN</td><td>左表全部</td></tr><tr><td>RIGHT JOIN</td><td>右表全部</td></tr><tr><td>FULL JOIN</td><td>两表全部</td></tr></tbody></table><p>题目： 组合两个表</p>',4)),s("p",null,[s("a",k,[n[0]||(n[0]=a("https://leetcode.cn/problems/combine-two-tables/solutions/3573/zu-he-liang-ge-biao-by-leetcode/",-1)),p(e)])]),n[42]||(n[42]=o(`<div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code>表: Person

<span class="token operator">+</span><span class="token comment">-------------+---------+</span>
<span class="token operator">|</span> 列名         <span class="token operator">|</span> 类型     <span class="token operator">|</span>
<span class="token operator">+</span><span class="token comment">-------------+---------+</span>
<span class="token operator">|</span> PersonId    <span class="token operator">|</span> <span class="token keyword">int</span>     <span class="token operator">|</span>
<span class="token operator">|</span> FirstName   <span class="token operator">|</span> <span class="token keyword">varchar</span> <span class="token operator">|</span>
<span class="token operator">|</span> LastName    <span class="token operator">|</span> <span class="token keyword">varchar</span> <span class="token operator">|</span>
<span class="token operator">+</span><span class="token comment">-------------+---------+</span>
personId 是该表的主键（具有唯一值的列）。
该表包含一些人的 ID 和他们的姓和名的信息。
 

表: Address

<span class="token operator">+</span><span class="token comment">-------------+---------+</span>
<span class="token operator">|</span> 列名         <span class="token operator">|</span> 类型    <span class="token operator">|</span>
<span class="token operator">+</span><span class="token comment">-------------+---------+</span>
<span class="token operator">|</span> AddressId   <span class="token operator">|</span> <span class="token keyword">int</span>     <span class="token operator">|</span>
<span class="token operator">|</span> PersonId    <span class="token operator">|</span> <span class="token keyword">int</span>     <span class="token operator">|</span>
<span class="token operator">|</span> City        <span class="token operator">|</span> <span class="token keyword">varchar</span> <span class="token operator">|</span>
<span class="token operator">|</span> State       <span class="token operator">|</span> <span class="token keyword">varchar</span> <span class="token operator">|</span>
<span class="token operator">+</span><span class="token comment">-------------+---------+</span>
addressId 是该表的主键（具有唯一值的列）。
该表的每一行都包含一个 ID <span class="token operator">=</span> PersonId 的人的城市和州的信息。
 

编写解决方案，报告 Person 表中每个人的姓、名、城市和州。如果 personId 的地址不在 Address 表中，则报告为 <span class="token boolean">null</span> 。

以 任意顺序 返回结果表。

结果格式如下所示。

 

示例 <span class="token number">1</span>:

输入: 
Person表:
<span class="token operator">+</span><span class="token comment">----------+----------+-----------+</span>
<span class="token operator">|</span> personId <span class="token operator">|</span> lastName <span class="token operator">|</span> firstName <span class="token operator">|</span>
<span class="token operator">+</span><span class="token comment">----------+----------+-----------+</span>
<span class="token operator">|</span> <span class="token number">1</span>        <span class="token operator">|</span> Wang     <span class="token operator">|</span> Allen     <span class="token operator">|</span>
<span class="token operator">|</span> <span class="token number">2</span>        <span class="token operator">|</span> Alice    <span class="token operator">|</span> Bob       <span class="token operator">|</span>
<span class="token operator">+</span><span class="token comment">----------+----------+-----------+</span>
Address表:
<span class="token operator">+</span><span class="token comment">-----------+----------+---------------+------------+</span>
<span class="token operator">|</span> addressId <span class="token operator">|</span> personId <span class="token operator">|</span> city          <span class="token operator">|</span> state      <span class="token operator">|</span>
<span class="token operator">+</span><span class="token comment">-----------+----------+---------------+------------+</span>
<span class="token operator">|</span> <span class="token number">1</span>         <span class="token operator">|</span> <span class="token number">2</span>        <span class="token operator">|</span> New York City <span class="token operator">|</span> New York   <span class="token operator">|</span>
<span class="token operator">|</span> <span class="token number">2</span>         <span class="token operator">|</span> <span class="token number">3</span>        <span class="token operator">|</span> Leetcode      <span class="token operator">|</span> California <span class="token operator">|</span>
<span class="token operator">+</span><span class="token comment">-----------+----------+---------------+------------+</span>
输出: 
<span class="token operator">+</span><span class="token comment">-----------+----------+---------------+----------+</span>
<span class="token operator">|</span> firstName <span class="token operator">|</span> lastName <span class="token operator">|</span> city          <span class="token operator">|</span> state    <span class="token operator">|</span>
<span class="token operator">+</span><span class="token comment">-----------+----------+---------------+----------+</span>
<span class="token operator">|</span> Allen     <span class="token operator">|</span> Wang     <span class="token operator">|</span> <span class="token boolean">Null</span>          <span class="token operator">|</span> <span class="token boolean">Null</span>     <span class="token operator">|</span>
<span class="token operator">|</span> Bob       <span class="token operator">|</span> Alice    <span class="token operator">|</span> New York City <span class="token operator">|</span> New York <span class="token operator">|</span>
<span class="token operator">+</span><span class="token comment">-----------+----------+---------------+----------+</span>
解释: 
地址表中没有 personId <span class="token operator">=</span> <span class="token number">1</span> 的地址，所以它们的城市和州返回 <span class="token boolean">null</span>。
addressId <span class="token operator">=</span> <span class="token number">1</span> 包含了 personId <span class="token operator">=</span> <span class="token number">2</span> 的地址信息。
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这个题目的关键在于了解内外连接的区别，得清楚什么时候用内，外连接</p><h4 id="标量子查询-scalar-subquery-在没有结果时的返回规则" tabindex="-1"><a class="header-anchor" href="#标量子查询-scalar-subquery-在没有结果时的返回规则" aria-hidden="true">#</a> 标量子查询（scalar subquery）在没有结果时的返回规则</h4>`,3)),s("p",null,[n[2]||(n[2]=a("题目： ",-1)),s("a",u,[n[1]||(n[1]=a("https://leetcode.cn/problems/second-highest-salary/",-1)),p(e)])]),n[43]||(n[43]=o(`<div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code>Employee 表：
<span class="token operator">+</span><span class="token comment">-------------+------+</span>
<span class="token operator">|</span> <span class="token keyword">Column</span> Name <span class="token operator">|</span> <span class="token keyword">Type</span> <span class="token operator">|</span>
<span class="token operator">+</span><span class="token comment">-------------+------+</span>
<span class="token operator">|</span> id          <span class="token operator">|</span> <span class="token keyword">int</span>  <span class="token operator">|</span>
<span class="token operator">|</span> salary      <span class="token operator">|</span> <span class="token keyword">int</span>  <span class="token operator">|</span>
<span class="token operator">+</span><span class="token comment">-------------+------+</span>
id 是这个表的主键。
表的每一行包含员工的工资信息。
 

查询并返回 Employee 表中第二高的 不同 薪水 。如果不存在第二高的薪水，查询应该返回 <span class="token boolean">null</span><span class="token punctuation">(</span>Pandas 则返回 None<span class="token punctuation">)</span> 。

查询结果如下例所示。

 

示例 <span class="token number">1</span>：

输入：
Employee 表：
<span class="token operator">+</span><span class="token comment">----+--------+</span>
<span class="token operator">|</span> id <span class="token operator">|</span> salary <span class="token operator">|</span>
<span class="token operator">+</span><span class="token comment">----+--------+</span>
<span class="token operator">|</span> <span class="token number">1</span>  <span class="token operator">|</span> <span class="token number">100</span>    <span class="token operator">|</span>
<span class="token operator">|</span> <span class="token number">2</span>  <span class="token operator">|</span> <span class="token number">200</span>    <span class="token operator">|</span>
<span class="token operator">|</span> <span class="token number">3</span>  <span class="token operator">|</span> <span class="token number">300</span>    <span class="token operator">|</span>
<span class="token operator">+</span><span class="token comment">----+--------+</span>
输出：
<span class="token operator">+</span><span class="token comment">---------------------+</span>
<span class="token operator">|</span> SecondHighestSalary <span class="token operator">|</span>
<span class="token operator">+</span><span class="token comment">---------------------+</span>
<span class="token operator">|</span> <span class="token number">200</span>                 <span class="token operator">|</span>
<span class="token operator">+</span><span class="token comment">---------------------+</span>
示例 <span class="token number">2</span>：

输入：
Employee 表：
<span class="token operator">+</span><span class="token comment">----+--------+</span>
<span class="token operator">|</span> id <span class="token operator">|</span> salary <span class="token operator">|</span>
<span class="token operator">+</span><span class="token comment">----+--------+</span>
<span class="token operator">|</span> <span class="token number">1</span>  <span class="token operator">|</span> <span class="token number">100</span>    <span class="token operator">|</span>
<span class="token operator">+</span><span class="token comment">----+--------+</span>
输出：
<span class="token operator">+</span><span class="token comment">---------------------+</span>
<span class="token operator">|</span> SecondHighestSalary <span class="token operator">|</span>
<span class="token operator">+</span><span class="token comment">---------------------+</span>
<span class="token operator">|</span> <span class="token boolean">null</span>                <span class="token operator">|</span>
<span class="token operator">+</span><span class="token comment">---------------------+</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>解答：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>SELECT (SELECT DISTINCT salary as SecondHighestSalary FROM Employee ORDER BY salary desc LIMIT 1 OFFSET 1) AS SecondHighestSalary
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h4 id="窗口函数" tabindex="-1"><a class="header-anchor" href="#窗口函数" aria-hidden="true">#</a> 窗口函数</h4><p>窗口函数（Window Function）的核心作用是：</p><p>在不减少行数的情况下，对一组相关行进行计算。</p><p>这是和 GROUP BY 最大的区别。</p><h6 id="窗口函数基本语法" tabindex="-1"><a class="header-anchor" href="#窗口函数基本语法" aria-hidden="true">#</a> 窗口函数基本语法</h6><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">OVER</span><span class="token punctuation">(</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">)</span>

<span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">OVER</span><span class="token punctuation">(</span>
    <span class="token keyword">PARTITION</span> <span class="token keyword">BY</span> <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>
    <span class="token keyword">ORDER</span> <span class="token keyword">BY</span> <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>
<span class="token punctuation">)</span>

RANK<span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">OVER</span><span class="token punctuation">(</span><span class="token keyword">ORDER</span> <span class="token keyword">BY</span> salary <span class="token keyword">DESC</span><span class="token punctuation">)</span> 按照 salary 从高到低排序 为每一行计算排名

为什么结果看起来自动排序<span class="token punctuation">,</span>例如：

<span class="token keyword">SELECT</span>
  name<span class="token punctuation">,</span>
  salary<span class="token punctuation">,</span>
  RANK<span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">OVER</span><span class="token punctuation">(</span><span class="token keyword">ORDER</span> <span class="token keyword">BY</span> salary <span class="token keyword">DESC</span><span class="token punctuation">)</span> <span class="token keyword">AS</span> rank
<span class="token keyword">FROM</span> employees<span class="token punctuation">;</span>

<span class="token operator">|</span> name  <span class="token operator">|</span> salary <span class="token operator">|</span> rank <span class="token operator">|</span>
<span class="token operator">|</span> <span class="token comment">----- | ------ | ---- |</span>
<span class="token operator">|</span> Bob   <span class="token operator">|</span> <span class="token number">200</span>    <span class="token operator">|</span> <span class="token number">1</span>    <span class="token operator">|</span>
<span class="token operator">|</span> Carol <span class="token operator">|</span> <span class="token number">150</span>    <span class="token operator">|</span> <span class="token number">2</span>    <span class="token operator">|</span>
<span class="token operator">|</span> Alice <span class="token operator">|</span> <span class="token number">100</span>    <span class="token operator">|</span> <span class="token number">3</span>    <span class="token operator">|</span>

原因：

数据库在计算窗口函数时必须先排序。

执行流程通常是：

Sort salary <span class="token keyword">DESC</span>
    ↓
WindowAgg <span class="token punctuation">(</span>计算 rank<span class="token punctuation">)</span>
    ↓
Output

因为排序已经做过，所以输出看起来是有序的。

窗口函数在真实业务中非常常见。
RANK<span class="token punctuation">(</span><span class="token punctuation">)</span>
ROW_NUMBER<span class="token punctuation">(</span><span class="token punctuation">)</span>
DENSE_RANK<span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,9)),s("p",null,[s("a",v,[n[3]||(n[3]=a("https://leetcode.cn/problems/rank-scores/",-1)),p(e)])]),n[44]||(n[44]=o(`<div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code>
表: Scores

<span class="token operator">+</span><span class="token comment">-------------+---------+</span>
<span class="token operator">|</span> <span class="token keyword">Column</span> Name <span class="token operator">|</span> <span class="token keyword">Type</span>    <span class="token operator">|</span>
<span class="token operator">+</span><span class="token comment">-------------+---------+</span>
<span class="token operator">|</span> id          <span class="token operator">|</span> <span class="token keyword">int</span>     <span class="token operator">|</span>
<span class="token operator">|</span> score       <span class="token operator">|</span> <span class="token keyword">decimal</span> <span class="token operator">|</span>
<span class="token operator">+</span><span class="token comment">-------------+---------+</span>
id 是该表的主键（有不同值的列）。
该表的每一行都包含了一场比赛的分数。Score 是一个有两位小数点的浮点值。
 

编写一个解决方案来查询分数的排名。排名按以下规则计算:

分数应按从高到低排列。
如果两个分数相等，那么两个分数的排名应该相同。
在排名相同的分数后，排名数应该是下一个连续的整数。换句话说，排名之间不应该有空缺的数字。
按 score 降序返回结果表。

查询结果格式如下所示。

 

示例 <span class="token number">1</span>:

输入: 
Scores 表:
<span class="token operator">+</span><span class="token comment">----+-------+</span>
<span class="token operator">|</span> id <span class="token operator">|</span> score <span class="token operator">|</span>
<span class="token operator">+</span><span class="token comment">----+-------+</span>
<span class="token operator">|</span> <span class="token number">1</span>  <span class="token operator">|</span> <span class="token number">3.50</span>  <span class="token operator">|</span>
<span class="token operator">|</span> <span class="token number">2</span>  <span class="token operator">|</span> <span class="token number">3.65</span>  <span class="token operator">|</span>
<span class="token operator">|</span> <span class="token number">3</span>  <span class="token operator">|</span> <span class="token number">4.00</span>  <span class="token operator">|</span>
<span class="token operator">|</span> <span class="token number">4</span>  <span class="token operator">|</span> <span class="token number">3.85</span>  <span class="token operator">|</span>
<span class="token operator">|</span> <span class="token number">5</span>  <span class="token operator">|</span> <span class="token number">4.00</span>  <span class="token operator">|</span>
<span class="token operator">|</span> <span class="token number">6</span>  <span class="token operator">|</span> <span class="token number">3.65</span>  <span class="token operator">|</span>
<span class="token operator">+</span><span class="token comment">----+-------+</span>
输出: 
<span class="token operator">+</span><span class="token comment">-------+------+</span>
<span class="token operator">|</span> score <span class="token operator">|</span> rank <span class="token operator">|</span>
<span class="token operator">+</span><span class="token comment">-------+------+</span>
<span class="token operator">|</span> <span class="token number">4.00</span>  <span class="token operator">|</span> <span class="token number">1</span>    <span class="token operator">|</span>
<span class="token operator">|</span> <span class="token number">4.00</span>  <span class="token operator">|</span> <span class="token number">1</span>    <span class="token operator">|</span>
<span class="token operator">|</span> <span class="token number">3.85</span>  <span class="token operator">|</span> <span class="token number">2</span>    <span class="token operator">|</span>
<span class="token operator">|</span> <span class="token number">3.65</span>  <span class="token operator">|</span> <span class="token number">3</span>    <span class="token operator">|</span>
<span class="token operator">|</span> <span class="token number">3.65</span>  <span class="token operator">|</span> <span class="token number">3</span>    <span class="token operator">|</span>
<span class="token operator">|</span> <span class="token number">3.50</span>  <span class="token operator">|</span> <span class="token number">4</span>    <span class="token operator">|</span>
<span class="token operator">+</span><span class="token comment">-------+------+</span>

解答：

<span class="token keyword">SELECT</span> s<span class="token punctuation">.</span>score<span class="token punctuation">,</span> DENSE_RANK<span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">OVER</span> <span class="token punctuation">(</span><span class="token keyword">ORDER</span> <span class="token keyword">BY</span> S<span class="token punctuation">.</span>score <span class="token keyword">DESC</span><span class="token punctuation">)</span> <span class="token keyword">AS</span> <span class="token string">&#39;rank&#39;</span> <span class="token keyword">FROM</span> Scores S <span class="token keyword">ORDER</span> <span class="token keyword">BY</span> S<span class="token punctuation">.</span>score <span class="token keyword">DESC</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="表连接的时候-on和where的区别" tabindex="-1"><a class="header-anchor" href="#表连接的时候-on和where的区别" aria-hidden="true">#</a> 表连接的时候 ON和WHERE的区别</h4><table><thead><tr><th>位置</th><th>作用</th></tr></thead><tbody><tr><td>ON</td><td>定义表之间的匹配关系</td></tr><tr><td>WHERE</td><td>对 JOIN 结果进行过滤</td></tr></tbody></table><p>ON 的功能</p><p>ON 的作用是定义两张表如何匹配。</p><p>例如：</p>`,6)),s("p",null,[n[5]||(n[5]=a("SELECT *",-1)),n[6]||(n[6]=s("br",null,null,-1)),n[7]||(n[7]=a(" FROM users u",-1)),n[8]||(n[8]=s("br",null,null,-1)),n[9]||(n[9]=a(" JOIN orders o",-1)),n[10]||(n[10]=s("br",null,null,-1)),n[11]||(n[11]=a(" ON ",-1)),s("a",m,[n[4]||(n[4]=a("u.id",-1)),p(e)]),n[12]||(n[12]=a(" = o.user_id;",-1))]),n[45]||(n[45]=s("p",null,"含义：",-1)),s("p",null,[s("a",b,[n[13]||(n[13]=a("users.id",-1)),p(e)]),n[14]||(n[14]=a(" 和 orders.user_id 相等时才连接",-1))]),n[46]||(n[46]=s("p",null,"ON 定义的是：",-1)),n[47]||(n[47]=s("p",null,"表之间的关系",-1)),n[48]||(n[48]=s("p",null,"INNER JOIN 时 ON 和 WHERE 的关系",-1)),n[49]||(n[49]=s("p",null,"当使用 INNER JOIN 时：",-1)),n[50]||(n[50]=s("p",null,"很多时候 ON 和 WHERE 的效果一样。",-1)),n[51]||(n[51]=s("p",null,"例如：",-1)),s("p",null,[n[19]||(n[19]=a("写法1",-1)),n[20]||(n[20]=s("br",null,null,-1)),n[21]||(n[21]=a(" SELECT *",-1)),n[22]||(n[22]=s("br",null,null,-1)),n[23]||(n[23]=a(" FROM A",-1)),n[24]||(n[24]=s("br",null,null,-1)),n[25]||(n[25]=a(" JOIN B",-1)),n[26]||(n[26]=s("br",null,null,-1)),n[27]||(n[27]=a(" ON ",-1)),s("a",y,[n[15]||(n[15]=a("A.id",-1)),p(e)]),n[28]||(n[28]=a(" = ",-1)),s("a",E,[n[16]||(n[16]=a("B.id",-1)),p(e)]),n[29]||(n[29]=a(";",-1)),n[30]||(n[30]=s("br",null,null,-1)),n[31]||(n[31]=a(" 写法2",-1)),n[32]||(n[32]=s("br",null,null,-1)),n[33]||(n[33]=a(" SELECT *",-1)),n[34]||(n[34]=s("br",null,null,-1)),n[35]||(n[35]=a(" FROM A, B",-1)),n[36]||(n[36]=s("br",null,null,-1)),n[37]||(n[37]=a(" WHERE ",-1)),s("a",N,[n[17]||(n[17]=a("A.id",-1)),p(e)]),n[38]||(n[38]=a(" = ",-1)),s("a",w,[n[18]||(n[18]=a("B.id",-1)),p(e)]),n[39]||(n[39]=a(";",-1))]),n[52]||(n[52]=s("p",null,"结果通常一样。",-1)),n[53]||(n[53]=s("p",null,"因为：",-1)),n[54]||(n[54]=s("p",null,"INNER JOIN 只保留匹配行",-1))])}const I=l(c,[["render",g],["__file","sql.html.vue"]]);export{I as default};
