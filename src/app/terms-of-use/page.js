import Footer from "@/app/components/Footer"
import Banner from "@/app/components/Banner"
import TextBlock from "@/app/components/TextBlock"
import NavPage from "@/app/components/NavPage"

export const metadata = {
  title: "Terms Of Use | Albina Community Archive",
  description: "Materials in The Albina Community Archive are available for purposes of education, historical research, and other 'fair use' as defined by U.S. Copyright Law.",
  metadataBase: 'https://albinacommunityarchive.org/terms-of-use',
}

export default function TermsOfUsePage() {

  const leftTextAbout = `<p>Welcome to the Albina Community Archive, a digital repository documenting Albina's arts and culture legacy.</p>`
  const rightTextAbout = `<p>Our mission is to engage community members and mission-aligned organizations to preserve digital versions of the Albina community's historical materials. We encourage you to revisit the archive as new items are added on a regular basis. These items include photography, film, audio, articles, and printed materials.</p>`
  const leftTextCopyright = `<p>Materials in The Albina Community Archive are available for purposes of education, historical research, and other "fair use" as defined by <a href="https://www.copyright.gov/title17/" target="_blank">U.S. Copyright Law.</a></p>`
  const rightTextCopyright = `<p>While the archive houses an item, it does not necessarily hold the copyright on the item, nor may it be able to determine if the item is protected under copyright law. Unless specific terms of use are noted in the metadata attached to content on this site, users must make their own assessments of rights in light of their intended use. Users are solely responsible for determining the copyright status of items, for obtaining necessary permissions, and paying associated fees that may be necessary for an item's intended use. The Albina Community Archive does not assign rights or license materials.
  </p>`

  return (
    <div className="page-wrapper">
      <NavPage pageName={"Terms Of Use"} />
      <Banner
        themeLight={false}
        alignLeft={true}
        headline="Copyright,<br/> Terms of Use<br/>& Policies"
        className="--has-graphic --is-archive"
      />
      <TextBlock 
        themeLight={true} 
        heading="About" 
        leftText={leftTextAbout} 
        rightText={rightTextAbout} 
        vPadding="lg" 
      />
      <div className="cmpt-text-block --is-ligh copyright">
        <div className="global-container">
          <h2 className="heading-m cmpt-text-block__heading">Copyright</h2>
          <div className="cmpt-terms-block">
            <p>Materials in The Albina Community Archive are available for purposes of education, historical research, and other "fair use" as defined by <a href="https://www.copyright.gov/title17/" target="_blank">U.S. Copyright Law.</a></p>
            <p>Please note: the possession of a digital reproduction of The Albina Community Archive's collection materials does not constitute permission to publish or exhibit these materials. We encourage you to contact us in the event you wish to utilize collection materials in this way.</p>
          </div>
        </div>
      </div>
      <div className="cmpt-text-block --is-light">
        <div className="global-container">
          <h2 className="heading-m cmpt-text-block__heading">Attribution</h2>
          <div className="cmpt-terms-block">
            <p>The Albina Community Archive requires that the following credit line accompany all reproductions of our items used in publications, productions, and websites: "Courtesy of Albina Music Trust." If space is available, metadata associated with an item may be included. For further citation guidelines for papers and articles, see <a href="https://guides.lib.purdue.edu/c.php?g=352889&p=2378064" target="_blank">Citing Electronic Primary Sources on Purdue's LibGuide</a>.</p>
            <p>If using items from The Albina Community Archive on your social media, the archive requires the following credit lines:</p>
            <ul>
              <li>Instagram: Courtesy of <a target="_blank" href="https://www.instagram.com/albinamusictrust/">@albinamusictrust</a> (link to account)</li>
              <li>Facebook: Courtesy of <a target="_blank" href="https://www.facebook.com/groups/albinamusictrust/">Albina Music Trust</a> (link to account)</li>
              <li>All other social media: Courtesy of @albinamusictrust</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="cmpt-text-block --is-light">
        <div className="global-container">
          <h2 className="heading-m cmpt-text-block__heading">Redaction</h2>
          <div className="cmpt-terms-block">
            <p>Unless otherwise noted, the Albina Community Archive is not responsible for the content of any materials on this site. If you are the copyright owner or have any information about the copyright status of an item you've seen on our website, we want to hear from you. Please contact us and make sure to include your contact information, a link to the relevant content, as well as a statement of the issue.</p>
          </div>
        </div>
      </div>
      <div className="cmpt-text-block --is-light">
        <div className="global-container">
          <h2 className="heading-m cmpt-text-block__heading">Disclaimer</h2>
          <div className="cmpt-terms-block">
            <p>The Abina Community Archive includes historical materials that reflect the beliefs and perspectives of their subjects and times, some of which may be offensive to users. The Albina Community Archive does not endorse the views expressed in these materials.</p>
          </div>
        </div>
      </div>
      <Footer archive={true} />
    </div>
  )
}