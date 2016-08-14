class MoveUsersToGame < ActiveRecord::Migration[5.0]
  def change
    add_reference :games, :white, references: :user, index: true
    add_reference :games, :black, references: :user, index: true
  end
end
