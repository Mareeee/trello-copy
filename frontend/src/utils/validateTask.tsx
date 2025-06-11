export default function validateTask(
  title: string,
  description: string,
  date: Date
): string | null {
  if (!title) {
    return "Title required!";
  }

  if (!description) {
    return "Description required!";
  }

  if (!date) {
    return "Due date required!";
  }

  return null;
}
