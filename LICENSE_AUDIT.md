# ライセンス照合記録（2026-10-09）
## 確認できた範囲
WebLLM 0.2.82の上流コミット fa6ead5156d096c00f0543cc98b7841cb82f573f のpackage-lockで、web-runtime 0.24.0-dev1、web-tokenizers 0.1.6、web-xgrammar 0.1.27、loglevel 1.9.2、tslib 2.8.1を確認。これは上流の依存解決記録であり、バイナリの完全な再現ビルド証明ではありません。配布コードのソースマップと内包権利コメントも照合しました。
CDN実体: https://cdn.jsdelivr.net/npm/@mlc-ai/web-llm@0.2.82/+esm
取得JS SHA256: ced0f3e8ee9991087cba5d5892f3c4fd1b223a040552ee1fce5e5a66a5fa6d96

追加した原文: tslib（0BSD）、SentencePiece（Apache 2.0）、DLPack、picojson（BSD 2-Clause）。SentencePieceとDLPackは各上流の固定サブモジュール参照に基づくものです。Hugging Face tokenizers v0.21.0のLICENSEはCargo.tomlの宣言版に対応する補足資料です。実際にコンパイルされた版を確定する証拠ではありません。

## 未解決
- tokenizers-cppの固定ソースにCargo.lockがなく、Rust推移的依存の確定版一覧は取得できませんでした。onig・serde等の宣言から全バイナリの条件充足は断定できません。
- モデル実行WASMの元ソースコミット・全ビルドオプション・SBOMが未確定です。binary-mlc-llm-libsの確認時ツリーは025bcaf3780fa8254f5e5efd3bfea0a5397248f4、対象パスはweb-llm-models/v0_2_80/Qwen2-1.5B-Instruct-q4f16_1-ctx4k_cs1k-webgpu.wasmです。READMEだけでは内包部品を確定できません。
- build26まではモデル/WASMがmain参照でした。build27で固定コミット／リビジョンへの参照に変更しました。固定は全内部部品の義務履行を証明するものではありません。
- QwenのMLC形式モデルについては、モデルカードが示す元モデルのApache 2.0を収録。変換配布物の追加告知の網羅は未確認です。

WebLLM、tokenizers-cpp、SentencePieceの調査対象ルートNOTICEは404でした。存在を創作していません。MLC LLMのLICENSE/NOTICEは上流main時点の補足で、実行WASMとの同一性の証明ではありません。
商用利用を許すトップレベル条件を収集したことと、全内包部品の義務履行を完了したことは異なります。現状は照合途中です。

## 配布範囲と変更
本ZIPはモデル・実行WASM・npm依存本体を同梱しません。テスト依存本体も除外しています。build24では第三者ライセンス表示とテストサーバーを更新し、第三者コード自体は変更していません。販売者情報・独自部分の条件は別紙下書きで、未確定です。取得元とハッシュはLICENSE_SOURCES.json、補足根拠は販売準備フォルダーのevidenceを参照してください。

## build26での継続確認
公開ツリー内の対象モデルWASMはGit blob 049e31c6496bd22e7555f6f5f85057d8907b332d、5,383,844 bytesとして特定しました。これは対象ファイルの識別情報であり、全内部部品のSBOMやCargo.lockの代わりにはなりません。先の未解決事項は解消していません。上流への照会案は未送信です。

## build27で進めた照合（2026-10-10）
実行WASMを固定コミットから実際に取得してSHA256を記録しました。モデルはHugging Face APIでリビジョンを特定し、その版の設定と重み一覧を取得しました。AI_ARTIFACTS.json参照。WebLLM 0.2.82の実配布コードを読み、固定resolve URLを保持する処理と、元モデルのコンテキスト長等を維持できる設定構造を確認しました。重み本体の全ダウンロード・GPU実行はしていません。
上流のMissing Cargo.lock報告: https://github.com/mlc-ai/tokenizers-cpp/issues/96 （確認時Open）。この報告は欠落問題の補足根拠であり、該当npmバイナリの確定部品一覧ではありません。公開ページで解決資料は取得できませんでした。
参照の固定により、AI準備時に旧URLのキャッシュが再利用されず、再ダウンロードが必要になる場合があります。


## 2026-10-10 追加調査（build30販売候補）
- `tokenizers-cpp` の固定ソース d54e3683dc44d37163cf8e77c243b505e12a1616 にあるCMakeLists.txtは、`msgpack` サブモジュールの構築と `msgpack-cxx` のリンクを指定します。サブモジュールコミットは `8c602e8579c7e7d65d6f9c6703c9699db3fb0488` と確認しました。
- msgpack-c の `COPYING` / `LICENSE_1_0.txt` / `NOTICE` を、上流の固定版から取得したテキストに基づき追補しました。**Boost Software License 1.0** で、特定の条件のもと商用利用を許諾しています。
- この結果は依存候補のライセンス文の取りこぼしを一つ減らすものです。web-tokenizers npm配布物のWASMに実際にどのオブジェクトがリンクされたかは確認できていません。
- Rust側は `rust/Cargo.toml` で `tokenizers = 0.21.0 (features=onig), serde=1, serde_json=1` と指定される一方、正確な `Cargo.lock` が欠けています。**この3件だけをRustの全依存一覧として扱いません**。
- モデル実行WASM（binary-mlc-llm-libs）のビルド由来・推移的依存の確定と、MLC変換モデルの追加告知の有無は引き続き未確定。元モデルQwenのApache-2.0文書が存在することだけでは、変換物の追加条件を全証明できません。
- `https://esm.run/@mlc-ai/web-llm@0.2.82` は固定バージョン指定でもCDN配信物が常に同一ビット列になる保証がなく、前回に記録されたjsDelivr CDNのSHA256を**esm.runのハッシュとして流用してはなりません**。
- 本販売候補ZIPに組み込まれる第三者のJS/WASM/モデル本体はありません（利用時に外部取得）。この事実は**利用時に取得する第三者配布物のライセンス義務がないことを意味しません**。
- 商用利用許可の確認と、第三者ライセンスの『完全照合』は別です。現時点の判定は**部分的に照合済み・完全照合は保留**。証拠未取得の項目は完了と判定しません。


## 2026-10-10 SentencePiece内包ライブラリの追加監査
固定上流コミット `f2219b53e24ff5deee4cacdc2d0ca3074e529a07` を再帰的に調べ、`third_party` 以下にAbseil (Apache-2.0)、darts_clone (BSD-3-Clause系)、esaxx (MIT系)、protobuf-lite (BSD-3-Clause系) が存在すると確認。上流に置かれた各LICENSEを確認し、darts_clone/esaxx/protobuf-liteのライセンス全文を追補。Abseilは既に収録したApache-2.0の標準本文を参照する形で注記した。

- Abseil: https://github.com/google/sentencepiece/blob/f2219b53e24ff5deee4cacdc2d0ca3074e529a07/third_party/absl/LICENSE
- darts_clone: https://github.com/google/sentencepiece/blob/f2219b53e24ff5deee4cacdc2d0ca3074e529a07/third_party/darts_clone/LICENSE
- esaxx: https://github.com/google/sentencepiece/blob/f2219b53e24ff5deee4cacdc2d0ca3074e529a07/third_party/esaxx/LICENSE
- protobuf-lite: https://github.com/google/sentencepiece/blob/f2219b53e24ff5deee4cacdc2d0ca3074e529a07/third_party/protobuf-lite/LICENSE

上流での存在を示す資料であって、配信されたWASMやJSに各依存が実際に含まれることの証拠ではありません。ビルド時に未使用のコードが除外される可能性があり、逆に依存が追加で含まれる可能性もあります。Rust Cargo.lock、WebLLMとモデルの実配信バイナリの確定SBOMは依然として不足しているので **第三者ライセンスの完全照合を完了したとは扱わない**。


## 追加監査（2026-10-10：v3）

- WebLLM 0.2.82の上流 `package-lock.json` を確認。`@mlc-ai/web-runtime` 0.24.0-dev1 / `@mlc-ai/web-tokenizers` 0.1.6 / `@mlc-ai/web-xgrammar` 0.1.27 / `loglevel` 1.9.2 / `tslib` 2.8.1 のnpm integrityを `RUNTIME_LOCK_EVIDENCE.json` に保存。これらは**npm tarballのSRI**でありCDN成果物の検証ではない。
- MLC変換Qwenの固定リビジョンのREADMEから、元モデルを `Qwen/Qwen2.5-1.5B-Instruct` と確認。元モデルのApache-2.0を再確認。一方、変換版の独立LICENSE・追加NOTICEは確認できず。詳細 `MODEL_ATTRIBUTION.md`。
- `esm.run` が提供するJSバイト列とその動的import先を監査環境から取得できなかったため、**CDN完全照合は未了**。
- WebLLM上流のnpmロック取得によりバージョンの特定が進んだが、Tokenizers Rustの **Cargo.lock欠落・WASMビルドSBOM欠落** の問題は未解決。
- 対応ソース：`RELEASE_EVIDENCE.md` に固定リンクと検査範囲を記載。

## 2026-10-10 CDN実測記録の追記（販売候補v4）

ユーザーがGitHub Pages上で実行した診断ツールから、`https://esm.run/@mlc-ai/web-llm@0.2.82` が `https://cdn.jsdelivr.net/npm/@mlc-ai/web-llm@0.2.82/+esm` に到達し、HTTP 200、6038155 bytes、SHA256 `ced0f3e8ee9991087cba5d5892f3c4fd1b223a040552ee1fce5e5a66a5fa6d96` だったとの結果を受領・保管しました。このURLは販売候補のindex.html内の指定URLと一致します。

この記録はブラウザから取得した入口JSの観測結果であり、監査者側での同一ファイルの独立検証、第三者コードの全内包ライセンス表示、WASM/Rust依存、モデル重み全体の検証を完了したことを意味しません。`import_specifiers=[]` は解析パターンに一致するimportが発見されなかったという意味に限られます。


## 2026-10-10 配信JSの実ファイルから追加照合（v5）
iPadで保存された6,038,155バイトのCDN JSをローカルSHA256で照合し、内蔵WASMが2個（727,906B・3,479,304B）あることを確認。Rust registryのパスから23種類のクレートとバージョンを抽出した。OnigurumaのCOPYINGを追加。全バイナリSBOM・全ライセンス完全照合は未完了。詳細 CDN_JS_WASM_AUDIT.md。


## v6追補（2026-10-10）
WASMに残存するパスから確認したRustクレート23種のライセンス種別を上流資料で照合し、`RUST_CRATE_LICENSE_AUDIT_v6.md` / `RUST_CRATE_LICENSE_MATRIX_v6.json` に記録した。aho-corasickとmemchrがMIT OR UnlicenseでありApache2選択ではないことを明記し、MIT原文を追加。regex-syntaxのUnicodeテーブル用著作権・参照元を追加。未検出依存の存在可能性と、GPU用WASMの完全照合が残る。現段階では販売可能の最終判定にしない。


## v7追補
JavaScript CDNバンドルに痕跡が見えるBuffer/process/base64-js/IEEE754について、著作権・ライセンス原文を4点追補。GitHub上流のblob SHAを照合した。しかし使用されたnpm版とのコード完全一致およびGPU用WASMの完全な部品構成は依然未確定。
