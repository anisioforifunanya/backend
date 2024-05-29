import Image from 'next/image';
import Slider from './components/Slider';

export default function Home() {
  return (
    <main className=''>
      <section className="hero">
        <div className="heroText">  
          <h1>Experience Networking Redefined!</h1>
          <p>Welcome to Amebo Connect, the online platform designed to help you unlock the doors to your next big endeavour. Explore a thoughtfully curated space that goes beyond the ordinary, where you can effortlessly connect with friends, explore employment opportunities, discover exciting hangouts, and forge meaningful relationships.</p>
        </div>
        <div className="heroImg">
          <Image src="/img/heroimg.png" alt="hero" width={500} height={500} />
        </div>
      </section>
      <section className="landingContent">
        <div className="landingText">
          <p>Amebo Connect is a platform that connects people, businesses and events. We are the go-to space for people looking to build meaningful relationships, businesses looking to hire the best talent, and event organisers looking to reach their target audience.</p>
        </div>
        <div className="landingSlider">
            <Slider />
        </div>
      </section>
    </main>
  )
}
