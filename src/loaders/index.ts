
import expressLoader from './express';
import mongooseLoader from './mongoose';
import setAgenda from './agenda';

export default async ({ expressApp }) => {
    console.log("开始连接DB")
    console.time("db连接:")
    const mongoConnection = await mongooseLoader();
    console.timeEnd("db连接:")
    //set con in agenda & Container.set('agendaInstance') & Container.set(m.name,m.model) 
    //方便Container.get(xxx) 使用
    //agenda 连接池
    await setAgenda(mongoConnection)

    await expressLoader({ app: expressApp });
}
