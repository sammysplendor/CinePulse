import "../style/MoviesTonight.css";
import Navbar from "../../components/Navbar";
import { Helmet } from "react-helmet";
import { Flame, Clapperboard, Lightbulb } from "lucide-react";

const MoviesTonight = () => {
  return (
    <>
      <Helmet>
        <title>CinePulse - Movies to Watch Tonight</title>
        <meta
          name="description"
          content="Find trending movies, explore ratings, and discover what to watch next with CinePulse."
        />
      </Helmet>

      <div className="seoPage">
        <Navbar />

        <div className="pageContent">
          <h1>Movies to Watch Tonight</h1>

          <p className="pageDescription">
            Looking for something great to watch tonight? Here are some of the
            best trending and highly-rated movies you can enjoy right now.
          </p>

          <section className="cards">
            <div className="card">
              <span className="iconContainer">
                <Flame fill="#00ffe1" className="cardIcon" />
              </span>

              <h2>Trending Picks This Week</h2>

              <ul>
                <li>Movie 1 - Action Thriller</li>
                <li>Movie 2 - Sci-Fi Adventure</li>
                <li>Movie 3 - Horror Crime</li>
              </ul>
            </div>

            <div className="card">
              <span className="iconContainer">
                <Clapperboard fill="#00ffe1" className="cardIcon" />
              </span>

              <h2>Why these movies?</h2>

              <p>
                These movies are selected based on popularity, ratings, and
                current viewer trends across major platforms.
              </p>
            </div>

            <div className="card">
              <span className="iconContainer">
                <Lightbulb fill="#00ffe1" className="cardIcon" />
              </span>

              <h2>More Recommendations</h2>

              <p>
                Visit the{" "}
                <a href="/explore">
                  <u>Explore Page</u>
                </a>{" "}
                to filter movies by genre, title, and popularity.
              </p>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default MoviesTonight;
