import { FaCheckCircle } from "react-icons/fa";

interface Task {
  _id: string;
  title: string;
  status: string;
  description: string;
}

const CompletedTasks = ({ tasks }: { tasks: Task[] }) => {
  const completedTasks = tasks.filter((task) => task.status === "Completed");

  if (completedTasks.length === 0) {
    return (
      <div className="text-center text-gray-400 mt-10">
        No completed tasks yet.
      </div>
    );
  }

  return (
    <div className="overflow-y-auto h-full pr-2 space-y-3">
      {completedTasks.map((task) => (
        <div
          key={task._id}
          className="flex items-center p-3 bg-green-50 rounded-lg border border-green-100"
        >
          <FaCheckCircle className="text-green-500 text-xl mr-3" />
          <div>
            <h4 className="font-bold text-gray-800 text-sm">{task.title}</h4>
            <p className="text-xs text-gray-500 truncate w-40">
              {task.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CompletedTasks;
