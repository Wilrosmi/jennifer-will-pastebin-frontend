export default function fillEmptyTitle(title: string | null): string {
  if (title === null || title.length === 0) {
    return "(no title)";
  } else {
    return title;
  }
}
