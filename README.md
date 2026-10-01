# Kotoba WebGPU リアルタイム版 — build 6

iPad Safariで動く、ローカルAI執筆支援PWAです。

## build 6 の変更
- WebLLMを **0.2.82に固定**
- `Object has already been disposed` 回帰バグを避ける
- iPad向けにリアルタイム入力範囲を短縮
- 生成トークン数を抑えてメモリ使用量を軽減
- disposed / device lost時にAIエンジンを自動再初期化して1回再試行
- 画面右下に `Kotoba build 6` を常時表示
- オンライン時は最新版優先、オフライン時はキャッシュ利用

## 主な機能
- 小説化
- 推敲
- 続き生成
- 入力停止後の自動提案
- 本文の端末内保存
- WebGPUによる端末内AI推論

初回のみAIモデル取得にインターネット接続が必要です。
