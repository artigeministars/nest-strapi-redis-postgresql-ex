import {
    DataSource,
    EntitySubscriberInterface,
    EventSubscriber,
    InsertEvent,
} from "typeorm";
import { TablePlayerWalletTransaction } from "./table-player-wallet-transactions.entity";

@EventSubscriber()
export class TablePlayerWalletTransactionSubscriber implements EntitySubscriberInterface<TablePlayerWalletTransaction> {

    constructor( dataSource: DataSource){
        dataSource.subscribers.push(this);
    }

    listenTo() {
        return TablePlayerWalletTransaction;
    }

    beforeInsertEvent( event: InsertEvent<TablePlayerWalletTransaction>) {
        console.log(`BEFORE Table table-player-wallet-transaction INSERTED: `, event.entity);
    }
}