import Link from "next/link";
import Contact from "../components/ContactForm";
import DesktopSidebar from "../components/DesktopSidebar";


const ContactPage = ({}) => {

  return(
    <div className="page-wrapper contact-wrapper">
      <DesktopSidebar />
      <div>
        <div className="contact-heading heading">CONTACT US</div>
        <Contact
          archiveComment={false}
        />
      </div>
      <div className="quick-links">
          <div className="heading quick-links-heading">QUICK LINKS</div>
            <ul className="quick-links-list">
              <li>
                <Link href={"/about#collections-development-policy"}>Collections Development Policy</Link>
              </li>
              <li>
                <Link href={"/about#terms-of-use"}>Terms & Conditions</Link>
              </li>
              <li>
                <Link href={"/about#privacy-policy"}>Privacy Policy</Link>
              </li>
            </ul>
      </div>
    </div>
  )
}

export default ContactPage;