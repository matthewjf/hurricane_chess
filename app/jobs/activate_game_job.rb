class ActivateGameJob < ApplicationJob
  queue_as :default

  def perform(game_id)
    @game = Game.find(game_id)
    if @game.should_activate?
      @game.active!
    end
  end
end
