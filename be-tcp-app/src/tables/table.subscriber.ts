import {
  DataSource,
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
} from 'typeorm';
import { Tables } from './table.entity';

@EventSubscriber()
export class TableSubscriber implements EntitySubscriberInterface<Tables> {
  constructor(dataSource: DataSource) {
    dataSource.subscribers.push(this);
  }

  listenTo() {
    return Tables;
  }

  beforeInsert(event: InsertEvent<Tables>) {
    console.log(`BEFORE Table INSERTED: `, event.entity);
  }
}