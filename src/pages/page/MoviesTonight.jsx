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
          <h1>Movies to Watch Tonight (2025-2026)</h1>

          <p className="pageDescription">
            Looking for the best movies to watch tonight? Here are some of the
            most recent and trending films from 2025 and 2026 - carefully
            selected across different genres to match your mood.
          </p>

          <section className="cards">
            <div className="card">
              <span className="iconContainer">
                <Flame fill="#00ffe1" className="cardIcon" />
              </span>

              <h2>Top Picks Right Now</h2>

              <ul>
                <li>
                  <strong>Sinners (2025)</strong> - A powerful and emotionally
                  intense drama that blends historical themes with suspense and
                  standout performances.
                </li>
                <li>
                  <strong>Avatar: Fire and Ash (2025)</strong> - A visually
                  stunning sci-fi epic that expands the Avatar universe with new
                  conflicts and breathtaking worlds.
                </li>
                <li>
                  <strong>The Odyssey (2026)</strong> - A grand cinematic
                  adaptation of the classic myth, combining action, adventure,
                  and storytelling on a massive scale.
                </li>
                <li>
                  <strong>28 Years Later: The Bone Temple (2026)</strong> - A
                  dark and gripping post-apocalyptic thriller exploring survival
                  in a world still recovering from a deadly outbreak.
                </li>
                <li>
                  <strong>War Machine (2026)</strong> - A high-intensity modern
                  action thriller centered around advanced warfare, strategy,
                  and global conflict, blending military tension with fast-paced
                  storytelling.
                </li>
              </ul>
            </div>

            <div className="card">
              <span className="iconContainer">
                <Clapperboard fill="#00ffe1" className="cardIcon" />
              </span>

              <h2>Why these movies?</h2>

              <p>
                These films are selected based on recent popularity, audience
                interest, and critical attention. Whether you enjoy action,
                drama, or thrillers, this list offers some of the best modern
                options available right now.
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
                to discover more movies by genre, title, popularity, and find
                the perfect film for your mood.
              </p>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default MoviesTonight;
