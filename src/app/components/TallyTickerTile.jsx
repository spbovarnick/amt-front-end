import { motion } from "motion/react";

const LOOPS = 2;


const STRIP = Array.from({ length: LOOPS * 10 + 1 }, (_, i) => i % 10);

const TallyTickerTile = ({ digit, position }) => {
  // Land on this digit's copy in the last loop, so every tile spins past the earlier loops first
  const target = (LOOPS - 1) * 10 + digit;

  return(
    <div className="tile">
      <motion.div
        className="digit-container"
        initial={{ y: 0}}
        whileInView={{
          y: `calc(-${target} * var(--slot))`,
        }}
        viewport={{ once: true }}
        transition={{
          type: "tween",
          duration: 1.5,
          ease: "easeOut",
          delay: position * .1,
        }}
      >
        {STRIP.map((n, i) =>
          <div key={i} className="digit">
            {n}
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default TallyTickerTile;
