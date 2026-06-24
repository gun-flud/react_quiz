import { authenticate } from "../apps/auth/middlewares/authenticate";
import homeRoutes from "../apps/home/entry-points/home.routes";

export default async function protectedRoutes (childserver) {
    childserver.addHook('preHandler', authenticate);

    childserver.register(homeRoutes, { prefix: '/home'});
    //...
}

