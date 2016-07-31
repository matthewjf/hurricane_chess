class Game < ApplicationRecord
  enum state: [:pending, :active, :archived]

  default_scope {
    where.not(status: :archived).where(private: false).order(created_at: :desc)
  }
  
  scope :archived, -> { where(status: :archived) }
end
