class AddUserGames < ActiveRecord::Migration[5.0]
  def change
    create_table :user_games do |t|
      t.references :user, null: false
      t.references :game, null: false
      t.string     :color,   null: false
    end

    remove_column :games, :white_player, :integer
    remove_column :games, :black_player, :integer
  end
end
