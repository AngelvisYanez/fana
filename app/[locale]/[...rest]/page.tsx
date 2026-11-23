import { notFound } from 'next/navigation';

/**
 * Catch-all for any unknown URL under /es or /en. Calling notFound() here makes Next render
 * app/[locale]/not-found.tsx inside the locale layout (styles, messages, call button) with a 404 status.
 */
export default function CatchAllNotFound() {
  notFound();
}
