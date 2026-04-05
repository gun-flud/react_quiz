import * as homeController from './home.controller.js'

export default function homeRoutes (fastify, components, done) {
    fastify.get('/', homeController.getHome);


    done();
}



