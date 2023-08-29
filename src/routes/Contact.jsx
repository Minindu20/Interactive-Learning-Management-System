import Hero from '../components/Hero';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ContactForm from '../components/ContactForm';
import heroImage from "../assests/hero.jpg";
import heroImage1 from "../assests/hero1.jpg";
import heroImage2 from "../assests/hero2.jpg";
import heroImage4 from "../assests/hero3.jpg";
import heroImage3 from "../assests/hero4.jpg";
import heroImage5 from "../assests/hero5.jpg";
import heroImage6 from "../assests/hero6.jpg";
import heroImage7 from "../assests/hero7.jpg";
import heroImage8 from "../assests/hero8.jpg";
import heroImage9 from "../assests/hero9.jpg";
import heroImage10 from "../assests/hero10.jpg";
import heroImage11 from "../assests/hero11.jpg";
import heroImage12 from "../assests/hero13.jpg";
import heroImage13 from "../assests/hero5.jpg";
function Contact(){
    return(
        <>
         <Navbar/>
        <Hero
           cName="hero-mid"
           heroImage={heroImage13}
           btnClass="hide"
           title="Contact"
        />
        <ContactForm/>
        <Footer/>
        </>
    )
    }
    
    export default Contact;