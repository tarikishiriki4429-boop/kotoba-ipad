# Kotoba WebGPU リアルタイム版 — build 5

iPad Safariで動く、ローカルAI執筆支援PWAです。

## build 5 の変更
- 画面右下に `Kotoba build 5` を常時表示
- Service Workerをnetwork-firstへ変更
- オンライン時は最新版を優先
- オフライン時のみキャッシュへフォールバック
- Service Worker登録時に `updateViaCache: none` を使用

## 主な機能
- 小説化
- 推敲
- 続き生成
- 入力停止後の自動提案
- 本文の端末内保存
- WebGPUによる端末内AI推論

初回のみAIモデル取得にインターネット接続が必要です。
