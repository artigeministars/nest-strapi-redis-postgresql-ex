import {
  DataSource,
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
} from 'typeorm';
import { TourStep } from './tour-step.entity';

@EventSubscriber()
export class TourStepSubscriber implements EntitySubscriberInterface<TourStep> {
  constructor(dataSource: DataSource) {
    dataSource.subscribers.push(this);
  }

  listenTo() {
    return TourStep;
  }

  beforeInsert(event: InsertEvent<TourStep>) {
    console.log(`BEFORE Table INSERTED: `, event.entity);
  }
}