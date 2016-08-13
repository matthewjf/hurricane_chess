class ActivateGameJob < ApplicationJob
  queue_as :default

  def perform(game_id)
    @game = Game.find(game_id)
    @game.active! if @game.should_activate?
  end
end
