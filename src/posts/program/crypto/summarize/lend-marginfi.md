---
icon: cryptocurrency:sol
date: 2025-03-09
isOriginal: true
category:
  - notes
tag:
  - crypto
  - lend
  - swap
  - marginfi
---

MarginFi 协议是Solana生态最知名成熟的借贷协议之一，其借贷模型很多参考了Solend(这位是Solana上最古老的借贷协议)，本文涉及对MarginFi源代码的解析。

本来想写ETH生态的AAVE，但对MarginFi最熟悉，就先写这个了。

<!-- more -->

# Defi乐高之借贷协议(2)--MarginFi

## MarginFi VS Solend

Marginfi 是一个开源的流动性借贷协议, Marginfi的很多影子都有借鉴 Solend。

由于 SoLend 和 SUI 生态的 SuiLend 是同一个团队在做，同时其团队重心已经在Sui生态倾斜，SoLend 已经没什么开发了，所以要在 Solana上 学习和使用借贷协议应该优先考虑正在活跃开发的 Marginfi，但如果你是有巨量资金并有安全考虑则应该使用 SoLend。

## MarginFi 介绍

[MarginFi](https://marginfi.com/) 是Solana生态上的去中心化借贷协议，利用Solana的高吞吐量和低费用提供了非常流畅的借贷体验,借贷[Lend官网](https://app.marginfi.com/)。

![](/assets/images/crypto/marginfi-lend.png)

[介绍文档](https://docs.marginfi.com/)中有介绍其的核心机制，是Marginfi协议最全的资料，要想更深入就只能去翻源代码了。

## 功能

```
一个Solana地址支持多个账户, 你可以在自己的一个Solana地址初始化多个借贷账户只要支付租金就可以了。
```

1. Lend

在 Marginfi 中，用户存入资产后不会获得独立的代币凭证（区别于 AAVE 的 aToken），而是在协议内部记录用户的存款份额。

比如我存入了 1SOl 到 MarginFi中，那么在 MarginFi 协议中会有对应的 Share 份额记录，协议内部为每个Share进行维护当我 Withdraw 时会连本带息将所有的资金都拿回(内部处理没有这么简单，但这是最简单的表述方式)。

2. Borrow

只要你有足够的可作为抵押的抵押品，那么你可以借出其他的资产(不能同时lend/borrow同一个资产)

MarginFi采用统一抵押池方式，不同于AAVE的资产隔离，这种方式反而更方便(仅需要对某些隔离代币进行单独设置即可达到AAVE的隔离效果)，好处:

- 所有存入的资产共同作为借款的抵押品
- 用户可以借出任何支持的资产，只要总体健康因子保持在安全范围内
- 只有单一的可变利率模式，没有固定利率选项（简化设计）

1. Withdraw

没什么特殊讲的，连本带息拿回即可，需要保证账户健康因子处于健康状态。

4. Repay

Marginfi 支持部分或全部偿还借款。由于 Solana 的低交易费用，用户可以更频繁地进行小额偿还，提高健康因子。

5. Health Factor

每个账户的健康状况都以 health factor 表示。账户健康因子是一个单一值，概括了投资组合的健康状况。

```
A = 1 - liabilities(weight) / asset(weight)
```
帐户运行状况通常在 0% 到 100% 之间，但从技术上讲可以低至 -∞。当您的账户健康状况达到 0% 或以下时，您将面临清算风险。

下面对上面的公式进行概念介绍(用官网的介绍):

当你在 marginfi 上借出资产时，在为抵押品定价时需要牢记以下几点：
- 每项资产都有一个由其预言机确定的市场美元价格。
- 每项资产都有一个经过置信区间调整的市场美元价格，由价格预言机 95% 置信区间的下限决定。
- 每项资产都有一个加权价格，即置信区间调整后的市场美元价格乘以资产的存款权重。

以下是一个例子：


```md
假设价格预言机提供的 SOL 市场美元价格为 25 美元。

价格预言机的 95% 置信区间为 +/- 1 美元，即 24-26 美元。此置信区间的下限为 24 美元，因此置信区间调整后的市场美元价格为 24 美元。
假设 marginfi 上的 SOL 资产权重为 90%。我们将置信区间调整后的市场美元价格乘以资产权重，即 24 美元 * 90%。

经过所有调整后，SOL 作为抵押品的价格为 24 * 0.9 = 21.60 美元。
```

与资产类似，marginfi 上的债务也进行调整：

- 每项债务都有一个由其预言机确定的市场美元价格。该市场美元价格与给定代币出借时的市场美元价格相同。
- 每项债务都有一个经过置信区间调整的市场美元价格，由价格预言机 95% 置信区间的上限决定。
- 每项债务都有一个加权价格，即置信区间调整后的市场美元价格乘以债务的借入权重。

以下是一个例子：

```
假设价格预言机提供的 SOL 市场美元价格为 25 美元。

价格预言机的 95% 置信区间为 +/- 1 美元，即 24-26 美元。此置信区间的上限为 26 美元，因此置信区间调整后的市场美元价格为 26 美元。
假设 marginfi 上的 SOL LTV 为 80%。我们将置信区间调整后的市场美元价格乘以 1/LTV1 。在本例中为 1/0.80=1.25。

经过所有调整后，SOL 的债务价格为 26*1.25 = 32.50 美元。
```

6. Liquidate

协议的清算非常重要，这是在极端行情下协议仍能安全运行的必要条件。

MarginFi的清算条件非常保守，当账户面临清算时，借款人将承担 5% 的清算罚款(5%的罚款从抵押品中扣除)，由清算人（2.5%）和 Marginfi 协议的保险基金（2.5%）平分。协议采用部分清算方式，仅清算将账户健康因子恢复到 1 所需的最小金额的资产,比起AAVE的激进50%清算已经相当保守了。

最终结果是: 

```md
借款人失去抵押品 (1+5%)
清算人: 支付债务，获得抵押品(1+2.5%)
协议方: 获取抵押品(2.5%)
```

当然还有一种最坏的情况,即银行发生有个坏账账户无人清算且保险基金无法全部偿还，那么可能会启动最差的坏账程序，让损失平摊在所有存款人上，相当于是所有存款人来平均支付坏账，后面会有代码分析。

## 玩法

总的来说 Marginfi 支持相当多的玩法，官网列出的有:

1. 收益聚合器
描述：创建一个平台，自动将用户资金在各种借贷协议之间转移，以最大化他们的年化收益率(APY)。
好处：用户无需手动跟踪和转移资金，就能从其加密资产获得尽可能高的回报。

2. 去中心化稳定币
描述：开发一个稳定币系统，通过超额抵押的加密贷款来维持价格稳定。
好处：用户可以通过抵押他们的加密资产借出稳定币，提供稳定的交换媒介，同时保持他们的加密投资不变。

3. 杠杆交易平台
描述：构建一个允许用户借入资金以增加交易仓位规模的平台，从而实现更高的潜在回报。
好处：交易者可以通过杠杆借款放大收益，而贷款人则可以从提供的资金中赚取利息。

4. 自动化投资顾问
描述：设计一个人工智能驱动的投资顾问，使用借贷策略优化用户投资组合。
好处：用户获得个性化的投资建议，利用借贷平衡风险和回报。

5. DeFi交易所的流动性池
描述：创建为去中心化交易所提供即时贷款的流动性池，促进平滑快速的交易。
好处：流动性提供者从资金中赚取利息，而交易者则受益于改善的市场流动性和减少的滑点。

6. 加密货币储蓄账户
描述：提供储蓄账户，用户可以存入加密资产赚取稳定的利率。
好处：用户可以享受与传统银行储蓄账户类似的安全可预测的加密资产回报。

7. 闪电贷套利机器人
描述：开发使用闪电贷款利用多个交易所之间价格差异的机器人，通过套利赚取利润。
好处：套利机器人可以迅速利用市场低效率，提供稳定回报。

8. 抵押NFT贷款
描述：允许用户以NFT作为抵押品进行借款。
好处：NFT持有者无需出售其宝贵的数字资产即可释放流动性。

9. 去中心化保险平台
描述：创建通过借出资金赚取利息来覆盖潜在索赔的保险平台。
好处：保险池通过借贷增加资金，确保为所有成员提供足够的保障。

10. DAO财库管理
描述：使DAO能够通过出借闲置资金赚取利息，更有效地管理其财库。
好处：DAO可以通过储备金产生被动收入来增加财务可持续性。

目前 MarginFi 团队已经做了杠杆交易的产品做多做空的产品:

- [MrgnLend](https://app.marginfi.com/) 核心产品所有代币的借贷.
- [Arena](https://www.thearena.trade/) 主要是杠杆交易 Meme 币.
- [MrgnLoop](https://app.marginfi.com/looper) 多次套利协议.


## 核心代码交互

这里涉及分析 MarginFi 的核心代码大概3000行左右 [Marginfi Core](https://github.com/mrgnlabs/marginfi-v2/tree/main/programs/marginfi)

我在翻 MarginFi 协议的代码过程中，我发现 MarginFi 协议支持非常多的参数，例如一个代币对应的银行可配置是否为隔离银行(不支持作为抵押品)，支持设置银行的Weight与LTV、 Max Supply、Max Borrow和各种Fee等等。

MarginFi是以Group形式管理多个Bank的，一个Bank管理一个代币。

你可以理解为: 一个Group可以管理多个银行对应代币的借贷行为，支持设置Group Fee支持组级别的费用,我们在上面看到的 Lend 界面其实就是一个 Group 下面对应的所有 Bank。

:::info
其实不同组可以创建相同的银行代币，比如如果我想为Mixin生态的代币也建立一个Mixin Group，那么我可以在自己的组内创建Solana代币的银行，创建XIN代币的银行等等。

你可以看下核心代码中支持的设置，一个 Bank 对应的就是一个代币:
:::

创建银行的可配置项非常多:

```rs
/// 创建银行配置
pub struct BankConfigCompact {
    pub asset_weight_init: WrappedI80F48,  // 初始资产权重
    pub asset_weight_maint: WrappedI80F48, // 维护资产权重

    pub liability_weight_init: WrappedI80F48, // 初始债务权重
    pub liability_weight_maint: WrappedI80F48, // 维护债务权重

    pub deposit_limit: u64, // 存款限额
    pub borrow_limit: u64, // 借款限额
  
    pub interest_rate_config: InterestRateConfigCompact, // 利率配置
    pub operational_state: BankOperationalState,         // 银行操作状态 Paused,Operational,ReduceOnly

    pub oracle_setup: OracleSetup, // 预言机设置
    pub oracle_key: Pubkey,        // 预言机密钥
    pub risk_tier: RiskTier, // 风险等级 是否是隔离资产
    pub total_asset_value_init_limit: u64, // 初始化保证金要求的资产价值限额（以美元计）
    pub oracle_max_age: u16, // 预言机价格数据的最大有效时间（秒）
}

pub struct InterestRateConfig {
    pub optimal_utilization_rate: WrappedI80F48, // 最优利用率
    pub plateau_interest_rate: WrappedI80F48,    // 平台利率
    pub max_interest_rate: WrappedI80F48,        // 最大利率
    pub insurance_fee_fixed_apr: WrappedI80F48, // 固定年利率的保险费
    pub insurance_ir_fee: WrappedI80F48,        // 保险利率费用
    pub protocol_fixed_fee_apr: WrappedI80F48,  // 固定年利率的协议费用
    pub protocol_ir_fee: WrappedI80F48,         // 协议利率费用
}
```

```rs
/// 利用率计算采用 分段线性利率函数。
/// 参数 ur 是 资金利用率 borrow/lend 
/// 当利用率接近 `optimal_utilization_rate` 时，曲线接近 `plateau_interest_rate`，
/// 一旦利用率超过 `optimal_utilization_rate`，曲线接近 `max_interest_rate`。
fn interest_rate_curve(&self, ur: I80F48) -> Option<I80F48> {
    let optimal_ur = self.optimal_utilization_rate.into();
    let plateau_ir = self.plateau_interest_rate.into();
    let max_ir: I80F48 = self.max_interest_rate.into();
    if ur <= optimal_ur {
        ur.checked_div(optimal_ur)?.checked_mul(plateau_ir)
    } else {
        (ur - optimal_ur)
            .checked_div(I80F48::ONE - optimal_ur)?
            .checked_mul(max_ir - plateau_ir)?
            .checked_add(plateau_ir)
    }
}
```

```rs
/// 返回借款人和存款人的利率。
/// 利率以年利率（APR）表示（0-）。
///
/// utilization_ratio 利用率，表示已使用的资源占总资源的比例
/// 返回 (`lending_rate`, `borrowing_rate`, `group_fees_apr``insurance_fees_apr`)
pub fn calc_interest_rate(
    &self,
    utilization_ratio: I80F48,
) -> Option<(I80F48, I80F48, I80F48, I80F48)> {
    let protocol_ir_fee = I80F48::from(self.protocol_ir_fee);
    let insurance_ir_fee = I80F48::from(self.insurance_ir_fee)
    let protocol_fixed_fee_apr = I80F48::from(selprotocol_fixed_fee_apr);
    let insurance_fee_fixed_apr = I80F48::from(selinsurance_fee_fixed_apr)
    // 计算总的利率费用和总的固定年利率费用
    let rate_fee = protocol_ir_fee + insurance_ir_fee;
    let total_fixed_fee_apr = protocol_fixed_fee_apr insurance_fee_fixed_apr
    // 计算基础利率
    let base_rate = self.interest_rate_cur(utilization_ratio)?
    // 根据利用率调整存款利率，使借款人和存款人之间的支付对称化
    let lending_rate = base_rate.checked_m(utilization_ratio)?
    debug!("base_rate: {:?}", base_rate);
    debug!("rate_fee: {:?}", rate_fee);
    debug!("total_fixed_fee_apr: {:?}", total_fixed_fee_apr);
    // 根据费用调整借款利率
    // borrowing_rate = base_rate + base_rate * rate_fee total_fixed_fee_apr
    let borrowing_rate = base_rate
        .checked_mul(I80F48::ONE.checked_add(rate_fee)?)?
        .checked_add(total_fixed_fee_apr)?
    // 计算组费用的年利率
    let group_fees_apr = calc_fee_rate(
        base_rate,
        self.protocol_ir_fee.into(),
        self.protocol_fixed_fee_apr.into(),
    )?
    // 计算保险费用的年利率
    let insurance_fees_apr = calc_fee_rate(
        base_rate,
        self.insurance_ir_fee.into(),
        self.insurance_fee_fixed_apr.into(),
    )?
    // 确保所有利率均为非负值
    assert!(lending_rate >= I80F48::ZERO);
    assert!(borrowing_rate >= I80F48::ZERO);
    assert!(group_fees_apr >= I80F48::ZERO);
    assert!(insurance_fees_apr >= I80F48::ZERO)
    // 返回计算出的利率
    Some((
        lending_rate,
        borrowing_rate,
        group_fees_apr,
        insurance_fees_apr,
    ))
}
```

代码可以看到lend 和 borrow 之间的利息差主要是支付给了协议组方和保险库等等.

保险费是在无人清算时使用的，每次有人还款时一部分资金都会进入到保险金库，后面如果某个用户的健康不足且无人清算的情况下，可以使用保险金库进行清算。

利率计算代码:
```rs
/// 每次有 Lend/Borrow/Repay/Withdraw/... 行为时都会计算利息:
/// 核心逻辑就是计算上次行为距今有多久,然后根据时间、利用率计算利息，并将利息存到保险账户、银行账户、费用账户，然后更新每个份额的价值。
pub fn accrue_interest(
    &mut self,
    current_timestamp: i64,
    #[cfg(not(feature = "client"))] bank: Pubkey,
) -> MarginfiResult<()> {
    #[cfg(all(not(feature = "client"), feature = "debug"))]
    solana_program::log::sol_log_compute_units();

    // 计算时间差
    let time_delta: u64 = (current_timestamp - self.last_update).try_into().unwrap();

    // 如果时间差为0，直接返回
    if time_delta == 0 {
        return Ok(());
    }

    // 获取总资产和总债务
    let total_assets = self.get_asset_amount(self.total_asset_shares.into())?;
    let total_liabilities = self.get_liability_amount(self.total_liability_shares.into())?;

    // 更新最后更新时间
    self.last_update = current_timestamp;

    // 如果总资产或总债务为0，记录事件并返回
    if (total_assets == I80F48::ZERO) || (total_liabilities == I80F48::ZERO) {
        #[cfg(not(feature = "client"))]
        emit!(LendingPoolBankAccrueInterestEvent {
            header: GroupEventHeader {
                marginfi_group: self.group,
                signer: None
            },
            bank,
            mint: self.mint,
            delta: time_delta,
            fees_collected: 0.,
            insurance_collected: 0.,
        });

        return Ok(());
    }

    // 计算利率累积状态变化
    let (asset_share_value, liability_share_value, fees_collected, insurance_collected) =
        calc_interest_rate_accrual_state_changes(
            time_delta,
            total_assets,
            total_liabilities,
            &self.config.interest_rate_config,
            self.asset_share_value.into(),
            self.liability_share_value.into(),
        )
        .ok_or_else(math_error!())?;

    debug!(
        "存款份额价值: {}\n债务份额价值: {}\n收集的费用: {}\n收集的保险费: {}",
        asset_share_value, liability_share_value, fees_collected, insurance_collected
    );

    // 更新资产和债务份额价值
    self.asset_share_value = asset_share_value.into();
    self.liability_share_value = liability_share_value.into();

    // 更新收集的费用
    self.collected_group_fees_outstanding = {
        fees_collected
            .checked_add(self.collected_group_fees_outstanding.into())
            .ok_or_else(math_error!())?
            .into()
    };

    // 更新收集的保险费
    self.collected_insurance_fees_outstanding = {
        insurance_collected
            .checked_add(self.collected_insurance_fees_outstanding.into())
            .ok_or_else(math_error!())?
            .into()
    };

    #[cfg(not(feature = "client"))]
    {
        #[cfg(feature = "debug")]
        solana_program::log::sol_log_compute_units();

        // 记录利率累积事件
        emit!(LendingPoolBankAccrueInterestEvent {
            header: GroupEventHeader {
                marginfi_group: self.group,
                signer: None
            },
            bank,
            mint: self.mint,
            delta: time_delta,
            fees_collected: fees_collected.to_num::<f64>(),
            insurance_collected: insurance_collected.to_num::<f64>(),
        });
    }

    Ok(())
}
```

最差情况下的坏账处理，让所有存款人支付损失,其实是将每个人的份额减少:

```rs
/// 将 `loss_amount` 的损失在所有存款人之间分摊，
/// `total_deposit_shares` 保持不变，但存款的总价值减少 `loss_amount`；
pub fn socialize_loss(&mut self, loss_amount: I80F48)->MarginfiResult {
    let total_asset_shares: I80F48 = self.total_asset_sharesint();
    let old_asset_share_value: I80F48 = self.asset_share_valueint();
    let new_share_value = total_asset_shares
        // 旧的资产份额价值乘以总资产份额
        .checked_mul(old_asset_share_value)
        .ok_or_else(math_error!())?
        // 减去损失金额
        .checked_sub(loss_amount)
        .ok_or_else(math_error!())?
        // 除以总资产份额
        .checked_div(total_asset_shares)
        .ok_or_else(math_error!())?;
    // 更新资产份额价值
    self.asset_share_value = new_share_value.into();
    Ok(())
}
```

### 结论

Marginfi 其实是相当灵活的协议,支持的参数非常多已经稳定运行两年多算是 Solend 的平替,用起来也相当方便,也有很多简单的套利机会.

我在用的套利,可能有安全风险:
> 将 Sol 流动性质押获得 JitoSOL,将 JitoSOL 存入 MarginFI后,借 Pyth,再用 Pyth 去 Pyth 官网质押,可以获取5.5%左右 Pyth 本位的利差.