/**
 * A titled page section. `index` renders the small ordinal that keeps
 * the page feeling like a document rather than a stack of cards.
 */
export function Section({ id, index, title, kicker, children, className = '' }) {
  return (
    <section id={id} className={`scroll-mt-28 ${className}`}>
      <div className="reveal mb-10 flex items-baseline gap-4 border-b border-line-soft pb-4">
        <span className="label tabular-nums text-accent">{index}</span>
        <h2 className="text-2xl font-semibold sm:text-3xl">{title}</h2>
        {kicker && (
          <span className="ml-auto hidden text-sm text-faint sm:block">{kicker}</span>
        )}
      </div>
      {children}
    </section>
  )
}
