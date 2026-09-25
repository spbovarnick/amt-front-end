import TallyTickerTile from "./TallyTickerTile";

const TallyTicker = ({ count }) => {
  const filesDigits = String(count).split("");

  return (
    <div className="tally-container">
      {filesDigits.map((d, i) => (
        <TallyTickerTile
          key={filesDigits.length - i}
          digit={Number(d)}
          position={filesDigits.length - i}
        />

      ))}
    </div>
  );
};

export default TallyTicker;