import Link from "next/link";

const links = [
    {label: 'Home', href: '#'},
    {label: 'Practice', href: '#'},
    {label: 'Progress', href: '#'},
    {label: 'Community', href: '#'},
]

export default function Header(){
    return (
        <header className='border-b'>
            <nav className='flex gap-5 justify-center items-center text-muted-foreground h-14 text-sm'>
                {links.map(link => (
                    <Link href={link.href}>{link.label}</Link>
                ))}
            </nav>
        </header>
    )
}