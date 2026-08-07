import "../style/MoviesTonight.css";
import Navbar from "../../components/Navbar";
import { Helmet } from "react-helmet";
import { Flame, Clapperboard, Lightbulb } from "lucide-react";

const MoviesTonight = () => {
  return (
    <>
      <Helmet>
        <title>Movies to Watch Tonight | CinePulse</title>
        <meta
          name="description"
          content="Find movies worth watching tonight with CinePulse. Explore recommendations and discover your next movie night pick."
        />
        <link
          rel="canonical"
          href="https://cinepulse-xi.vercel.app/movies-to-watch-tonight"
        />

        <meta
          property="og:title"
          content="Movies to Watch Tonight | CinePulse"
        />

        <meta
          property="og:description"
          content="Find recommendation of movies worth watching tonight with CinePulse."
        />

        <meta property="og:type" content="website" />

        <meta
          property="og:url"
          content="https://cinepulse-xi.vercel.app/movies-to-watch-tonight"
        />

        <meta
          property="og:image"
          content="https://cinepulse-xi.vercel.app/cinepulse_logo.png"
        />

        <meta name="twitter:card" content="summary_large_image" />
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
                  • <strong>Sinners (2025)</strong> - A powerful and emotionally
                  intense drama that blends historical themes with suspense and
                  standout performances.
                </li>
                <li>
                  • <strong>Avatar: Fire and Ash (2025)</strong> - A visually
                  stunning sci-fi epic that expands the Avatar universe with new
                  conflicts and breathtaking worlds.
                </li>
                <li>
                  • <strong>The Odyssey (2026)</strong> - A grand cinematic
                  adaptation of the classic myth, combining action, adventure,
                  and storytelling on a massive scale.
                </li>
                <li>
                  • <strong>28 Years Later: The Bone Temple (2026)</strong> - A
                  dark and gripping post-apocalyptic thriller exploring survival
                  in a world still recovering from a deadly outbreak.
                </li>
                <li>
                  • <strong>War Machine (2026)</strong> - A high-intensity
                  modern action thriller centered around advanced warfare,
                  strategy, and global conflict, blending military tension with
                  fast-paced storytelling.
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
