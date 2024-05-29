import FaqSection from "../components/FaqSection"

 
export const metadata = {
  title: 'Amebo Connect | FAQs',
  description: 'Frequently Asked Questions',
}

export default function FaqsPage() {
    return (
      <main className=''>
        <h1 className="text-2xl text-center font-semibold my-10">
          Frequently Asked Questions
        </h1>

        <div className="flex gap-8 flex-col w-full mb-10 px-3">
          <FaqSection question={"What are the things I can do on this platform?"}>
            <p>Our platform gives you the ability to send posts to your network just like you would on twitter. <br /> <br/> You can create and apply for jobs and events, message and connect with people and furthermore, promote your business by uploading your products in the market place. <br /> Additionally, there is a geolocation feature in the maps section that lets you make your location public, allowing people to easily find you or your business</p>
          </FaqSection> 

          <FaqSection question={"Can I create my own events on the platform?"}>
            <p>Yes, users have the option to create and promote their own events on the platform. You can add/edit event details and manage RSVPs.</p>
          </FaqSection>

          <FaqSection question={"Are there virtual events available on the platform?"}>
            <p> Yes, we offer virtual events and online hangouts for users who prefer to participate remotely. These events include webinars, virtual conferences, online classes, and virtual social gatherings where users can connect and interact from anywhere.</p>
          </FaqSection>

          <FaqSection question={"What types of job opportunities are available on the platform?"}>
            <p>Our platform offers a wide range of job opportunities across various industries and job functions, including full-time, part-time, freelance, and remote positions.
            </p>
          </FaqSection>


          <FaqSection question={"Is geolocation tracking always accurate?"}>
            <p>Geolocation accuracy can vary based on factors like GPS signal strength, device capabilities, and environmental conditions. It's generally reliable but may have limitations in certain situations. Regardless, if a person's device has a low location accuracy, you'll see a circle around the marker, showing the range of places that person could be </p>
          </FaqSection>

          <FaqSection question={"How do I join a discussion chat room?"}>
            <p>Typically, you can join a discussion chat room by creating an account on the Amebo Connect platform hosting the chat room, browsing chat rooms you've been added to,or creating your own chat rooms.</p>
          </FaqSection>
        </div>
      </main>
    )
  }
  