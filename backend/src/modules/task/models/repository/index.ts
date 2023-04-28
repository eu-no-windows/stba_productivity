import Task from '../entity/task.entity';
import { AppDataSource } from 'src/database/data-source';

const TaskRepository = AppDataSource.getRepository(Task);
export default TaskRepository;
