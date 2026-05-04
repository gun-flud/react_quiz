import * as homeController from './home.controller.js'

export default function homeRoutes (fastify, components, done) {
    fastify.get('/', homeController.getHome);

    fastify.get('/quiz/:id', homeController.getById);

    fastify.post('/create', homeController.create);

    fastify.delete('/delete/:id', homeController.deleteById);

    fastify.put('/edit/:id', homeController.editById);

    done();
}