'use client'
import useFetchUser from '@/hooks/useFetchUser'
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import { jost } from '../fonts';
import './styles/home.css';

export default function Home({ children }) {
  useFetchUser('user');

  return (
    <div className={jost.className} style={{background:'#fff'}}>
        <Navbar />
        <div className="home_main">
            <Sidebar />
            {children}
        </div>
    </div>
  )
}
