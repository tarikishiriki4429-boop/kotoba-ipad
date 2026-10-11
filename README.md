# Kotoba Writer build40 — 無料公開・AI非搭載版

Kotoba Writerは、iPadのSafari向けに開発した日本語執筆Webアプリです。**アプリとnoteの利用ガイドは無料公開**しています。会員登録、購入者認証、アプリ内課金、月額料金はありません。noteのチップ機能が利用できる場合、開発への応援は任意です。**チップを送らなくても機能や更新に制限はありません。**

- **正式な公開先**：https://kotoba-ipad.pages.dev/
- **公開者**：SHIKIKEY
- **利用条件・ライセンス**：[`licenses.html`](licenses.html)
- **利用ガイド**：[`START-HERE.md`](START-HERE.md)
- **問い合わせ**：X [@shikikey101](https://x.com/shikikey101) のDM、または [noteプロフィール](https://note.com/shiki_key44) のお問い合わせ

## build40 の提供機能

縦書き・横書き、原稿用紙設定、文字数・ページ数の確認、ページをまたぐ編集、コピー・貼り付け・取り消し、検索結果一覧・前後移動・1件置換・一括置換、TXT保存・TXT読み込み、PDF/印刷、端末のブラウザ内への原稿保存、オフラインでの基本的な執筆、秘匿モードを提供しています。

**現行版にはAI推敲、WebLLM、AIモデル、AI関連WASM、AIワーカーの実行・取得機能はありません。** 将来の追加は未定であり、提供を保証しません。旧版のAI関連監査は研究・開発履歴として [`LICENSE_AUDIT.md`](LICENSE_AUDIT.md)、[`THIRD_PARTY_NOTICES.txt`](THIRD_PARTY_NOTICES.txt)、[`licenses/`](licenses/) 等に保存しています。旧版の全依存に関する権利照合は完全には終了していませんが、それらのAI部品を現行版で実行するものではありません。

## 配信・更新

- GitHubリポジトリの `main` ブランチから **Cloudflare Pages** へ自動デプロイする構成です。GitHub Pagesによる公開は停止済み。Netlifyは以前の配信環境で、現在の正式な配信先ではありません。
- Web配信の主要ファイル：`index.html`、`sw.js`、`manifest.webmanifest`、`licenses.html`。ライセンス資料は別途 `THIRD_PARTY_NOTICES.txt`、`LICENSE_AUDIT.md`、`licenses/` にあります。
- **今回の無料公開向け文書更新は `licenses.html`、`START-HERE.md`、`README.md` の3ファイルのみ。** `index.html`、`sw.js`、本文の保存キー、アプリの機能は変更していません。これらの3ファイルをGitHubリポジトリのルートへ上書きし、`main` にCommitしてください。Cloudflare側のデプロイ完了後、正式URLで「利用条件・ライセンス」を確認してください。
- アプリは通常キャッシュを利用します。アプリ内の「更新確認」が必要な場合は秘匿モードをOFFにしてください。ただしSafariのService Worker更新確認等の通信まで完全に停止するものではありません。
- ブラウザ内の下書きは `kotoba-writer-draft-v1`、設定は `kotoba-writer-settings-v1` を利用します。ブラウザのサイトデータ削除や別ドメインへの移動で原稿を失う可能性があります。**原稿はこまめにTXTファイルで別途バックアップしてください。** 以前のNetlify版の下書きはCloudflare版へ自動移行されません。

## 動作確認と制約

2026年10月11日、iPad SafariのCloudflare版build40で、アプリ起動、検索結果一覧・対象ジャンプ、選択箇所の置換、前へ・次へ、取り消し、TXT保存からの読み直し、オフライン起動が利用者によって確認されました。build39では連続貼り付け後のスクロールが確認されました。**現時点で実機動作を確認しているのはiPadのSafariのみ**であり、Mac・Windows・Androidやすべての操作について正常動作を保証しません。

## 注意

無料公開および任意のチップは、アプリの独自部分や第三者部品のライセンス条件を変更するものではありません。制作された原稿の著作権が公開者へ移ることはありません。第三者ライセンスの原文・監査資料は削除せず、参照用として保持しています。詳細は [`licenses.html`](licenses.html) を確認してください。
