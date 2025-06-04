import {AddTeamMember} from "./TeamMemberForm";
import {AddTask} from "./TaskCreator";
//import { AssignTask } from "./AssignTask";
//mport { MarkTaskFinished } from "./MarkTaskFinished";
//import { DeleteFinishedTask } from "./DeleteFinishedTask";
import { TaskBoard } from "./TaskBoard";

export function App() {
  return (
    <div>
      <h1>Scrum Board</h1>
      <AddTeamMember />
      <AddTask/>
      <TaskBoard/>
    </div>
  );
}

export default App;
