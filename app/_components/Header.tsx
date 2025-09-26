import Link from "next/link";

const links = [
  { label: "Home", href: "/home" },
  { label: "Practice", href: "/practice" },
  { label: "Progress", href: "/progress" },
  { label: "Community", href: "/community" },
];

export default function Header() {
  return (
    <header className="border-b">
      <nav className="flex gap-5 justify-center items-center text-muted-foreground h-14 text-sm">
        {links.map((link) => (
          <Link key={link.href} href={link.href}>
            {link.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
