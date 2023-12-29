import {
  DataSource,
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
} from 'typeorm';
import { TablePotPlayerTransaction } from './table-pot-player-transaction.entity';

@EventSubscriber()
export class TablePotPlayerTransactionSubscriber implements EntitySubscriberInterface<TablePotPlayerTransaction> {
  constructor(dataSource: DataSource) {
    dataSource.subscribers.push(this);
  }

  listenTo() {
    return TablePotPlayerTransaction;
  }

  beforeInsert(event: InsertEvent<TablePotPlayerTransaction>) {
    console.log(`BEFORE Table-Pot-Player-Transaction INSERTED: `, event.entity);
  }
}