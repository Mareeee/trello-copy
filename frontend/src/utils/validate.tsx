export default function validate(
  email: string,
  password: string,
  repeatPassword?: string
): string | null {
  if (!email) return "Email required!";

  if (!password) return "Password required!";

  if (repeatPassword && password !== repeatPassword) {
    return "Password does not match!";
  }

  if (password.length < 4 || password.length > 30) {
    return "Password length must be between 4 and 30 characters!";
  }

  if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
    return "Invalid email format! Example: something@email.com";
  }

  return null;
}