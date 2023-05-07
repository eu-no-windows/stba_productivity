import UserApp from '../entity';
import { AppDataSource } from 'src/database/data-source';

const UserAppRepository = AppDataSource.getRepository(UserApp);
export default UserAppRepository;
