class CreateUsers < ActiveRecord::Migration[5.0]
  def change
    create_table :users do |t|
      t.string :username,        limit: 255, null: false
      t.string :password_digest, limit: 255, null: false
      t.string :session_token,   limit: 255, null: false

      t.timestamps
    end
  end
end
