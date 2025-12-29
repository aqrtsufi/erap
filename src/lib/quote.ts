import { buildCitation, type BookProfile } from "./profiles";

export function inferVerseHint(selection: string): string | undefined {
    const m = selection.match(/^\s*(\d{1,3}\s*[:.]\s*\d{1,3})\b/);
    const m1 = m?.[1];
    if (m1) return m1.replace(/\s+/g, "");
  
    const n = selection.match(/^\s*(\d{1,4})\b/);
    const n1 = n?.[1];
    if (n1) return n1;
  
    return undefined;
  }
  
export function buildQuoteText(args: {
  profile: BookProfile;
  selectedText: string;
  title: string;
  author?: string;
  chapter?: string;
  section?: string;   // ✅ new
}) {
  const verseHint = inferVerseHint(args.selectedText);
  const cite = buildCitation(args.profile, {
    title: args.title,
    author: args.author,
    // ✅ prefer section; fall back to chapter if section missing
    section: args.section ?? args.chapter,
    // chapter: args.chapter,
    verseHint,
  });

  return `"${args.selectedText.trim()}"\n\n— ${cite}`;
}
