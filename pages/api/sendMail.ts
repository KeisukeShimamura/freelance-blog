import sgMail from '@sendgrid/mail'
import { MailDataRequired } from '@sendgrid/mail'
import { EmailData } from '@sendgrid/helpers/classes/email-address'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  sgMail.setApiKey(process.env.SEND_GRID_API_KEY as string)
  const msg: MailDataRequired = {
    to: process.env.MAIL_TO,
    from: process.env.MAIL_FROM as EmailData,
    subject: 'ブログより問い合わせがありました',
    text: `お名前：${req.body.name}\nメールアドレス：${req.body.email}\n問い合わせ内容：\n${req.body.message}`,
  }

  try {
    await sgMail.send(msg)
    res.status(200).json(msg)
  } catch (err) {
    console.error(err)
    res.status(500).json(err)
  }
}
