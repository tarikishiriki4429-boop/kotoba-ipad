# Kotoba WebGPU版

Swift Playgroundを使わず、Safari 26 / iPadOS 26 のWebGPU上でローカルAIを動かす版です。

## GitHub Pagesで使う
1. このフォルダの `index.html` / `manifest.webmanifest` / `sw.js` をGitHubリポジトリのルートへアップロード
2. GitHubの Settings > Pages で Deploy from a branch、main / root を選択
3. 表示されたPages URLをiPadのSafariで開く
4. 「AIを準備」を押す（初回のみモデル取得）
5. Safari共有メニュー > ホーム画面に追加

モデル: Qwen2.5-0.5B-Instruct-q4f16_1-MLC。WebLLMのCache APIへ保存されます。
