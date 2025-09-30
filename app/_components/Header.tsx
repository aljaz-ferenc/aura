import { UserButton } from "@clerk/nextjs";
import Link from "next/link";

const links = [
  { label: "Home", href: "/home" },
  { label: "Free Practice", href: "/free-practice" },
];

const DBLink =
  process.env.NODE_ENV === "development"
    ? "https://cloud.mongodb.com/v2/68da94e52ce9d47e08171c57#/overview"
    : "";

export default function Header() {
  return (
    <header>
      <nav className="flex gap-5 justify-end items-center text-muted-foreground h-14 text-sm px-6">
        {DBLink && (
          <a target="_blank" href={DBLink}>
            Database Link
          </a>
        )}
        {links.map((link) => (
          <Link key={link.href} href={link.href}>
            {link.label}
          </Link>
        ))}
        <UserButton />
      </nav>
    </header>
  );
}
