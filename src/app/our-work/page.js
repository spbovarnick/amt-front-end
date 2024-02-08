'use client';

import { useEffect, useState } from "react";
import Banner from "../components/Banner";
import WorkBlock from "../components/WorkBlock";
import Footer from "../components/Footer";
import Nav from "../components/Nav";
import Modal from "react-modal";
import Video from "../components/Video";
import Divider from "../components/Divider";

import image01 from '../../../public/images/work-block-01.jpg';
import image02 from '../../../public/images/work-block-02.jpg';
import image03 from '../../../public/images/work-block-03.jpg';
import image04 from '../../../public/images/alberta-street-project.jpg';
import image05 from '../../../public/images/race-talks.jpg';
import image06 from '../../../public/images/paaf.jpg';
import image07 from '../../../public/images/vancouver-cuhuch.jpg';
import image08 from '../../../public/images/sherman.jpg';
import image09 from '../../../public/images/golden-west.png';
import image10 from '../../../public/images/crb.png';
import image11 from '../../../public/images/railroad.png';
import image12 from '../../../public/images/youthsound.jpg';
import image13 from '../../../public/images/cjo.jpg';
import image14 from '../../../public/images/from-the-pulpit.png';
import image15 from '../../../public/images/dubois.png';
import posterImage01 from '../../../public/images/video-poster.jpg';
import posterImage02 from '../../../public/images/sherman-poster.png';
import posterImage03 from '../../../public/images/youthsound-poster.png';
import posterImage04 from '../../../public/images/pulpit-poster.png';

export default function OurWorkPage() {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [videoSrc, setVideoSrc] = useState(null);
  const [posterSrc, setPosterSrc] = useState(null);

  useEffect(() => {
    Modal.setAppElement(document.getElementsByClassName('page-wrapper')[0]);
  }, [])

  const block_1_text = `<p>Our annual tribute to the Rev. Dr. Martin Luther King, Jr. has been recognized as the largest community cultural event of its kind in the State of Oregon. With King’s work as a guide, Keep Alive The Dream highlights pioneering activists, community leaders, artists, musicians, and youth whose valiant efforts have left lasting impacts in Oregon’s African-American community. This event has official designation from the National Martin Luther King, Jr. Federal Holiday Commission.</p>`;
  const block_2_text = `<p>Albina Music Trust is preserving North Portland’s music culture with programming that documents the community’s oral history, archival media, and special events. In collaboration with Albina musicians, founders Bobby Smith and Calvin Walker have brought to light a definitive catalog of historic music and the memories of its creators.</p>`;
  const block_3_text = `<p>Urban Wings is a supplemental education program serving at-risk middle school and high school youth in Portland, Oregon. With aviation at its core, the program explores the holistic development of young people through hands-on learning strategies utilizing STEM and character development with a special focus on the Tuskegee Airmen.</p>`;

  const block_4_text = `<p>Surveyed in 1992 and again in 2015, this cultural resource inventory was conducted by WAFI and local high school students, with support from Portland Public Schools, Prosper Portland, and Black United Fund Of Oregon. The report documents the conditions of the Alberta neighborhood for residents and businesses while making recommendations for mitigating gentrification, social displacement, crime, poverty, and unemployment in the area.</p>`;
  const block_5_text = `<p>Founded in 2011 by Donna Maxey, Race Talks is a community forum facilitating conversations which enhance cross-cultural connections among participants. WAFI was a founding partner in this work.</p>`;
  const block_6_text = `<p>From 2009-2013, founder Ron Craig curated this festival documenting African-American cinema of the 1920s-1980s. Screenings included documentaries, blaxploitation films, and historical dramas. Support was provided by WAFI and McMenamins.</p>`;
  const block_7_text = `<p>This 2009 book by Raymond Burrell III documents the legacy of a historic landmark, Vancouver Avenue Baptist Church. Research for the book was funded by WAFI in partnership with Meyer Memorial Trust.</p>`;
  const block_8_text = `<p>Directed by Thara Memory, this 2009 stage program highlights Portland's jazz history during the 1940s-50s. Support was provided by WAFI and the Regional Arts & Culture Council.</p>`;
  const block_9_text = `<p>This permanent exhibit installed in 2009 tells the story of Portland’s African-American community in the early 1900s. In partnership with Central City Concern, WAFI served on the exhibit's advisory committee.</p>`;
  const block_10_text = `<p>Founded by WAFI in 1983, this multicultural jazz orchestra was comprised of middle and high school youth in Portland Public Schools under the direction of Thara Memory, Greg McKelvey, and Ronnye Harrison. In 2005, Memory went on to form the non-profit American Music Program to mentor youth jazz musicians and compete in national competitions. The program cultivated the talents of youth musicians such as Esperanza Spalding, Charlie Brown III, and Domo Branch.</p>`;
  const block_11_text = `<p>Released in 1985, this documentary film directed by Michael “Chappie” Grice captures the oral history of Oregon's African-American railroad porters in the early and mid-20th century. The film was produced by WAFI and funded by Oregon Humanities.</p>`;
  const block_12_text = `<p>Formed by director Kenneth W. Berry in 1982, the YouthSound mass choir and stage band was comprised of middle and high school youth in Portland Public Schools. The group performed throughout the 1980s at cultural events throughout the city of Portland.</p>`;
  const block_13_text = `<p>With assistance from WAFI, this 24-piece orchestra directed by Thara Memory performed a historical suite of 20th century jazz compositions, re-imagined through soul music and international influence. CJO performed unique thematic concerts throughout the Pacific Northwest during the 1970s and early 1980s.</p>`;
  const block_14_text = `<p>This 1978 oral history program featured theatrical performances drawing from the work of Dr. Martin Luther King, Jr. The program raised funds for scholarships sending African-American students to Catlin Gabel School. The program was produced by WAFI and broadcast on KGW-TV.</p>`;
  const block_15_text = `<p>This 1977 oral history program featured theatrical performances drawing from the work of W.E.B. DuBois, founder of the NAACP.</p>`;

  const video_url_1 = "https://world-arts-prod.s3.amazonaws.com/website/keep-alive-the-dream-full.mp4";
  const video_url_2 = "https://world-arts-prod.s3.amazonaws.com/website/sherman.mp4";
  const video_url_3 = "https://world-arts-prod.s3.amazonaws.com/website/sherman-documentary.mp4";
  const video_url_4 = "https://world-arts-prod.s3.amazonaws.com/website/railroad.mp4";
  const video_url_5 = "https://world-arts-prod.s3.amazonaws.com/website/youthsound.mp4";
  const video_url_6 = "https://world-arts-prod.s3.amazonaws.com/website/cjo.mp4";
  const video_url_7 = "https://world-arts-prod.s3.amazonaws.com/website/from-the-pulpit.mp4";

  const block_1_link = {
    text: "Watch the documentary",
    onClickFn: () => { playVideo(video_url_1, posterImage01) }
  }
  const block_2_link = {
    text: "Visit Albina Music Trust",
    url: "https://www.albinamusictrust.com"
  }
  const block_3_link = {
    text: "Visit Urban Wings",
    url: "https://urbanwings.club"
  }

  const block_4_link = {
    text: "View the article",
    url: "https://pamplinmedia.com/pt/9-news/285180-159735-alberta-street-then-and-now?wallit_nosession=1"
  }
  const block_4a_link = {
    text: "View the study",
    url: "http://www.orww.org/Alberta_Street_Project/"
  }
  const block_5_link = {
    text: "Visit the site",
    url: "https://racetalkspdx.com"
  }
  const block_6_link = {
    text: "View the article",
    url: "https://www.oregonlive.com/movies/2013/01/indie_arthouse_african_america.html"
  }
  const block_7_link = {
    text: "View the article",
    url: "https://www.oregonlive.com/portland/2009/08/relics_of_a_vibrant_faith_anti.html"
  }
  const block_8_link = {
    text: "Watch performance",
    onClickFn: () => { playVideo(video_url_2, posterImage02) }
  }
  const block_8a_link = {
    text: "Watch documentary",
    onClickFn: () => { playVideo(video_url_3) }
  }
  const block_9_link = {
    text: "Visit the site",
    url: "https://centralcityconcern.org/blog/the-golden-west-hotel/"
  }
  const block_10_link = {
    text: "Visit the site",
    url: "https://en.wikipedia.org/wiki/American_Music_Program"
  }
  const block_11_link = {
    text: "View the documentary",
    onClickFn: () => { playVideo(video_url_4) }
  }
  const block_12_link = {
    text: "View the performance",
    onClickFn: () => { playVideo(video_url_5, posterImage03) }
  }
  const block_13_link = {
    text: "View the performance",
    onClickFn: () => { playVideo(video_url_6) }
  }
  const block_14_link = {
    text: "View the performance",
    onClickFn: () => { playVideo(video_url_7, posterImage04) }
  }
  const block_15_link = {
    text: "View the program",
    url: "https://credo.library.umass.edu/view/pageturn/mums312-b287-i016/#page/5/mode/1up"
  }

  function playVideo(videoSrc, posterSrc) {
    setVideoSrc(videoSrc);
    setPosterSrc(posterSrc);
    setIsOpen(true);
  }
  

  return (
    <>
      <Nav />
      <Banner themeLight={false} alignLeft={true} headline="Our Work" className="--has-graphic --is-our-work" />
      <WorkBlock
        blockNumber="01"
        heading="Keep Alive The Dream"
        text={block_1_text}
        image={image01}
        imageLeft
        link={block_1_link}
      />
      <WorkBlock
        blockNumber="02"
        heading="Albina Music Trust"
        text={block_2_text}
        image={image02}
        link={block_2_link}
      />
      <WorkBlock
        blockNumber="03"
        heading="Urban Wings and Aerospace Leadership Club"
        text={block_3_text}
        image={image03}
        imageLeft
        link={block_3_link}
      />

      <div className="global-container">
        <h2 className="heading-xl">Our Legacy</h2>
        <Divider />
      </div>

      <WorkBlock
        heading="Alberta Street Project"
        text={block_4_text}
        image={image04}
        imageLeft
        link={block_4_link}
        link_2={block_4a_link}
      />

      <WorkBlock
        heading="Race Talks"
        text={block_5_text}
        image={image05}
        link={block_5_link}
      />

      <WorkBlock
        heading="Portland African-American Film Festival"
        text={block_6_text}
        image={image06}
        imageLeft
        link={block_6_link}
      />

      <WorkBlock
        heading="Yesterday, Today, and Forever: Vancouver Avenue Baptist Church"
        text={block_7_text}
        image={image07}
        link={block_7_link}
      />

      <WorkBlock
        heading="Sherman: A Jazz Opera"
        text={block_8_text}
        image={image08}
        imageLeft
        link={block_8_link}
        link_2={block_8a_link}
      />

      <WorkBlock
        heading="Golden West Hotel"
        text={block_9_text}
        image={image09}
        link={block_9_link}
      />

      <WorkBlock
        heading="Cultural Recreation Band / American Music Program"
        text={block_10_text}
        image={image10}
        imageLeft
        link={block_10_link}
      />

      <WorkBlock
        heading="Black Families and The Railroad in Oregon"
        text={block_11_text}
        image={image11}
        link={block_11_link}
      />

      <WorkBlock
        heading="YouthSound"
        text={block_12_text}
        image={image12}
        imageLeft
        link={block_12_link}
      />

      <WorkBlock
        heading="Creative Jazz Orchestra"
        text={block_13_text}
        image={image13}
        link={block_13_link}
      />

      <WorkBlock
        heading="From The Pulpit, From The People"
        text={block_14_text}
        image={image14}
        imageLeft
        link={block_14_link}
      />

      <WorkBlock
        heading="DuBois, An Oral History Program"
        text={block_15_text}
        image={image15}
        link={block_15_link}
      />

      <Footer />

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => { setIsOpen(false) }}
        className="modal"
        overlayClassName="overlay"
        contentLabel="Gallery Modal"
      >
        <Video videoSrc={videoSrc} themeLight={false} text="" poster={posterSrc} autoPlay />
        <button className="modalClose" onClick={() => { setIsOpen(false) }}></button>
      </Modal>
    </>
  );
}