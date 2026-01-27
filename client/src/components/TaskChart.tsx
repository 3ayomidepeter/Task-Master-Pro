import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";

interface Task {
  status: string;
}

const TaskChart = ({ tasks }: { tasks: Task[] }) => {
  // 1. Calculate the counts
  const completed = tasks.filter((t) => t.status === "Completed").length;
  const inProgress = tasks.filter((t) => t.status === "In Progress").length;
  const notStarted = tasks.filter((t) => t.status === "Not Started").length;

  // 2. Format data for Recharts
  const data = [
    { name: "Completed", value: completed, color: "#10B981" }, // Green
    { name: "In Progress", value: inProgress, color: "#3B82F6" }, // Blue
    { name: "Not Started", value: notStarted, color: "#E5E7EB" }, // Gray
  ];

  // Prevent empty chart ugliness
  if (tasks.length === 0) {
    return (
      <div className="text-center text-gray-400 mt-10">
        Add tasks to see analytics
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="35%"
          innerRadius={50} // Makes it a Donut
          outerRadius={70}
          paddingAngle={5}
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip />
        <Legend
          layout="vertical"
          verticalAlign="bottom"
          //   height={36}
          align="center"
          //   iconSize={10}
          wrapperStyle={{ fontSize: "12px" }}
        />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default TaskChart;
