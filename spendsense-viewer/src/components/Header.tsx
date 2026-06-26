interface HeaderProps {
  theme: string;
  setTheme: (theme: string) => void;
}

function Header({
  theme,
  setTheme,
}: HeaderProps) {
  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <header className="header">

      <div className="header-left">

        <h1>
          Welcome Back 👋
        </h1>

        <p>
          {today}
        </p>

      </div>

      <div className="header-right">

        <button className="notification-btn">
          🔔
        </button>

        <button
          className="theme-btn"
          onClick={() =>
            setTheme(
              theme === "dark"
                ? "light"
                : "dark"
            )
          }
        >
          {theme === "dark"
            ? "☀ Light"
            : "🌙 Dark"}
        </button>

        <div className="profile">

          <div className="avatar">
            A
          </div>

          <div>

            <h4>Ahmed</h4>

            <p>Developer</p>

          </div>

        </div>

      </div>

    </header>
  );
}

export default Header;