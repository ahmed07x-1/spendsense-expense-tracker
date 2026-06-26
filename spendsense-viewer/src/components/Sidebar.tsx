import { useState } from "react";

function Sidebar() {
  const [active, setActive] = useState("dashboard");

  const menuItems = [
    {
      id: "dashboard",
      icon: "🏠",
      label: "Dashboard",
    },
    {
      id: "expenses",
      icon: "💳",
      label: "Expenses",
    },
    {
      id: "analytics",
      icon: "📈",
      label: "Analytics",
    },
    {
      id: "reports",
      icon: "📑",
      label: "Reports",
    },
    {
      id: "settings",
      icon: "⚙️",
      label: "Settings",
    },
  ];

  const scrollToSection = (id: string) => {
    setActive(id);

    const section = document.getElementById(id);

    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <h2>SpendSense</h2>
        <p>Expense Analytics</p>
      </div>

      <ul>
        {menuItems.map((item) => (
          <li
            key={item.id}
            className={active === item.id ? "active" : ""}
            onClick={() => scrollToSection(item.id)}
          >
            <span>{item.icon}</span>
            <span>{item.label}</span>
          </li>
        ))}
      </ul>
    </aside>
  );
}

export default Sidebar;