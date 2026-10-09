# ライセンス照合記録（2026-10-09）
## 確認できた範囲
WebLLM 0.2.82の上流コミット fa6ead5156d096c00f0543cc98b7841cb82f573f のpackage-lockで、web-runtime 0.24.0-dev1、web-tokenizers 0.1.6、web-xgrammar 0.1.27、loglevel 1.9.2、tslib 2.8.1を確認。これは上流の依存解決記録であり、バイナリの完全な再現ビルド証明ではありません。配布コードのソースマップと内包権利コメントも照合しました。
CDN実体: https://cdn.jsdelivr.net/npm/@mlc-ai/web-llm@0.2.82/+esm
取得JS SHA256: ced0f3e8ee9991087cba5d5892f3c4fd1b223a040552ee1fce5e5a66a5fa6d96

追加した原文: tslib（0BSD）、SentencePiece（Apache 2.0）、DLPack、picojson（BSD 2-Clause）。SentencePieceとDLPackは各上流の固定サブモジュール参照に基づくものです。Hugging Face tokenizers v0.21.0のLICENSEはCargo.tomlの宣言版に対応する補足資料です。実際にコンパイルされた版を確定する証拠ではありません。

## 未解決
- tokenizers-cppの固定ソースにCargo.lockがなく、Rust推移的依存の確定版一覧は取得できませんでした。onig・serde等の宣言から全バイナリの条件充足は断定できません。
- モデル実行WASMの元ソースコミット・全ビルドオプション・SBOMが未確定です。binary-mlc-llm-libsの確認時ツリーは025bcaf3780fa8254f5e5efd3bfea0a5397248f4、対象パスはweb-llm-models/v0_2_80/Qwen2-1.5B-Instruct-q4f16_1-ctx4k_cs1k-webgpu.wasmです。READMEだけでは内包部品を確定できません。
- アプリのモデル/WASM参照は上流mainを使用しており、将来同じ内容が配信される保証はありません。販売版では検証済み配信物の固定と再照合が必要です。
- QwenのMLC形式モデルについては、モデルカードが示す元モデルのApache 2.0を収録。変換配布物の追加告知の網羅は未確認です。

WebLLM、tokenizers-cpp、SentencePieceの調査対象ルートNOTICEは404でした。存在を創作していません。MLC LLMのLICENSE/NOTICEは上流main時点の補足で、実行WASMとの同一性の証明ではありません。
商用利用を許すトップレベル条件を収集したことと、全内包部品の義務履行を完了したことは異なります。現状は照合途中です。

## 配布範囲と変更
本ZIPはモデル・実行WASM・npm依存本体を同梱しません。テスト依存本体も除外しています。build24では第三者ライセンス表示とテストサーバーを更新し、第三者コード自体は変更していません。販売者情報・独自部分の条件は別紙下書きで、未確定です。取得元とハッシュはLICENSE_SOURCES.json、補足根拠は販売準備フォルダーのevidenceを参照してください。

## build26での継続確認
公開ツリー内の対象モデルWASMはGit blob 049e31c6496bd22e7555f6f5f85057d8907b332d、5,383,844 bytesとして特定しました。これは対象ファイルの識別情報であり、全内部部品のSBOMやCargo.lockの代わりにはなりません。先の未解決事項は解消していません。上流への照会案は未送信です。
