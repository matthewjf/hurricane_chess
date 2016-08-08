class Game < ApplicationRecord
  validates :name, presence: true
  enum status: [:pending, :active, :archived]

  has_many :user_games,
    foreign_key: :game_id

  has_many :users,
    through: :user_games,
    source: :user

  scope :index, -> {
    where(status: :pending).where(private: false).order(created_at: :desc)
  }

  def white
    users.where(color: :white)
  end

  COMMIT_ACTIONS.each do |action|
    send("after_#{action}_commit".to_sym) do
      broadcast_job(action)
    end
  end

  def broadcast_job(action)
    GameIndexBroadcastJob.perform_later data(action)
  end

  def data(action)
    {type: action, game: self}
  end
end
