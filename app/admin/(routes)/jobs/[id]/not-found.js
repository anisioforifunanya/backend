import Link from 'next/link'
 
export default function NotFound() {
  return (
    <div>
      <h2>Not Found</h2>
      <p>Could not find requested resource this is the event[id] route</p>
      <Link href="/home/events">Return to the events</Link>
    </div>
  )
}