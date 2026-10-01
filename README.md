# Kotoba WebGPU リアルタイム版

iPad Safari で動く、ローカルAI執筆支援PWAです。

## 主な機能
- 小説化：メモ・プロット・粗い文章を小説本文へ整える
- 推敲：意味を維持したまま文章を磨く
- 続き：本文末尾から次の2〜4段落を提案
- 入力停止後約1.2秒で自動提案
- 選択範囲がある場合はその範囲を優先
- 本文は localStorage に保存
- AI生成はWebGPUで端末内実行

## 更新方法
既存GitHub Pages版の `index.html` と `sw.js` をこの版へ置き換えてください。
`manifest.webmanifest` と `README.md` も更新できます。

初回のみWebLLM本体とモデルの取得にインターネット接続が必要です。
