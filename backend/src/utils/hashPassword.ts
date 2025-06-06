import bcrypt from "bcrypt";

export default async (userData: { email: string, password: string, isAdmin: boolean }) => {
    const salt = await bcrypt.genSalt(parseInt(process.env.genSalt));
    const hashedPassword = await bcrypt.hash(userData.password, salt);
    return hashedPassword;
}
