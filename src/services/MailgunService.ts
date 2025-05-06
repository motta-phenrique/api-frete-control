import { mg } from "../utils/mailgunUtils"

export class MailgunService {
    sendOtpEmail = async (email: string, code: string) => {
        const data = {
            from: "Frete control <postmaster@sandboxeac033a6ee7f447988b48e1ae8e05572.mailgun.org>",
            to: email,
            subject: "Código de verificação - Recuperar Senha",
            html:`
            <div style="font-family: Arial, sans-serif; padding: 20px;">
              <h2 style="color: #2e86de;">Código de Verificação</h2>
              <p>Olá! Seu código para redefinir a senha é:</p>
              <p style="font-size: 24px; font-weight: bold; letter-spacing: 2px;">${code}</p>
              <p>Esse código é válido por 5 minutos.</p>
              <hr/>
              <p style="font-size: 12px; color: #777;">Não foi você? Ignore este e-mail.</p>
            </div>
          `,
        }

        return mg.messages().send(data)
    }
}