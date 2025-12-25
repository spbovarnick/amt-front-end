import DOMPurify from "isomorphic-dompurify";
import Link from "next/link"
import { Fragment } from "react"
import MultiPane from "./MultiPane"

export default function InfoBox({ item }){
  const cleanNotes = DOMPurify.sanitize(item.content_notes.body)

  return (
    <div className="info-box">
      {item.title &&
        <div className="top-info-set">
          <div className="is-label"><span>TITLE:</span></div>
          {item.title}
        </div>
      }
      {item.people.length > 0 &&
        <div className="top-info-set">
          <div className="is-label">PEOPLE:</div>
          {item.people.map((i, idx) => (
            <Fragment key={i.id}>
              <Link href={`/?people=${encodeURIComponent(i.name)}`}>{i.name}</Link>{idx < item.people.length - 1 ? ", " : ""}
            </Fragment>
          ))}
        </div>
      }
      {item.collections.length > 0 &&
        <div className="top-info-set">
          <div className="is-label">COURTESY OF:</div>
          {item.collections.map((i, idx) => (
            <Fragment key={i.id}>
              <Link href={`/?collections=${encodeURIComponent(i.name)}`}>{i.name}</Link>{idx < item.collections.length - 1 ? ", " : ""}
            </Fragment>
          ))}
        </div>
      }
      <MultiPane
        year={item.year}
        notes={item.content_notes}
        locations={item.locations}
        tags={item.tags}
        commGroups={item.comm_groups}
        credit={item.credit}
        cleanNotes={cleanNotes}
        id={item.id}
        uid={item.uid}
        title={item.title}
      />
    </div>
  )
}