# Nexterra samples

11サイトを独立したフォルダに統合しています。各フォルダ内は移行元とバイト単位で同一です。下層ページ、画像、CSS、JavaScript、リンク、フォームのデモ動作を維持しています。

## 移行元と公開パス

| フォルダ | 移行元 |
| --- | --- |
| simple-1/ | pan1535ipad/simple-sample |
| simple-2/ | bluebird568976-maker/setubi |
| strength-1/ | pan1535ipad/strength-sample |
| strength-2/ | bluebird568976-maker/suidouhaikan |
| trust-1/ | pan1535ipad/trust-sample |
| trust-2/ | bluebird568976-maker/suidousetubi |
| modern-1/ | pan1535ipad/modern-sample |
| modern-2/ | pan1535ipad/modern-sample2 |
| craftsman-1/ | pan1535ipad/craftsman-sample |
| craftsman-2/ | pan1535ipad/craftsman-sample2 |
| craftsman-3/ | bluebird568976-maker/syoubousekou |

予定URL: https://sample.nexterra-llc.jp/<フォルダ名>/

## バックアップと復元

変更前の統合先はブランチ `backup/pre-migration-20261013` に保存しています。
移行元のコミット、全ファイルのGit blob SHAは `migration-manifest.json` に記録しています。元リポジトリ・Nexterra公式サイトには変更していません。
実作業時には全12リポジトリのファイルをZIP/JSONに保存し、外部配信画像の実データも別途バックアップしています。
復元時は対象バックアップの内容を新規コミットとして戻してください。履歴の強制上書きは不要です。

## 公開準備（DNSは未変更）

1. このリポジトリの Settings → Pages → Build and deployment で Source を **GitHub Actions** に設定します。
2. ドメイン所有権を確認し、sample.nexterra-llc.jp に他サイトの割り当てがないことを確認します。
3. 別途承認したタイミングで、サブドメイン sample のDNS CNAMEを Nexterra1127.github.io に設定します。既存のルートドメイン・www・メール用DNSは変更しません。
4. Actions → Validate and publish samples → Run workflow を実行します。
5. Pages の Custom domain に sample.nexterra-llc.jp を設定し、証明書発行後に Enforce HTTPS を有効にします。
6. 一覧ページと全11サイトのトップ・下層ページを実ドメインで確認します。

`CNAME` は公開先の宣言です。DNSレコードを変更するものではありません。
ワークフローは手動実行のみです。この移行作業では公開処理、Pages設定変更、DNS変更を実行していません。
静的ホスティングを別途利用する場合も、11フォルダと index.html、404.html を公開ルートに配置できます。

## 検証

`python scripts/validate.py` で全HTMLのリンク・アンカー、画像、CSS url、CSS import、JavaScriptの静的fetch/import参照を検証します。
JavaScriptは各ファイルを `node --check` で構文検証しています。
ワークフローでも公開前に参照検証と構文チェックを行います。
検証結果は `migration-validation.json` を参照してください。

外部画像は元URLを維持しています。Pexels、Unsplash、Google Fonts等の外部サービスへの依存も元の仕様どおりです。将来の配信停止までは保証できません。
問い合わせ送信、スクロール演出、メニュー等は元のJavaScriptを維持しています。ブラウザ上の全操作・全画面幅の目視検証は未実施です。

