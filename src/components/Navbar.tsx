import Link from "next/link";

export default function Navbar() {
    return (
        <header className="navbar backdrop-blur-2xl">
        <div className="logo">Crop Vision</div>
        <nav className="">
          <ul>
            <li>
              <Link href="/">HOME</Link>
            </li>
            <li>
              <Link href="/about">ABOUT</Link>
            </li>
            <li>
              <Link href="/crop-prediction" className="">
                SERVICES
              </Link>
            </li>
            <li>
              <Link href="/Login-Form">LOGIN</Link>
            </li>
            <li>
              <Link href="/faqs">FAQ</Link>
            </li>
          </ul>
        </nav>
      </header>
    )
}