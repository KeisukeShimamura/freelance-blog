import { NextSeo } from 'next-seo'
import Link from 'next/link'
import React from 'react'
import { useForm } from 'react-hook-form'

type FormState = {
  name: string
  email: string
  message: string
}

const Contact = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormState>({
    mode: 'onChange',
    defaultValues: {
      name: '',
      email: '',
      message: '',
    },
  })

  const onSubmit = handleSubmit(async (data) => {
    try {
      const res = fetch('/api/sendMail', {
        method: 'POST',
        headers: {
          Accept: 'application/json, text/plain, */*',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      reset()
      alert('お問い合わせが送信されました。')
    } catch (error) {
      console.error('Fetch error : ', error)
      alert(JSON.stringify(error))
    }
  })

  return (
    <>
      <NextSeo
        title="お問い合わせ"
        description="当ブログのお問い合わせフォームです。"
      />
      <section className="py-16">
        <div className="flex flex-col text-center w-full mb-12">
          <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
            お問い合わせ
          </h1>
          <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
            お問い合わせは、以下のフォームに内容をご記入ください。
          </p>
        </div>
        <div className="lg:w-1/2 md:w-2/3 mx-auto">
          <form onSubmit={onSubmit} className="flex flex-wrap -m-2">
            <div className="p-2 w-1/2">
              <div className="relative">
                <label className="leading-7 text-sm text-gray-600">名前</label>
                <input
                  type="text"
                  className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  {...register('name', { required: '必須項目です。' })}
                />
                {errors.name && (
                  <span className="text-red-400 text-sm">
                    {errors.name.message}
                  </span>
                )}
              </div>
            </div>
            <div className="p-2 w-1/2">
              <div className="relative">
                <label className="leading-7 text-sm text-gray-600">
                  メールアドレス
                </label>
                <input
                  type="email"
                  className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  {...register('email', {
                    required: '必須項目です。',
                    pattern: {
                      value: /^[\w\-._]+@[\w\-._]+\.[A-Za-z]+/,
                      message: 'メールアドレスを入力してください。',
                    },
                  })}
                />
                {errors.email && (
                  <span className="text-red-400 text-sm">
                    {errors.email.message}
                  </span>
                )}
              </div>
            </div>
            <div className="p-2 w-full">
              <div className="relative">
                <label className="leading-7 text-sm text-gray-600">
                  お問い合わせ内容
                </label>
                <textarea
                  className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
                  {...register('message', {
                    required: '必須項目です。',
                    maxLength: {
                      value: 1000,
                      message: '1000文字以内で入力してください。',
                    },
                  })}
                />
                {errors.message && (
                  <span className="text-red-400 text-sm">
                    {errors.message.message}
                  </span>
                )}
              </div>
            </div>
            <div className="p-2 w-full">
              <p className="pb-4">
                ご記入いただく個人情報の取り扱いに関しては、
                <Link
                  href={`/privacy`}
                  className="text-indigo-500 underline"
                  target={'_blank'}
                >
                  プライバシーポリシー
                </Link>
                を必ずご覧の上、内容に同意ください。
              </p>
              <button className="flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">
                送信
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  )
}

export default Contact
