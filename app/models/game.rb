class Game < ApplicationRecord
  enum state: [:pending, :active, :archived]

  # after_create_commit { GameIndexBroadcastJob.perform_later(self) }
  after_create_commit {ActionCable.server.broadcast 'game_index_channel', game: self}
  default_scope {
    where.not(status: :archived).where(private: false).order(created_at: :desc)
  }

  scope :archived, -> { where(status: :archived) }
end
