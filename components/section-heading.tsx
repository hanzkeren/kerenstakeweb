export function SectionHeading({ title, subtitle, id }: { title: string; subtitle?: string; id?: string }) {
  return (
    <div id={id} className="mx-auto mb-10 max-w-2xl text-center">
      <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{title}</h2>
      {subtitle ? (
        <p className="mt-3 text-muted-foreground">{subtitle}</p>
      ) : null}
    </div>
  )
}

