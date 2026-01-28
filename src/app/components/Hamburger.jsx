const Hamburger = ({ isActive, handleClick }) => {

  return (
    <button
      className="nav-burger"
      onClick={(e) => handleClick(e)}
    >
      <div className="burger-box">
        <div className="inner-burger-box">
          <div className={`top-bun ${isActive ? "burger--active" : ""}`}></div>
          <div className={`patty ${isActive ? "burger--active" : ""}`}></div>
          <div className={`bottom-bun ${isActive ? "burger--active" : ""}`}></div>
        </div>
      </div>
    </button>
  )
}

export default Hamburger;