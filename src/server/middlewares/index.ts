import logger from './logger';
import checkMethod from './checkMethod';
// The order of middlewares matter
export default {
    checkMethod,
    logger,
};
