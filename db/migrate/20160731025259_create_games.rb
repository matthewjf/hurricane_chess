class CreateGames < ActiveRecord::Migration[5.0]
  def change
    create_table :games do |t|
      t.string :status, default: :pending
      t.boolean :private, default: false
      
      t.timestamps
    end
  end
end
