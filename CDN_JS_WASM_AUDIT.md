# Kotoba Writer build30 — CDN JavaScript / 内蔵WASM監査（2026-10-10）

## 判定
**ファイル同一性と新しい内包依存の識別に成功。第三者ライセンスの完全照合は未了。**

## 入力ファイルについて
- 実際にiPadから保存された `WebLLM-0.2.82-CDN-audit.js` をローカルで読んだ。JavaScriptは実行していない。
- サイズ `6,038,155` bytes。独立SHA-256再計算 `ced0f3e8ee9991087cba5d5892f3c4fd1b223a040552ee1fce5e5a66a5fa6d96`。
- 前回診断時のSHA-256と完全一致。
- jsDelivr `+esm` 経由で取得したWebLLM 0.2.82をバンドルした配信物。
- JSテキスト中に `Copyright`、`SPDX`、`@license` という表記は見つからなかった。これは権利の不在を意味しない（圧縮・バンドル時にコメントが削除された可能性）。既存ZIPのNOTICEだけで完全にカバーしているとの証明にもならない。

## JavaScriptの内部にあるWebAssembly
| 推定用途 | WASM実サイズ | SHA-256 |
|---|---:|---|
| XGrammar関連 | 727,906 bytes | `80eb86a9e61e8148a45d60973ec29ffb85077a3e42cee8f042e1452fffd63774` |
| Tokenizers / SentencePiece / Oniguruma関連 | 3,479,304 bytes | `f261cfa549b857d50c67d052be66814beefce2ec17fdc96370a051a03ad66665` |

どちらも `data:application/octet-stream;base64,` としてJavaScript内に埋め込まれていた。WebLLM 0.2.82をブラウザで取得する際に**同時に取得される第三者WASM**である（ZIP本体には含まない）。
モデル用GPU WASMは別の配信URLにあり、この二つとは区別する。

## Rust依存のバージョン特定
2つ目のWASMの `.cargo/registry/src/` というビルドパスから **23 件の異なるクレート名・バージョン**を確認。特に `tokenizers 0.21.1` / `onig 6.4.0` / `serde 1.0.204` / `serde_json 1.0.121` が見つかった。
全文は `RUST_CRATE_PATH_EVIDENCE.json` に記録。

**重要:** 検出できた23クレートが依存の全件とは限らない。埋め込まれたビルドパスの抽出であり、`Cargo.lock`と同一の証拠にはならない。Rustビルドの再現性／厳密な使用ライセンスの全列挙はまだ未完了。

## 第三者表示で追加が必要と分かった点
- `Oniguruma` はWASM内のエラーテキストで確認。原プロジェクト `kkos/oniguruma` の `COPYING` は独自のBSD型再配布条項。今回のZIPに同条項を追加（`licenses/Oniguruma-COPYING.txt`）。
- `Rust-Onig`ラッパーはMITライセンスだが、内部のOniguruma Cライブラリには**別のライセンス**が適用される。ライセンスを同一視しないこと。
- Buffer / process / base64 / IEEE754ポリフィルと思われるバンドルコードの痕跡があるが、現時点では出所・具体的な版・全利用条件との一致が未確定。追加調査項目。
- Rustクレート23種類のライセンスを**個別に全件照合する作業が残る**。版の特定だけでは権利表示の履行にならない。

## 未解決（販売判断前）
1. Rustクレート（上記23件＋ビルドパスが残らない部品）の全ライセンス、著作者表示、NOTICEの確認。
2. JavaScriptに内包されたバンドルポリフィルの出所とそのライセンス、ならびに内蔵WASMの他のC/C++サードパーティー部品の照合。
3. 別途ダウンロードされるモデル用GPU WASMの完全な依存内容と、モデル変換版の追加条件有無。
4. 実配信JSはjsDelivr `+esm` の動的生成で同じURLでも将来変化する可能性がある。アプリにはCDN応答のSHA検証は組み込まれていない。

## 参考資料
- https://github.com/kkos/oniguruma/blob/master/COPYING
- https://github.com/rust-onig/rust-onig/blob/main/LICENSE.md
- https://github.com/mlc-ai/tokenizers-cpp/issues/96
- https://github.com/mlc-ai/web-llm/blob/fa6ead5156d096c00f0543cc98b7841cb82f573f/package-lock.json

**法律判断の保証ではない。販売用ZIPへの追加資料の同梱は調査上の前進だが、全必要条件を満たしたことの証明ではない。**
