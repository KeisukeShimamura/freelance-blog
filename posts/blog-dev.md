---
title: 'Next.js でのブログ構築'
createdAt: '2023-01-09'
updatedAt: '2023-01-10'
description: 'Next.jsでmarkdownファイルを利用したブログの構築手順を解説しています。'
image: test.png
categoryString: ['programing', 'プログラミング']
tags: [['nextjs', 'Next.js'], ['blog', 'ブログ']]
---

Next.js でのブログを作りたいあなたへ。**解説します。**
文章中の脚注[^1]

## 目次

## Next.js プロジェクト作成

### Next.js v13 にてプロジェクト作成

[記事一覧](/)
[Next.js 公式](https://nextjs.org/docs/getting-started)

```bash
npx create-next-app@latest --typescript
cd XXX
npm run dev
```

![デフォルト](/test.png)

### TailwindCSS

- インストール

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

- tailwind.config.js を変更

```js[class="line-numbers"]
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

- globals.css の変更

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

## Layout、Header、Footer 作成

- アイコン

```bash
npm install @heroicons/react
```

- 以下を実装

  - components/header.tsx
  - components/footer.tsx
  - components/layout.tsx

- tailwindcss の container の設定

```js
 theme: {
    extend: {},
    container: {
      center: true,
      padding: {
        DEFAULT: '16px',
        md: '24px',
      },
    },
  },
```

- headlessui のインストール

```bash
npm install @headlessui/react
```

- components/sidebar.tsx 実装

## markdown ファイルの読み込み

- posts/test.md 作成
- gray-matter の設定（メタ情報の取得）

```bash
npm install gray-matter
```

- post 型を実装
- index.tsx に md より記事一覧を表示
  - post-item-card.tsx を実装

## 記事詳細ページを実装

- pages/posts/[slug].tsx を実装
- markdown を HTML に変換

```bash
npm install unified remark-parse remark-rehype rehype-stringify
npm install remark-toc 目次
npm install rehype-slug　目次のリンク
npm install remark-prism　コードハイライト
npm i --save-dev @types/remark-prism
npm install rehype-parse rehype-react　Reactコンポーネントの利用
npm i remark-gfm　テーブル
```

- スタイルの適用

```bash
npm install -D @tailwindcss/typography
```

- tailwind.config.js に追加

```js
plugins: [require('@tailwindcss/typography')]
```

## SEO 関連を設定

- nex-seo インストール

```bash
npm install next-seo
```

- next-seo.config.js を作成
- \_app.tsx で読み込み
- 記事詳細ページでは SEO 情報を上書き

## 記事をカテゴリごとに

- 記事にカテゴリデータを追加
- [category].tsx を実装
- 記事詳細ページにカテゴリのリンクを追加
- lib/post.ts にて記事取得をライブラリに
- URL 構造を変更など、記事取得部分を再実装(index、category、page（posts）)

| ああああ | いいいい |
| -------- | -------- |
| うううう | ええええ |
| うううう | ええええ |
| うううう | ええええ |

[alert]寄付した自治体から「寄附金受領書」が送られてくるので保管しておきましょう[/alert]

[check]寄付した自治体から「寄附金受領書」が送られてくるので保管しておきましょう[/check]

[info]寄付した自治体から「寄附金受領書」が送られてくるので保管しておきましょう[/info]

[comment]あああああああいいいいええええええ[/comment]

[^1]: 脚注の補足
