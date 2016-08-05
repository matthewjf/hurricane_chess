class Game < ApplicationRecord
  validates :name, presence: true
  enum state: [:pending, :active, :archived]

  has_many :user_games,
    foreign_key: :game_id

  has_many :users,
    through: :user_games,
    source: :user

  after_create_commit { GameIndexBroadcastJob.perform_later(new_data) }

  scope :index, -> {
    where.not(status: :archived).where(private: false).order(created_at: :desc)
  }

  scope :archived, -> { where(status: :archived) }

  def new_data
    {type: 'new', game: self}
  end
end
