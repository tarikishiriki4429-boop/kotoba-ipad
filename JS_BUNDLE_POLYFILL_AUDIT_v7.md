# build30 CDN +esm JavaScriptのポリフィル関連照合（v7）

調査対象：購入者のiPadから保存されたWebLLM 0.2.82 JavaScript、SHA256 `ced0f3e8ee9991087cba5d5892f3c4fd1b223a040552ee1fce5e5a66a5fa6d96`。

JavaScriptテキスト中に、Buffer・processブラウザポリフィル・base64-js・IEEE754互換コードとみられる実装が含まれる。以下の公開プロジェクトの著作権・ライセンス表示を予防的に追加した。

| 候補 | 上流 | 条件 | 原文の照合 |
|---|---|---|---|
| buffer | https://github.com/feross/buffer | MIT + Node.js由来部分の表示 | `licenses/Bundled-buffer-MIT-LICENSE.txt` (git blob照合) |
| process | https://github.com/defunctzombie/node-process | MIT | `licenses/Bundled-process-MIT-LICENSE.txt` (git blob照合) |
| base64-js | https://github.com/beatgammit/base64-js | MIT | `licenses/Bundled-base64-js-MIT-LICENSE.txt` (git blob照合) |
| ieee754 | https://github.com/feross/ieee754 | BSD 3-Clause | `licenses/Bundled-ieee754-BSD-LICENSE.txt` (git blob照合) |

**重要な限定：** これはソース上の実装パターンとライブラリ名から特定した有力候補。バンドル生成時に使用された各npmパッケージの確定バージョン・ソースとJS中のコード片との1対1の完全一致を証明していない。形式上の不足を補完するための候補原文の追加であり、バンドル全体の権利確認が終わったわけではない。

GPU用WASMの全内包部品と、Rust 23種類以外の推移的依存は引き続き未解決。
