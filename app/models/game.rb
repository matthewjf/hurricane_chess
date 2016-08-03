class Game < ApplicationRecord
  enum state: [:pending, :active, :archived]

  after_create_commit { GameIndexBroadcastJob.perform_later(new_data) }

  scope :index, -> {
    where.not(status: :archived).where(private: false).order(created_at: :desc)
  }

  scope :archived, -> { where(status: :archived) }

  def new_data
    {type: 'new', game: self}
  end
end
