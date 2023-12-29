export class Cards {

// private deck24_2 = ['TA','TK','TQ','TJ','T10','T9','CA','CK','CQ','CJ','C10','C9','SA','SK','SQ','SJ','S10','S9','HA','HK','HQ','HJ','H10','H9'];
// private deck28_3 = ['TA','TK','TQ','TJ','T10','T9','T8','CA','CK','CQ','CJ','C10','C9','C8','SA','SK','SQ','SJ','S10','S9','S8','HA','HK','HQ','HJ','H10','H9','H8'];
// private deck32_4 = ['TA','TK','TQ','TJ','T10','T9','T8','T7','CA','CK','CQ','CJ','C10','C9','C8','C7','SA','SK','SQ','SJ','S10','S9','S8','S7','HA','HK','HQ','HJ','H10','H9','H8','H7'];
private deck32_4 : string[] = [ '6h','7h','8h','9h','10h','jh','qh','kh','Ah','6d','7d','8d','9d','10d','jd','qd','kd','Ad','6c','7c','8c','9c','10c','jc','qc','kc','Ac','6s','7s','8s','9s','10s','js','qs','ks','As'];
private deck28_3 : string[] = ['7h','8h','9h','10h','jh','qh','kh','Ah','7d','8d','9d','10d','jd','qd','kd','Ad','7c','8c','9c','10c','jc','qc','kc','Ac','7s','8s','9s','10s','js','qs','ks','As'];
private deck24_2 : string[] = ['8h','9h','10h','jh','qh','kh','Ah','8d','9d','10d','jd','qd','kd','Ad','8c','9c','10c','jc','qc','kc','Ac','8s','9s','10s','js','qs','ks','As'];

private diamond  = ['TA','TK','TQ','TJ','T10','T9','T8','T7','T6','T5','T4','T3','T2']; // karo
private club     = ['CA','CK','CQ','CJ','C10','C9','C8','C7','C6','C5','C4','C3','C2']; // sinek
private spade    = ['SA','SK','SQ','SJ','S10','S9','S8','S7','S6','S5','S4','S3','S2']; // maça
private heart    = ['HA','HK','HQ','HJ','H10','H9','H8','H7','H6','H5','H4','H3','H2']; // kupa

private game_table_id: number = 0;

    shuffleDeck(array: Array<string>): string[] {
          for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
          }
          return array;
    }

    selectDeck(playerNumber: number) : string[] | null {
     if(playerNumber === 2) return this.deck24_2;
     else if(playerNumber === 3) return this.deck28_3;
     else if(playerNumber === 4) return this.deck32_4;
     else return null;
    }

}