import { v4 as uuidv4 } from 'uuid';

const getUniqueId = (): string => {
    return uuidv4();
}

export default getUniqueId;