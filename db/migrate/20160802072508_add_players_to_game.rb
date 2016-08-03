class AddPlayersToGame < ActiveRecord::Migration[5.0]
  def change
    add_column :games, :white_player, :integer
    add_column :games, :black_player, :integer
    add_column :games, :password_digest, :string
  end
end
