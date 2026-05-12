import type { StatCard } from "../dashboard-data";
import { CalendarIcon, ClockIcon, PieIcon, SparkleIcon } from "./icons";

export function StatsGrid({ stats }: { stats: StatCard[] }) {
  return (
    <section className="stats-grid">
      {stats.map((stat) => (
        <article key={stat.label} className="stat-card">
          <div className={`stat-icon stat-icon-${stat.icon}`}>
            <StatIcon icon={stat.icon} />
          </div>
          <div>
            <p className="stat-label">{stat.label}</p>
            <p className="stat-value">{stat.value}</p>
          </div>
        </article>
      ))}
    </section>
  );
}

function StatIcon({ icon }: { icon: StatCard["icon"] }) {
  if (icon === "sessions") return <PieIcon />;
  if (icon === "duration") return <ClockIcon />;
  if (icon === "ai") return <SparkleIcon />;
  return <CalendarIcon />;
}
