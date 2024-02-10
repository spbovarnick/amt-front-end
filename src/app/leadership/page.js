'use client';

import { useEffect, useState } from "react"
import { getLeadershipBoard, getLeadershipStaff } from "@/utils/api"
import Banner from "../components/Banner"
import GalleryStaff from "../components/GalleryStaff"
import TextBlock from "../components/TextBlock"
import Footer from "../components/Footer"
import Nav from "../components/Nav"

import galleryImage01 from 'public/images/board/boardmember_01.jpg';
import galleryImage02 from 'public/images/board/boardmember_02.jpg';
import galleryImage03 from 'public/images/board/boardmember_03.jpg';
import galleryImage04 from 'public/images/board/boardmember_04.jpg';
import galleryImage05 from 'public/images/board/boardmember_05.jpg';
import galleryImage06 from 'public/images/board/boardmember_06.jpg';
import galleryImage07 from 'public/images/board/boardmember_07.jpg';
import galleryImage08 from 'public/images/board/boardmember_08.jpg';

export default function LeadershipPage() { 
  const [boardItems, setBoardItems] = useState(null);
  const [staffItems, setStaffItems] = useState(null);

  // get data on mount
  useEffect(() => {
    (async () => {
      const boardData = await getLeadershipBoard()
      if (boardData) {
        setBoardItems(boardData.data);
      }

      const staffData = await getLeadershipStaff()
      if (staffData) {
        setStaffItems(staffData.data);
      }
    })()
  }, []);

  const boardSlides = [
    {
      key: 7,
      url: galleryImage07,
      name: "Donny R. Adair",
      role: "Board Member",
    },
    {
      key: 3,
      url: galleryImage03,
      name: "Kenneth W. Berry",
      role: "Secretary/Treasurer",
    },
    {
      key: 4,
      url: galleryImage04,
      name: "Sunshine Dixon",
      role: "Board Member",
    },
    {
      key: 6,
      url: galleryImage06,
      name: "Michael Grice",
      role: "President",
    },
    {
      key: 2,
      url: galleryImage02,
      name: "Shelia Searight",
      role: "Board Member",
    },
    {
      key: 5,
      url: galleryImage05,
      name: "Gwen Thompson",
      role: "Board Member",
    },
  ];

  const staffSlides = [
    {
      key: 8,
      url: galleryImage08,
      name: "Bobby Smith",
      role: "Archivist",
    },
    {
      key: 1,
      url: galleryImage01,
      name: "Sandra Wadsworth",
      role: "Executive Director",
    },
  ];

  const executiveText = `Kevin Berry, Val Peterson, Joe "Bean" Keller, Arietta Ward, Heather Coleman-Cox, James Wright, Bobby Pallotta, Steve Hollingsworth, Pat Dobbins, Pearl Hill, Dr. Harriet Adair, Cheanice Stone, Lessie Williams`;
  const advisoryText = `Jasmine Wadsworth, Cedric Berry, Anne Morin, Lavern Davis, Charles Hunter, Chisao Hata, Richard Donin, Cottrell White`;

  return ( 
    <div className="page-wrapper --is-leadership">
      <Nav />
      <Banner themeLight={false} alignLeft={true} headline="Leadership" className="--has-graphic --is-leadership" />
      <GalleryStaff slides={boardItems} headline="Our Board" />
      <GalleryStaff slides={staffItems} headline="Our Staff" />
      <TextBlock className="team-text" themeLight={true} heading="Executive Team" leftText={executiveText} singleCol />
      <TextBlock themeLight={true} heading="Advisory Council" leftText={advisoryText} vPadding="lg" singleCol />
      <Footer />
    </div>
  )
}