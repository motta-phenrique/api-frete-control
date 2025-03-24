import bcrypt from 'bcrypt';

export function hashPassword(password: string) {
    const saltsRounds = 10
    const hashedPassword = bcrypt.hash(password, saltsRounds)
    return hashedPassword
}
