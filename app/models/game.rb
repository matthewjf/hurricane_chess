class Game < ApplicationRecord
  validates :name, presence: true

  enum status: [:pending, :active, :archived]

  belongs_to :white,
    primary_key: :id,
    foreign_key: :white_id,
    class_name: "User",
    optional: :true

  belongs_to :black,
    primary_key: :id,
    foreign_key: :black_id,
    class_name: "User",
    optional: :true

  scope :index, -> {
    pending.where(private: false).order(created_at: :desc)
  }

  # helpers

  def full?
    white.present? && black.present?
  end

  def empty?
    white.blank? && black.blank?
  end

  def should_be_removed?
    pending? && empty?
  end

  def should_activate?
    pending? && full?
  end

  # state updates
  after_save do
    destroy if should_be_removed?
    activate_in_10 if should_activate?
  end

  def activate_in_10
    ActivateGameJob.set(wait: 10.seconds).perform_later(self.id)
  end

  # player assignment
  def join(user)
    return false unless user
    return true if players.include?(user)

    if full?
      errors.add("game full")
    elsif white.present?
      self.black = user
    else
      self.white = user
    end
  end

  def join!(user)
    join(user)
    self.save
  end

  def remove_player(user)
    return false unless user && self.pending?
    self.white_id = nil if self.white_id == user.id
    self.black_id = nil if self.black_id == user.id
  end

  def remove_player!(user)
    remove_player(user)
    save
  end

  def players
    [white, black]
  end

  # broadcasting
  COMMIT_ACTIONS.each do |action|
    send("after_#{action}_commit".to_sym) do
      broadcast_job(action)
    end
  end

  def broadcast_job(action)
    GameIndexBroadcastJob.perform_now data(action)
    GameBroadcastJob.perform_now self, data(action)
  end

  def data(action)
    {action: action, game: self}
  end

  # validations

end
