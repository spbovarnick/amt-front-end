import Link from "next/link"
import { Fragment } from "react"

export default function InfoBox({ item }){
  console.log(item.locations)

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
            <Fragment key={idx}>
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
            <Fragment key={idx} >
              <Link href={`/?tags=${encodeURIComponent(i.name)}`}>{i.name}</Link>{idx < item.tags.length - 1 ? ", " : ""}
            </Fragment>
          ))}
        </div>
      }
      <div className="info-set">

      </div>
    </div>
  )
}