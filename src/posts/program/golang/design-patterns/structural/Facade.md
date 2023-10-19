---
icon: carbon:character-patterns
date: 2023-10-19
isOriginal: true
category:
  - tutorial
tag:
  - golang
  - design-patterns
---

外观模式(Facade)隐藏系统的复杂性,并向客户端提供了一个客户端可以访问系统的接口。这种类型的设计模式属于结构型模式,它向现有的系统添加一个接口,来隐藏系统的复杂性。

<!-- more -->

# 外观模式

## 定义

外观模式提供了一个高层次的接口,使子系统更易于使用。外观模式用于定义一个高层接口,这个接口使得这一子系统更加容易使用。

- 简化了系统接口,外观模式提供了一个更高级、更抽象的接口,使得接口使用起来更容易。
- 更好地划分访问层次,外观模式可以更清楚地定义访问系统不同层次的入口。
- 符合迪米特法则,减少系统间的依赖。
- 提高灵活性,可以在不影响其他模块的情况下增加或者修改系统。

## 用法

人们很容易低估使用信用卡订购披萨时幕后工作的复杂程度。 在整个过程中会有不少的子系统发挥作用。 下面是其中的一部分：

- 检查账户
- 检查安全码
- 借记/贷记余额
- 账簿录入
- 发送消息通知

在如此复杂的系统中， 可以说是一步错步步错， 很容易就会引发大的问题。 这就是为什么我们需要外观模式， 让客户端可以使用一个简单的接口来处理众多组件。 客户端只需要输入卡片详情、 安全码、 支付金额以及操作类型即可。 外观模式会与多种组件进一步地进行沟通， 而又不会向客户端暴露其内部的复杂性。

```go

type WalletFacade struct {
    account      *Account
    wallet       *Wallet
    securityCode *SecurityCode
    notification *Notification
    ledger       *Ledger
}

func newWalletFacade(accountID string, code int) *WalletFacade {
    fmt.Println("Starting create account")
    walletFacacde := &WalletFacade{
        account:      newAccount(accountID),
        securityCode: newSecurityCode(code),
        wallet:       newWallet(),
        notification: &Notification{},
        ledger:       &Ledger{},
    }
    fmt.Println("Account created")
    return walletFacacde
}

func (w *WalletFacade) addMoneyToWallet(accountID string, securityCode int, amount int) error {
    fmt.Println("Starting add money to wallet")
    err := w.account.checkAccount(accountID)
    if err != nil {
        return err
    }
    err = w.securityCode.checkCode(securityCode)
    if err != nil {
        return err
    }
    w.wallet.creditBalance(amount)
    w.notification.sendWalletCreditNotification()
    w.ledger.makeEntry(accountID, "credit", amount)
    return nil
}

func (w *WalletFacade) deductMoneyFromWallet(accountID string, securityCode int, amount int) error {
    fmt.Println("Starting debit money from wallet")
    err := w.account.checkAccount(accountID)
    if err != nil {
        return err
    }

    err = w.securityCode.checkCode(securityCode)
    if err != nil {
        return err
    }
    err = w.wallet.debitBalance(amount)
    if err != nil {
        return err
    }
    w.notification.sendWalletDebitNotification()
    w.ledger.makeEntry(accountID, "debit", amount)
    return nil
}
```


## 总结

外观模式通过提供一个简单的接口用来访问复杂系统,减少系统复杂性,提高灵活性,使客户端和子系统松耦合。是一种常用的结构型设计模式。
