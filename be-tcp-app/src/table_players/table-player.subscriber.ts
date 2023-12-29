import {
     DataSource ,
     EntitySubscriberInterface,
     EventSubscriber,
     InsertEvent,
} from 'typeorm';
import { TablePlayer } from './table-player.entity';

@EventSubscriber()
export class TablePlayerSubscriber implements EntitySubscriberInterface<TablePlayer> {

    constructor(dataSource: DataSource) {
        dataSource.subscribers.push(this);
    }

    listenTo() {
        return TablePlayer;
    }

    beforeInsert(event: InsertEvent<TablePlayer>) {
        console.log(`BEFORE Table INSERTED: `, event.entity);
    }

}