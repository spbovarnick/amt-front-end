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
    </div>
  )
}

export default ContactPage;