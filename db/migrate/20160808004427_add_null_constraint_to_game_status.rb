class AddNullConstraintToGameStatus < ActiveRecord::Migration[5.0]
  def change
    change_column :games, :status, :string, null: false
  end
end
