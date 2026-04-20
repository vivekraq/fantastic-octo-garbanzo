import React from "react";
import { Link } from "react-router-dom";
function Hero() {
  return (
    <div className="container p-5 mb-5">
      <div className="row text-center">
        <img
          src="media/images/homeHero.png"
          alt="Hero Image"
          className="mb-5"
        />
        <h1 className="mt-5">Invest in everything</h1>
        <p>
          Online platform to invest in stocks, derivatives, mutual funds, and
          more
        </p>
        <div className="d-flex justify-content-center gap-3 mb-5">
          <Link to="/signup">
            <button
              className="p-2 btn btn-primary fs-5"
              style={{ width: "150px" }}
            >
              Signup Now
            </button>
          </Link>
          <Link to="/login">
            <button
              className="p-2 btn btn-outline-primary fs-5"
              style={{ width: "150px" }}
            >
              Login
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Hero;
