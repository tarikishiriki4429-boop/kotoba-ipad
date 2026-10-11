# 2026-10-11 最新整理（販売前一括反映候補・build37）

**この文書は販売前監査の証拠と残課題の記録であり、販売の法的許可証ではありません。** 旧監査履歴に「未特定」と書かれた項目は当時の状態を示します。この先頭の更新記録を優先してください。

- A01：build37の外部取得先を確認。公開サイトとの同期は最終デプロイ後に検査する。
- A02：対象GPU WASMのGit blobとMLC公式PR #158が一致、MLC 4084e7f/TVM c8515e1を特定済み。
- A03：TVM-FFI `ae346ec...`、DMLC-Core `3031e4a...` の公式LICENSE、TVM-FFI NOTICEを確認済み。Emscripten/muslは許諾済みの既知候補の原文を収録。完全な再現ビルド／全静的依存の網羅は未確認。追加告知を反映する準備が完了。
- A04：Qwen2.5-1.5B-Instructの元重みはApache-2.0。MLC変換版は固定revison `9bd564b...`、変換版の独立LICENSE・追加商用禁止文書は調査範囲で見つからない。追加条件が存在しない絶対証明ではない。
- A05：固定モデル設定と重量シャードを確認。実機のダウンロード、生成、再起動後の利用は未検証（販売前に必須）。
- A06：Safari取得のWebLLM 0.2.82 JS 6,038,155 bytes / SHA256 `ced0f3e8...`、内蔵WASM2個のSHA256確認。全バンドルの再現SBOMは未確定。既知部品の権利表示を補強済み。
- A07：2026-10-10に Safari から `esm.run` が jsDelivr `+esm` に到達、SHA256の保存JSとの一致を確認済み。恒久的同一性保証ではないので販売直前に再確認。
- A08：buffer/process/base64-js/ieee754の候補版と許諾（MIT / BSD）を確認。バンドルソースコード完全同一の証拠ではない。
- A09：WebLLMトークナイザーWASMから`.cargo/registry/src` 23種の版を再抽出し、過去の監査一覧と一致。`hashbrown 0.15.2`は`/rust/deps/`由来の別枠。完全なCargo.lockがないため、未知の非検出依存が絶対にないと断定しない。
- A10：検出23種の指定版ライセンス原文48ファイルを1つの追補資料に整理し、公開用に準備済み。
- A11：REVIEW5件は記法差と検証済み。商用利用禁止の検出ではない。
- A12：TVM-FFI、DMLC-Core、Emscripten、SentencePieceなどの具体的候補を照合済み。見つからない可能性の一般論だけで無限に未完了としないが、全依存の絶対保証はしない。
- A13：Oniguruma COPYING は上流6.9.8/6.9.9と一致。onig 6.4.0のMITおよびonig_sys 69.8.1のMIT原文収録。実Cコードの完全なコミット確定は未了。
- A14：SentencePiece/msgpack/darts_clone/esaxx/protobuf-liteなどの既知許諾文を既存配信に収録済み。実静的リンク範囲は完全には証明できていない。
- A15：既知のLICENSE/NOTICEを最終配信候補に統合。これが公開サイトで読めることはデプロイ後の検査待ち。
- A16：旧公開版はユーザーによる2026-10-11の37/37照合合格。**今回追加するファイルは公開後に新検査を要する**。
- A17：Rust-Onig／Abseilの正確な原文とAbseilリンクはGitHub mainに反映済み。今回の追加分はNetlify反映待ち。
- A18：最新結果を先頭に追記する案が完成。GitHub反映後、公開版のSHA256検査を行う。

**販売前ゲート**：①必要ライセンス資料を公開、②実際のURLと監査ファイルのハッシュ一致、③iPadで本文保存・復元・AIが動く、④note価格・返金・購入前説明・特商法表記を最終確認。これらが未了なら「販売準備完了」としない。対象ファイルを更新した場合は再照合する。

---

# 2026-10-11 第3回調査補足（未公開・正式販売承認ではない）

- **A07 既存実測を再評価**：`CDN_CAPTURE_2026-10-10.json` に、Safariによる `esm.run/@mlc-ai/web-llm@0.2.82` 取得のHTTP 200、最終URL `cdn.jsdelivr.net/npm/@mlc-ai/web-llm@0.2.82/+esm`、6,038,155 byte、SHA256 `ced0f3e8ee9991087cba5d5892f3c4fd1b223a040552ee1fce5e5a66a5fa6d96` が保存されている。保存したJSの再計算ハッシュと一致しており、**10月10日の入口実体同一性は確認済み**。将来の永続的同一性や、最終販売前の再計測を確認済みとはしない。jsDelivr公式は `esm.run` を試験的用途の入口とし、本番はメインCDNを推奨。`https://cdn.jsdelivr.net/npm/@mlc-ai/web-llm@0.2.82/+esm` に直接指定変更する選択肢は一行だけの任意パッチとして別途用意。変更後はWebGPUの実機試験が必要。
- **A04 固定変換Qwen**：MLC配布版は固定9bd564b、元QwenはApache-2.0。モデルカードは元モデルとMLC-LLM/WebLLM用途を示し、当該ツリーに独立LICENSEが見当たらない。**商用禁止・追加条件の存在を確認していない**ことと**追加条件が絶対に存在しない証明**を区別。モデル重み自体はKotobaのサーバで再配布せず利用者ブラウザから固定revを取得。
- **A05**：約880MB・30シャードの固定モデルの出典・構成確認はライセンス上の一次資料として十分な状態。全シャードの再ハッシュは販売の権利判断に機械的に必須ではない。実機でのダウンロード・推論検証は販売品質チェックで別に必要。
- **A09/A13 追加発見**：`onig 6.4.0`のCargo.tomlは `onig_sys 69.8.1` (MIT) と `bitflags 1.3` (MIT/Apache-2.0)に依存。追加のMIT原文2件を予防的に収録。WASMに見えないから未採用と断定せず、逆にビルド指定だけで正確な実リンクパッチ版と断定しない。
- **A13 原文の一致**：既存 `Oniguruma-COPYING.txt` は公式 Oniguruma v6.9.8/v6.9.9双方と同一のGit blob `ee4d7cf05501ee338de85b1e92df869c1e8d5bbf`。Rust-Onig 6.4.0の指定版LICENSEはGitHub mainに反映済み。C実リンク元の版は引き続き別確認。
- **A03/A06/A12**：上流の採用版・許諾は大幅に進展したが、正確なCargo.lock/完全なリンク部品一覧は未入手。具体的な未検出依存の法的影響と、告知が足りているかで終結判断する。無限の潜在的依存可能性のみを理由に販売が永遠にできない、という基準にはしない。
- **GitHub/Netlifyは更新していない**：この第3回資料はレビュー用候補。元アプリ本文の書き換えや原稿データへの操作は一切ない。

---

# 2026-10-11 追加調査（第2回）：A03/A04/A07/A09

- **A03（Emscripten/musl）：原文版差を修正。** 上流の3.1.56、3.1.74、4.0.0、4.0.10、4.0.20タグの Emscripten LICENSE はすべて同一のGit blob（`70cabe388d27da221bd769c50b427a35354f4f1d`）。musl COPYRIGHT も当該5タグで同一Git blob（`c1628e9ac84f927fe791124ec172fb61c760bb9b`）。調査開始時に採取したupstream mainのmuslには、著作権者名・位置の違いがあり、そのまま指定版原文と呼ぶのは不適切。配布候補を上記5版と一致するmusl原文に更新した。**しかし実際のemccのSDK版は未確認。**
- **A04（MLC Qwen）：部分確認のまま。** 元モデルQwen/Qwen2.5-1.5B-InstructのApache 2.0、および変換版9bd564bのREADMEにある `base_model` と MLC-LLM/WebLLM用途案内を確認。固定モデルリポジトリのファイル一覧に独立LICENSEはなく、今回の資料から変換モデル独自の商用禁止を発見していないが、無条件の利用許可と断定しない。モデル重みはKotoba Writer配信サーバでホストせず、ユーザーのブラウザがHFから直接取得する。元モデルへの帰属表示は継続。
- **A07（実配信JS）：部分確認のまま。** Kotoba Writerは `esm.run` を使い、jsDelivrは同ホストを運営している。ただし公式サイトはプロトタイピング用と説明し、本番はメインCDNを推奨。保存済みの `+esm` バンドルとのレスポンスハッシュはまだ比較していない。必要なら実バイト列を比較してからURL変更の適否を判断する。
- **A09（hashbrown）：外部Cargoクレート24種目という断定を撤回。** 内蔵Tokenizer WASMの観測パスは `/rust/deps/hashbrown-0.15.2/src/raw/mod.rs`。従来23件の `.cargo/registry/src/...` と区別し、Rustツールチェーン由来の可能性が高い部品として補足監査する。hashbrown 0.15.2のMIT/Apache-2.0許諾は確認済み。
- **公開反映：未実施。** この補足および最新6原文はレビュー用の候補であり、GitHub/Netlifyの現在の公開版には反映されていない。A03/A04/A06/A07/A09/A12/A15を全面確認済みにはしない。

---

# 2026-10-11 A03追加調査（販売前・未最終判定）

ここが現在の追加判定です。以下に続く過去の監査記録は当時の履歴であり、未確定と書かれた古い項目はこの補足と突き合わせて読むこと。

- **A03 固定採用版：根拠を確認。** TVM `c8515e1ddfaf4d1afff916c484e68e1513631dd6` の `3rdparty/tvm-ffi` は `ae346ec92a3c386f1376064ae086aae72947c329`、`3rdparty/dmlc-core` は `3031e4a61a98f49f07a42cfdec6242340fb2fd8c`（ユーザー実機GitHubツリー確認を含む）。それぞれApache-2.0。TVM-FFIはNOTICEあり、DMLC-Coreの当該コミットには独立NOTICEが見つからない。
- **A03/A15 原文6件：追加候補準備。** TVM-FFIのLICENSE/NOTICE、DMLC-CoreのLICENSE、Emscripten LICENSE、Emscripten musl COPYRIGHT、hashbrown MIT。すべて上流Git blob SHAと一致。**GitHub/Netlify反映と公開検査を経てからA15のこの範囲を完了にする。**
- **A03 ランタイム内包は未確定。** 固定版のWeb Makefileが `emcc` を使う。WASM実物に `emscripten_notify_memory_growth` およびWASI importがある。正確なEmscripten/LLVM SDKバージョンは未特定。muslやlibc++/compiler-rtの実際のリンク対象の全列挙も未了。musl/Emscriptenの原文は現行上流mainを照合した安全側の補足で、当時の指定版の照合ではない。
- **A09/A06 hashbrown 0.15.2：許諾根拠あり、由来区分は要評価。** Tokenizer WASMの `/rust/deps/hashbrown-0.15.2/...` を検出。GitHub 0.15.2リリース版Cargo.tomlはMIT OR Apache-2.0。指定版MIT原文も収録候補。ほかに未検出の依存がないとは主張しない。
- **A04：元のQwen2.5-1.5B-InstructはApache-2.0。** 変換版のMLCモデルカードは元モデルとWebLLM向け利用を説明するが、固定revision内の追加LICENSE/NOTICEや独立の追加条件をすべて確定したわけではない。利用者ブラウザがMLC配布元からモデル重みを取得する構造。商用利用禁止を発見したという意味ではない。
- **A16：旧37/37の配信同一性検査は、検査当時の公開ファイルが対象。** 今回新規追加予定の6ファイルはまだ検査していない。

公式根拠は「A03_追加調査報告.md」と「第三者義務_完了条件一覧.md」を参照。重要な第三者義務が不明なまま「法的適合・販売承認済み」とはしない。

---

# 2026-10-11 補足：A16実機合格・A03実物解析・A17原文更新候補

この冒頭は2026-10-11現在の監査結果です。以降の旧監査履歴の「未確定」「未実施」は記録当時の状態を示すため、解決済みの箇所はこの冒頭の最新判定を優先します。ここに掲載された情報はライセンス全項目の法的適合を保証するものではありません。

- **A16（対象版の公開配信確認）：完了。** ユーザーが2026-10-11 06:10:58（JST）にNetlify `https://clinquant-fudge-11ed4e.netlify.app` で37ファイルのブラウザ一括検査を実行し、37件一致／不一致・失敗0件という結果を受領。これは当時の公開ファイルが検査ツール登録値と一致した証拠であり、後に追加するファイルの確認や、ライセンス義務全般の充足証明ではない。
- **A02：元ソース特定は完了。** MLC公式 [binary-mlc-llm-libs PR #158](https://github.com/mlc-ai/binary-mlc-llm-libs/pull/158) の対象WASMとアプリ固定参照版はGit blob `049e31c6496bd22e7555f6f5f85057d8907b332d` で一致。PRに記載されたコンパイル元はMLC-LLM `4084e7fe7532fb932810d8b707f2d760eefd0dea`、TVM `c8515e1ddfaf4d1afff916c484e68e1513631dd6`。すべてのリンク部品・フラグを証明するものではない（A03で継続）。
- **A03：一部確認済み、監査継続。** 実GPU用WASM 5,383,844バイト、SHA-256 `6cd9f132ad258d2017291bb62e955e337f8ae4af74650f4b1ea5a803a7cec538` は固定参照の記録と一致。TVM-FFIの関数・参照パス、DMLC-Core、DLPack、picojson等の痕跡を解析。固定TVMの `web/emcc/wasm_runtime.cc` に `#define TVM_FFI_USE_LIBBACKTRACE 0` があるため、そのコンパイル経路ではlibbacktraceを無効にしていると判断。TVM-FFI / DMLC-Coreの正確なgitlinkリビジョン、必要NOTICE・Cランタイム由来の追加部品は引き続き照合。
- **A17：指定版原文は取得済み、公開反映確認待ち。** `onig` 6.4.0 の `rust-onig/rust-onig` タグ `v6.4.0` の `LICENSE.md` に一致する `licenses/Rust-Onig-MIT-LICENSE.txt` と、SentencePiece固定コミット内Abseil `third_party/absl/LICENSE` に一致する `licenses/Abseil-LICENSE.txt` を追加候補として準備した。`Oniguruma-COPYING.txt` は公式公開原文とのGit blob一致を確認、変更不要。更新ファイルをGitHubへ追加した事実は公開配信で別途確認する。
- **A18：この節で監査結果を追記。** 公開版に反映されたかはGitHub commitおよびNetlify表示で別に確認する。現行build37、Service Workerキャッシュ世代v38、AI worker v37に変更なし。

**ライセンス追加・修正公開後にはA16の旧37件検査をそのまま再利用せず、更新したファイル・新しいリンクを含めて再照合する。**

---

# 無料公開版・ライセンス状況（2026-10-10）

アプリ本体は無料で公開する方針に変更。元モデルQwen2.5-1.5B-InstructのApache-2.0、WebLLM、実行基盤・トークナイザーの一部ライセンス文とNOTICEを過去の監査により収録済みです。
ただし、配信されたGPU実行用WASMとWebLLMの全推移的依存、重み・変換モデルの完全なビルド由来・追加告知の有無は独立して確定できていません。「完全照合済み」「すべてのライセンス義務に適合」とは表示できません。無料公開でも各ライセンス義務は残ります。
公開後も必要な原文・権利表示の追補と上流への照会を継続してください。
以下は監査履歴であり、旧「販売候補」等の表現は現在の販売状況を表しません。

---

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
