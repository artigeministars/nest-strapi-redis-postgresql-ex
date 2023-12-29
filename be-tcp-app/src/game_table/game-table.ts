export class GameTable {

  game_table_socket_id: string;
  game_table_moves_socket_id: string;
  game_table_id: number;
  game_table_parent_id: number;
  game_table_name: string;
  game_table_kav: number;
  game_table_min_coin: number;
  game_table_max_coin: number;
  game_table_pot: number;
  game_table_status: string;

  game_order_user_id: number;

  user_1_id : string;
  user_2_id : string;
  user_3_id : string;
  user_4_id : string;

  user_1_username : string;
  user_2_username : string;
  user_3_username : string;
  user_4_username : string;

  user_1_wallet : number;
  user_2_wallet : number;
  user_3_wallet : number;
  user_4_wallet : number;

  user_1_kav : number;
  user_2_kav : number;
  user_3_kav : number;
  user_4_kav : number;

  user_1_status : string;
  user_2_status : string;
  user_3_status : string;
  user_4_status : string;

  user_1_current_move : string;
  user_2_current_move : string;
  user_3_current_move : string;
  user_4_current_move : string;

  user_1_socket_id : string;
  user_2_socket_id : string;
  user_3_socket_id : string;
  user_4_socket_id : string;

  user_1_seating_order : number;
  user_2_seating_order : number;
  user_3_seating_order : number;
  user_4_seating_order : number;

  current_active_user_id : number;
  players_count : number; // oynayan oyuncu sayısı
  kav_count: number;
  tour_count : number;
  total_players : number; // toplam oyuncu sayısı, normalde 4 olmalı

  winner_id : number;
  winner_score : number;
  winner_price : number;

  D_user_id: number;
}