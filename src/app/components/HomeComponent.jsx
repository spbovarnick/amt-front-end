// import BannerHome from "./BannerHome";
// import TextBlock from "./TextBlock";
// import NewsBlock from './NewsBlock';
// import Footer from "./Footer"
import Nav from "./Nav"

const HomeComponent = () => {
    const leftText = "<p>Through community events and educational programming, we amplify regional contributions to arts and culture. Our media archive highlights the cultural heritage of Portland's historic Albina District.</p>";

    return (
        <div className="page-wrapper">
            <Nav />
            {/* <BannerHome themeLight={true} alignLeft={true} />
            <TextBlock themeLight={false} heading="What we do" leftText={leftText} />
            <NewsBlock/>
            <Footer /> */}
        </div >
    );
};

export default HomeComponent;