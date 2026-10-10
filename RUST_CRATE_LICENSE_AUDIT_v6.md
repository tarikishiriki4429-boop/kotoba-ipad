# build30 第三者Rustクレート照合表 v6

- 対象：`WebLLM-0.2.82-CDN-audit.js` に内蔵のTokenizer系WASMのビルドパスから検出された23種。
- 23種は**全依存数ではない**。名称の残らない依存、ビルドスクリプト、C/C++・WASM、GPUモデル用WASM等はここに含まれない。
- ライセンス欄は上流のCargo.toml・README・各版のドキュメントを照合した結果。指定版の原文比較まで終わっていない項目は「上流ソースのみ」と表記。
- 「選択する許諾」は双方向の選択ライセンスから現時点で記録したもの。**法令適合の確定を意味しない**。Apache 2.0の全文は従来の `licenses/WebLLM-LICENSE.txt` などに収録。MIT単独は個別原文あり。
- 原文のバージョン差分、追加著作権表示・NOTICEの検証が済んでいない部品もあり、「23件を完全照合」とは表示しないこと。

| クレート | WASM検出版 | 上流の許諾 | 収録・表示する選択肢 | 根拠の範囲 |
|---|---|---|---|---|
| `aho-corasick` | `1.1.3` | MIT OR Unlicense | MIT | 版別資料も確認 |
| `base64` | `0.13.1` | MIT OR Apache-2.0 | Apache-2.0 | 版別資料も確認 |
| `crossbeam-deque` | `0.8.5` | MIT OR Apache-2.0 | Apache-2.0 | 上流ソースのみ |
| `crossbeam-epoch` | `0.9.18` | MIT OR Apache-2.0 | Apache-2.0 | 上流ソースのみ |
| `lazy_static` | `1.5.0` | MIT OR Apache-2.0 | Apache-2.0 | 版別資料も確認 |
| `log` | `0.4.22` | MIT OR Apache-2.0 | Apache-2.0 | 上流ソースのみ |
| `memchr` | `2.7.4` | MIT OR Unlicense | MIT | 版別資料も確認 |
| `once_cell` | `1.19.0` | MIT OR Apache-2.0 | Apache-2.0 | 上流ソースのみ |
| `onig` | `6.4.0` | MIT | MIT | 版別資料も確認 |
| `rand` | `0.8.5` | MIT OR Apache-2.0 | Apache-2.0 | 版別資料も確認 |
| `rand_chacha` | `0.3.1` | MIT OR Apache-2.0 | Apache-2.0 | 版別資料も確認 |
| `rayon` | `1.10.0` | MIT OR Apache-2.0 | Apache-2.0 | 版別資料も確認 |
| `rayon-core` | `1.12.1` | MIT OR Apache-2.0 | Apache-2.0 | 版別資料も確認 |
| `regex` | `1.10.5` | MIT OR Apache-2.0 | Apache-2.0 | 版別資料も確認 |
| `regex-automata` | `0.4.7` | MIT OR Apache-2.0 | Apache-2.0 | 上流ソースのみ |
| `regex-syntax` | `0.8.4` | MIT OR Apache-2.0 | Apache-2.0 | 上流ソースのみ |
| `serde` | `1.0.204` | MIT OR Apache-2.0 | Apache-2.0 | 上流ソースのみ |
| `serde_json` | `1.0.121` | MIT OR Apache-2.0 | Apache-2.0 | 版別資料も確認 |
| `smallvec` | `1.13.2` | MIT OR Apache-2.0 | Apache-2.0 | 版別資料も確認 |
| `spm_precompiled` | `0.1.4` | Apache-2.0 | Apache-2.0 | 版別資料も確認 |
| `tokenizers` | `0.21.1` | Apache-2.0 | Apache-2.0 | 版別資料も確認 |
| `unicode-normalization-alignments` | `0.1.12` | MIT OR Apache-2.0 | Apache-2.0 | 版別資料も確認 |
| `unicode-segmentation` | `1.11.0` | MIT OR Apache-2.0 | Apache-2.0 | 上流ソースのみ |

## 特に注意する別表示

- **aho-corasick / memchr** は `MIT OR Unlicense`。Apache 2.0の対象として一括処理せず、Andrew Gallantの著作権を含むMIT全文を各ファイルに追加した。
- **onig** のRust部分はMIT。リンクする **Oniguruma** は別の再配布ライセンス。いずれもv5に原文を同梱済み。
- **regex-syntax のUnicodeテーブル** は別の **Unicode, Inc. License Agreement** に従う。上流原文をGit blob SHAで照合し、`licenses/Regex-Unicode-data-LICENSE-UNICODE.txt` に全文収録した。
- **spm_precompiled**、**tokenizers** はApache 2.0。

## さらに見つかった依存の候補（23種に含まれない）

上流のCargo.tomlなどに `onig_sys`, `bitflags`, `libc`, `rand_core`, `nom` 等の推移的依存が記載されている。今回のWASMのビルドパスでは名前が拾えなかったため、**実際の組込みやバージョンを断定しない**。

## ライセンス文と参照先

- `licenses/Rust-aho-corasick-MIT.txt`
- `licenses/Rust-memchr-MIT.txt`
- `licenses/Rust-Onig-MIT-LICENSE.txt`, `licenses/Oniguruma-COPYING.txt`
- `licenses/Regex-Unicode-data-ATTRIBUTION.txt`, `licenses/Regex-Unicode-data-LICENSE-UNICODE.txt`
- `licenses/Tokenizers-Rust-LICENSE.txt` / `licenses/Tokenizers-cpp-LICENSE.txt`
- このファイルとセットの `RUST_CRATE_LICENSE_MATRIX_v6.json` に各クレートの上流URLと対象版のdocs.rs参照先がある。

## 未解決

1. 23種全件について、正確な出荷バージョンの `LICENSE`/`NOTICE`/著作権表示の完全突合は未完了。
2. 23種以外の推移的Rust依存、C/C++、JavaScriptバンドル内ポリフィルの網羅チェックは未完了。
3. GPU推論用WASMの完全な由来と第三者表示、モデル変換版の追加条件の確認は未完了。
4. CDNの `+esm` 配信は動的生成のため、将来も同一ハッシュであることは保証できない。

調査資料は参考情報であり、商用配布に関する法律上の完全な保証ではない。
