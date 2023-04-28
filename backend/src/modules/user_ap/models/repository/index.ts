import UserApp from '../entity/user_app.entity';
import { AppDataSource } from 'src/database/data-source';

const UserAppRepository = AppDataSource.getRepository(UserApp);
export default UserAppRepository;
