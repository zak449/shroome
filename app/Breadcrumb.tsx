import Link from "next/link";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export default function Breadcrumb({
  items,
  prefix,
}: {
  items: BreadcrumbItem[];
  prefix: string;
}) {
  return (
    <>
      <style>{`
        .${prefix}-breadcrumb{
          max-width:720px;margin:0 auto;
          padding:20px 6% 0;
        }
        .${prefix}-breadcrumb-list{
          list-style:none;margin:0;padding:0;
          display:flex;align-items:center;gap:0;flex-wrap:wrap;
        }
        .${prefix}-breadcrumb-list li{
          display:inline-flex;align-items:center;
          font-family:'DM Mono',monospace;font-size:11px;font-weight:500;
          letter-spacing:.14em;text-transform:uppercase;
          color:rgba(27,31,59,0.5);
        }
        .${prefix}-breadcrumb-list li a{
          color:rgba(27,31,59,0.5);text-decoration:none;transition:color .2s;
        }
        .${prefix}-breadcrumb-list li a:hover{color:rgba(27,31,59,0.8)}
        .${prefix}-breadcrumb-sep{
          margin:0 8px;color:rgba(27,31,59,0.3);font-size:11px;
        }
        @media(max-width:768px){
          .${prefix}-breadcrumb{padding:16px 5% 0}
        }
      `}</style>
      <nav className={`${prefix}-breadcrumb`} aria-label="Breadcrumb">
        <ol className={`${prefix}-breadcrumb-list`}>
          {items.map((item, i) => (
            <li key={i}>
              {i > 0 && <span className={`${prefix}-breadcrumb-sep`} aria-hidden="true">/</span>}
              {item.href ? (
                <Link href={item.href}>{item.label}</Link>
              ) : (
                <span aria-current="page">{item.label}</span>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}
