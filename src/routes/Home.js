import Hero from '../components/Home/Hero';
import Navbar from '../components/Home/Navbar';
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
import Destination from '../components/Home/Destination';
import Footer from "../components/Home/Footer";
import Squre from "../components/Home/Squre";
function Home(){
return(
    <>
    <Navbar/>
    <Hero
       cName="hero-mid"
       heroImage={heroImage10}
       btnClass="show"
       title="Unlock the World of Knowledge"
       text="Welcome to our online library, your digital portal to a treasure trove of books, articles, and resources. Immerse yourself in stories, learn from experts, and embark on a journey of exploration."
       btnTxt="Get started"
       url="/login"
    />
    <Destination/>
    <Squre/>
    <Footer/>
    </>
)
}

export default Home;