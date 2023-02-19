import { NextSeo } from 'next-seo'
import React from 'react'
import BreadCrumbs from '../components/breadcrumbs'

const Privacy = () => {
  return (
    <>
      <NextSeo
        title="プライバシーポリシー"
        description="当ブログのプライバシーポリシーについて記載しているページです。"
      />
      <BreadCrumbs
        lists={[
          {
            title: 'ホーム',
            path: '/',
          },
          {
            title: 'プライバシーポリシー',
          },
        ]}
      />
      <section className="py-16">
        <h1 className="text-center text-2xl mb-4">プライバシーポリシー</h1>
        <p>
          北海道フリーランス生活（以下「当ブログ」）のプライバシーポリシー・免責事項を次の通り記載します。
        </p>
        <h2 className="text-xl mt-12 mb-4 pl-2 border-l-4 border-indigo-500">
          アクセス解析ツールについて
        </h2>
        <p className="mb-4">
          当ブログでは、Googleアナリティクスによりアクセス情報を解析しています。
        </p>
        <p className="mb-4">
          アクセス情報の解析にはCookieを使用しています。また、アクセス情報の収集はCookieを無効にすることで拒否できます。
        </p>
        <p className="mb-4">
          Google社のデータ収集・処理の仕組みについては、
          <a
            href="http://www.google.com/intl/ja/policies/privacy/partners/"
            className="text-indigo-400 underline decoration-1"
            rel="noopener"
            target={`_blank`}
          >
            こちら
          </a>
          をご覧ください。
        </p>
        <h2 className="text-xl mt-12 mb-4 pl-2 border-l-4 border-indigo-500">
          第三者配信の広告配信サービスについて
        </h2>
        <p className="mb-4">
          当サイトはGoogle及びGoogleのパートナー（第三者配信事業者）の提供する広告を設置しております。その広告配信にはCookieを使用し、当サイトへの過去のアクセス情報に基づいて広告を配信します。
        </p>
        <p className="mb-4">
          <a
            href="https://support.google.com/searchads/answer/2839090?hl=ja&ref_topic=2473095"
            className="text-indigo-400 underline decoration-1"
            rel="noopener"
            target={`_blank`}
          >
            DoubleClick Cookie
          </a>
          を使用することにより、GoogleやGoogleのパートナーは当サイトや他のサイトへのアクセス情報に基づいて、適切な広告を当サイト上でサイト利用者に表示できます。
        </p>
        <p className="mb-4">
          サイト利用者は下記の
          <a
            href="https://www.google.com/settings/u/0/ads/authenticated?hl=ja"
            className="text-indigo-400 underline decoration-1"
            rel="noopener"
            target={`_blank`}
          >
            Googleアカウントの広告設定ページ
          </a>
          で、インタレスト ベースでの広告掲載に使用される DoubleClick Cookie
          を無効にできます。また
          <a
            href="http://aboutads.info/"
            className="text-indigo-400 underline decoration-1"
            rel="noopener"
            target={`_blank`}
          >
            aboutads.info
          </a>
          のページにアクセスして頂き、インタレスト
          ベースでの広告掲載に使用される第三者配信事業者のCookieを無効にできます。
        </p>
        <p className="mb-4">
          その他、Googleの広告におけるCookieの取り扱い詳細については、Googleのポリシーと規約ページをご覧ください。
        </p>
        <h2 className="text-xl mt-12 mb-4 pl-2 border-l-4 border-indigo-500">
          個人情報の利用目的について
        </h2>
        <p className="mb-4">
          当ブログでは、フォームでのお問い合わせの際に、名前やメールアドレスなどの個人情報を入力いただく場合がございます。
          取得した個人情報は、必要な連絡のみに利用させていただくもので、これらの目的以外では利用いたしません。
        </p>
        <h2 className="text-xl mt-12 mb-4 pl-2 border-l-4 border-indigo-500">
          個人情報の第三者開示について
        </h2>
        <p className="mb-4">
          取得した個人情報は適切に管理し、以下に該当する場合を除いて第三者に開示することはありません。
        </p>
        <ul className="list-disc ml-6 mt-2">
          <li>本人の同意が得られた場合</li>
          <li>法令により開示が求められた場合</li>
        </ul>
      </section>
    </>
  )
}

export default Privacy
