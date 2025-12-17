import Link from "next/link"
import { Fragment } from "react"
import ArchiveItemComment from "./ArchiveItemComment"

export default function InfoBox({ item }){

  return (
    <div className="info-box">
      {item.title &&
        <div className="info-set">
          <div className="is-label"><span>TITLE:</span></div>
          {item.title}
        </div>
      }
      {item.year &&
        <div className="info-set">
            <div className="is-label">YEAR:</div>
            {item.year}
        </div>
      }
      {item.content_notes.body &&
        <div className="info-set">
            <div className="is-label">NOTES:</div>
            <div dangerouslySetInnerHTML={{__html: item.content_notes.body}} />
        </div>
      }
      {item.locations.length > 0 &&
        <div className="info-set">
          <div className="is-label">LOCATION{item.locations.length > 1 ? "S" : ""}:</div>
          {item.locations.map((i, idx) => (
            <Fragment key={i.id}>
              <Link href={`/?locations=${encodeURIComponent(i.name)}`}>{i.name}</Link>
              {idx < item.locations.length - 1 ? ", " : ""}
            </Fragment>
          ))}
        </div>
      }
      {item.tags.length > 0 &&
        <div className="info-set">
          <div className="is-label">TAG{item.tags.length > 1 ? "S" : ""}:</div>
          {item.tags.map((i, idx) => (
            <Fragment key={i.id} >
              <Link href={`/?tags=${encodeURIComponent(i.name)}`}>{i.name}</Link>{idx < item.tags.length - 1 ? ", " : ""}
            </Fragment>
          ))}
        </div>
      }
      {item.comm_groups.length > 0 &&
        <div className="info-set">
          <div className="is-label">COMMUNITY GROUP{item.tags.length > 1 ? "S" : ""}:</div>
          {item.comm_groups.map((i, idx) => (
            <Fragment key={i.id}>
              <Link href={`/?comm_groups=${encodeURIComponent(i.name)}`}>{i.name}</Link>{idx < item.comm_groups.length - 1 ? ", " : ""}
            </Fragment>
          ))}
        </div>
      }
      {item.people.length > 0 &&
        <div className="info-set">
          <div className="is-label">PEOPLE:</div>
          {item.people.map((i, idx) => (
            <Fragment key={i.id}>
              <Link href={`/?people=${encodeURIComponent(i.name)}`}>{i.name}</Link>{idx < item.people.length - 1 ? ", " : ""}
            </Fragment>
          ))}
        </div>
      }
      {item.collections.length > 0 &&
        <div className="info-set">
          <div className="is-label">COURTESY OF:</div>
          {item.people.map((i, idx) => (
            <Fragment key={i.id}>
              <Link href={`/?collections=${encodeURIComponent(i.name)}`}>{i.name}</Link>{idx < item.collections.length - 1 ? ", " : ""}
            </Fragment>
          ))}
        </div>
      }
      {item.credit.length > 0 &&
        <div className="info-set">
          <div className="is-label">CREDIT:</div>
          <span>{item.credit}</span>
        </div>
      }
      <div className="info-set">
        <div className="is-label">RIGHTS:</div>
        <span>See <Link href={`/terms-of-use`}>Copyright, Terms of Use & Policies</Link>for more information. For all rights holder inquiries, please contactus us <Link href={"mailto:albinacommunityarchive@gmail.com"} target="_blank">here.</Link></span>
      </div>
      <ArchiveItemComment
        id={item.id}
        uid={item.uid}
        title={item.title}
        archiveComment={true}
      />
    </div>
  )
}