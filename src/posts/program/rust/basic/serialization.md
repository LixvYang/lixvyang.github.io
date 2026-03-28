---
icon: logos:rust
date: 2026-03-26
isOriginal: true
headerDepth: 4
category:
  - rust
tag:
  - rust
---

Rust中的序列化语法糖是多么方便，相对Go的各种Marshal，Unmarshal和tag。

<!-- more -->

# Rust 序列化

其实看这个[课程](https://github.com/microsoft/RustTraining/blob/main/rust-patterns-book/src/ch11-serialization-zero-copy-and-binary-data.md)即可

serde （序列化/反序列化）是 Rust 的通用序列化框架。它将数据模型 （你的结构体）与格式 （JSON、TOML、二进制）分离：

程序中只需要: 

```
cargo add serde --features derive
```

然后你的Rust程序就可以自动序列化，从字节传入给结构体自动解析了：

```rust
use serde::{Serialize, Deserialize};

#[derive(Debug, Serialize, Deserialize)]
struct ServerConfig {
    name: String,
    port: u16,
    #[serde(default)]                    // Use Default::default() if missing
    max_connections: usize,
    #[serde(skip_serializing_if = "Option::is_none")]
    tls_cert_path: Option<String>,
}

fn main() -> Result<(), Box<dyn std::error::Error>> {
    // Deserialize from JSON:
    let json_input = r#"{
        "name": "hw-diag",
        "port": 8080
    }"#;
    let config: ServerConfig = serde_json::from_str(json_input)?;
    println!("{config:?}");
    // ServerConfig { name: "hw-diag", port: 8080, max_connections: 0, tls_cert_path: None }

    // Serialize to JSON:
    let output = serde_json::to_string_pretty(&config)?;
    println!("{output}");

    // Same struct, different format — no code changes:
    let toml_input = r#"
        name = "hw-diag"
        port = 8080
    "#;
    let config: ServerConfig = toml::from_str(toml_input)?;
    println!("{config:?}");

    Ok(())
}
```
当然属性有很多，用的时候再去查也没问题
```
Attribute  属性	Level  等级	Effect  影响
rename_all = "camelCase"	Container  容器	Rename all fields to camelCase/snake_case/SCREAMING_SNAKE_CASE
将所有字段重命名为驼峰式/蛇形式/尖叫蛇形式
deny_unknown_fields	Container  容器	Error on unexpected keys (strict mode)
```

这里的序列化与反序列化也可以用bincode等其他的编码格式 只要支持即可。

另外一点是这里的序列化也支持零拷贝，也就是直接从输入缓冲区借用内存，避免深拷贝。

练习写一个自定义序列化器反序列化

```rust
use serde::{Deserialize, Deserializer, Serialize, Serializer};
use std::fmt;

#[derive(Debug, Clone, PartialEq)]
struct HumanDuration(std::time::Duration);

impl HumanDuration {
    fn from_str(s: &str) -> Result<Self, String> {
        let s = s.trim();
        if s.is_empty() { return Err("empty duration string".into()); }

        let (num_str, suffix) = s.split_at(
            s.find(|c: char| !c.is_ascii_digit()).unwrap_or(s.len())
        );
        let value: u64 = num_str.parse()
            .map_err(|_| format!("invalid number: {num_str}"))?;

        let duration = match suffix {
            "s" | "sec"  => std::time::Duration::from_secs(value),
            "m" | "min"  => std::time::Duration::from_secs(value * 60),
            "h" | "hr"   => std::time::Duration::from_secs(value * 3600),
            "ms"         => std::time::Duration::from_millis(value),
            other        => return Err(format!("unknown suffix: {other}")),
        };
        Ok(HumanDuration(duration))
    }
}

impl fmt::Display for HumanDuration {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        let secs = self.0.as_secs();
        if secs == 0 {
            write!(f, "{}ms", self.0.as_millis())
        } else if secs % 3600 == 0 {
            write!(f, "{}h", secs / 3600)
        } else if secs % 60 == 0 {
            write!(f, "{}m", secs / 60)
        } else {
            write!(f, "{}s", secs)
        }
    }
}

impl Serialize for HumanDuration {
    fn serialize<S: Serializer>(&self, serializer: S) -> Result<S::Ok, S::Error> {
        serializer.serialize_str(&self.to_string())
    }
}

impl<'de> Deserialize<'de> for HumanDuration {
    fn deserialize<D: Deserializer<'de>>(deserializer: D) -> Result<Self, D::Error> {
        let s = String::deserialize(deserializer)?;
        HumanDuration::from_str(&s).map_err(serde::de::Error::custom)
    }
}

#[derive(Debug, Deserialize, Serialize)]
struct Config {
    timeout: HumanDuration,
    retry_interval: HumanDuration,
}

fn main() {
    let json = r#"{ "timeout": "30s", "retry_interval": "5m" }"#;
    let config: Config = serde_json::from_str(json).unwrap();

    assert_eq!(config.timeout.0, std::time::Duration::from_secs(30));
    assert_eq!(config.retry_interval.0, std::time::Duration::from_secs(300));

    let serialized = serde_json::to_string(&config).unwrap();
    assert!(serialized.contains("30s"));
    println!("Config: {serialized}");
}
```
