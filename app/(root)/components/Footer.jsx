import React from 'react'
import Link from 'next/link'
import { FaWhatsapp, FaYoutube, FaInstagram, FaFacebook, FaTelegram, FaXTwitter } from "react-icons/fa6";
import Logo from '@/app/components/Logo';
import LogoResponsive from '@/app/components/LogoResponsive';


export default function Footer() {
  return (
    <footer className='mainFooter'>
      <section >
      <Logo />
      {/* <LogoResponsive /> */}
      <hr />
      <h2 className="text-4xl font-semibold">Your #1 Social Connect Platform</h2>
      </section>
      <section >
        <h2 className='text-2xl font-semibold'>Quick Links</h2>
        <ul>
          {/* <li><Link href={"./about"}>About Us</Link></li> */}
          <li><Link href={"/faqs"}>FAQs</Link></li>
          <li><Link href={"/home"}>Home</Link></li>
          {/* <li><Link href={"./contact"}>Contact</Link></li> */}
          <li><Link href={"./privacy"}>Privacy Policy</Link></li>
        </ul>
      </section>
      <section>
        <h2 className='text-2xl font-semibold'>Socials</h2>
        <div className='flex flex-wrap gap-3 w-full text-2xl space-y-3 items-end'>
            <Link href={"https://www.facebook.com/groups/300343089117614/?ref=share"}>
              <FaFacebook />
            </Link>
            <Link href={"https://www.instagram.com/naijaamebogist"}>
              <FaInstagram />
            </Link>
            <Link href={"https://whatsapp.com/channel/0029Va5zeh4KAwEi1aD84g37"}>
              <FaWhatsapp />
            </Link>
            <Link href={"https://youtube.com/@naijaamebogist"}>
              <FaYoutube />
            </Link>
            <Link href={"https://t.me/naijaamebocommunity"}>
              <FaTelegram />
            </Link>
            <Link href={"https://twitter.com/naijaamebonews"}>
              <FaXTwitter />
            </Link>
        </div>
        <p className='pt-5 text-sm'>
          Amebo Connect is a social platform that connects people with friends, jobs, clients and other meaningful relationships. People use Amebo Connect to keep up with friends, upload photos, post links and videos, and learn more about the people they meet.
        </p>
      </section>
    </footer>
  )
  // castle & retail
}
