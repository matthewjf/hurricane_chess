class UserGame < ApplicationRecord
  validates :user, presence: true
  enum color: [:white, :black]
  belongs_to :user
  belongs_to :game
end
