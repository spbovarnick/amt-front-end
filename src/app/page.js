import Nav from "./components/Nav";
import BannerHome from "./components/BannerHome";

export default function Home() {
  const leftText = "<p>Through community events and educational programming, we amplify regional contributions to arts and culture. Our media archive highlights the cultural heritage of Portland's historic Albina District.</p>";

  return (
    <div className="page-wrapper">
      <Nav />
      <BannerHome themeLight={true} alignLeft={true} />
    </div>
  );
}
