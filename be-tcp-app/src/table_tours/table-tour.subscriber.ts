import {
  DataSource,
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
} from 'typeorm';
import { TableTour } from './table-tour.entity';

@EventSubscriber()
export class TableTourSubscriber implements EntitySubscriberInterface<TableTour> {
  constructor(dataSource: DataSource) {
    dataSource.subscribers.push(this);
  }

  listenTo() {
    return TableTour;
  }

  beforeInsert(event: InsertEvent<TableTour>) {
    console.log(`BEFORE Table-Tour INSERTED: `, event.entity);
  }
}