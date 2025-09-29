import Link from "next/link";

const links = [
  { label: "Home", href: "/home" },
  { label: "Free Practice", href: "/free-practice" },
];

export default function Header() {
  return (
    <header>
      <nav className="flex gap-5 justify-end items-center text-muted-foreground h-14 text-sm px-6">
        {links.map((link) => (
          <Link key={link.href} href={link.href}>
            {link.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
