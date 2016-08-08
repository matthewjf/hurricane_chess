class ChangeStatusToEnum < ActiveRecord::Migration[5.0]
  def change
    remove_column :games, :status

    add_column :games, :status, :integer, default: 0, null: false
  end
end
