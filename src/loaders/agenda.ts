import { Container } from 'typedi'
import Agenda from 'agenda';
import config from '@/config';
import models from '@/models'

export default (mongoConnection) => {
    try {
        models.forEach(m => {
            Container.set(m.name, m.model)
        })
        const agendaInstance = new Agenda({
            mongo: mongoConnection,
            db: {
                address: config.databaseURL,
                collection: config.agenda.dbCollection
            },
            processEvery: config.agenda.pooltime,
            maxConcurrency: config.agenda.concurrency,

        });
        Container.set('agendaInstance', agendaInstance)
        return { agenda: agendaInstance }
    } catch (e) {
        throw e
    }
}