class Game < ApplicationRecord
  validates :name, presence: true
  validate :validate_players

  enum status: [:pending, :active, :archived]

  has_many :user_games,
    foreign_key: :game_id

  has_many :players,
    through: :user_games,
    source: :user

  scope :index, -> {
    pending.where(private: false).order(created_at: :desc)
  }

  def should_be_removed?
    players.count == 0 && pending?
  end

  # player assignment
  def white
    user = user_games.where(color: :white).first.try(&:user)
    user.present? ? user : nil
  end

  def white=(user)
    user_game = UserGame.new(color: :white)
    user_game.user = user
    user_game.game = self
    self.user_games << user_game
  end

  def black
    user = user_games.where(color: :black).first.try(&:user)
    user.present? ? user : nil
  end

  def black=(user)
    user_game = UserGame.new(color: :black)
    user_game.user = user
    user_game.game = self
    self.user_games << user_game
  end

  def join(user)
    self.white ? self.black=(user) : self.white=(user)
  end

  def remove_player(user)
    user_games.where(user_id: user.id).destroy_all if user
  end

  # broadcasting
  COMMIT_ACTIONS.each do |action|
    send("after_#{action}_commit".to_sym) do
      broadcast_job(action)
    end
  end

  def broadcast_job(action)
    # GameIndexBroadcastJob.perform_later data(action)
    ActionCable.server.broadcast 'game_index_channel', data(action)
  end

  def data(action)
    {action: action, game: self}
  end

  # validations
  def validate_players
    if user_games.where(color: :white).count > 1
      errors.add(:white, 'white already assigned')
    end

    if user_games.where(color: :black).count > 1
      errors.add(:black, 'black already assigned')
    end

    if players.count > 2
      errors.add(:players, '2 players already assigned')
    end

    if white && black && white.id == black.id
      errors.add(:players, "players must be unqiue")
    end
  end
end
