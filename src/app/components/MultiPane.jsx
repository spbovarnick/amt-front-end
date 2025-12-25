import ArchiveItemComment from "./ArchiveItemComment"
import Link from "next/link"
import { Fragment } from "react"

export default function MultiPane({
  year,
  notes,
  locations,
  tags,
  commGroups,
  credit,
  cleanNotes,
  id,
  uid,
  title
}) {

  return (
    <div className="info-pane">
      <div className="left-col-info">
        {commGroups.length > 0 &&
          <div className="info-set">
            <div className="is-label">COMMUNITY GROUP{tags.length > 1 ? "S" : ""}:</div>
            {commGroups.map((i, idx) => (
              <Fragment key={i.id}>
                <Link href={`/?comm_groups=${encodeURIComponent(i.name)}`}>{i.name}</Link>{idx < commGroups.length - 1 ? ", " : ""}
              </Fragment>
            ))}
          </div>
        }
        {notes.body &&
          <div className="info-set">
            <div className="is-label">NOTES:</div>
            <div dangerouslySetInnerHTML={{ __html: cleanNotes }} />
          </div>
        }
        {tags.length > 0 &&
          <div className="info-set">
            <div className="is-label">TAG{tags.length > 1 ? "S" : ""}:</div>
            {tags.map((i, idx) => (
              <Fragment key={i.id} >
                <Link href={`/?tags=${encodeURIComponent(i.name)}`}>{i.name}</Link>{idx < tags.length - 1 ? ", " : ""}
              </Fragment>
            ))}
          </div>
        }
        {year &&
          <div className="info-set">
            <div className="is-label">YEAR:</div>
            {year}
          </div>
        }
      </div>
      <div className="right-col-info">
        {credit.length > 0 &&
          <div className="info-set">
            <div className="is-label">CREDIT:</div>
            <span>{credit}</span>
          </div>
        }
        {locations.length > 0 &&
          <div className="info-set">
            <div className="is-label">LOCATION{locations.length > 1 ? "S" : ""}:</div>
            {locations.map((i, idx) => (
              <Fragment key={i.id}>
                <Link href={`/?locations=${encodeURIComponent(i.name)}`}>{i.name}</Link>
                {idx < locations.length - 1 ? ", " : ""}
              </Fragment>
            ))}
          </div>
        }
        <ArchiveItemComment
          id={id}
          uid={uid}
          title={title}
          archiveComment={true}
        />
      </div>
    </div>
  )
}