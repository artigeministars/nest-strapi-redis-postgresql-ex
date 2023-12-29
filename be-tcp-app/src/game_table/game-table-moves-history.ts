export class historyType {
    user_id: number;
    move_type: string;
    move_amount: number;
    table_id: number;
    tour_step: string
};

export class GameTableMovesHistory {

private moves_history: historyType[];

 setHistory(data: historyType ) : void {
 this.moves_history.push(data);
 }

 getHistory() : unknown {
    return this.moves_history;
 }

}

