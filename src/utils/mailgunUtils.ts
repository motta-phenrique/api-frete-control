import mailgun from "mailgun-js"

const DOMAIN = process.env.DOMAIN
const MAILGUN_API_KEY = process.env.MAILGUN_API_KEY

export const mg = mailgun({
    apiKey: MAILGUN_API_KEY!,
    domain: DOMAIN!
})