import Link from "next/link";

const Collections = ({ collections }) => {
  const groupedColl = collections.slice().sort((a,b) => a.name.localeCompare(b.name)).reduce((acc, c) => {
    const letter = c.name[0].toUpperCase();
    acc[letter] ??= [];
    acc[letter].push(c)
    return acc
  }, {})

  return (
    <div className="page-wrapper">
      <div className="collections heading">COLLECTIONS</div>
      <div className="collections-columns">
        {Object.entries(groupedColl).map(([letter, items]) => (
          <div key={letter}>
            <div className="heading xl">{letter}</div>
            <ul

              className="collections-alpha-group"
            >
              {items.map(c => (
                <li
                  key={c.id}
                  className="collections-li"
                >
                  <Link
                    href={`/archive?collections=${encodeURIComponent(c.name)}`}
                  >
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Collections;