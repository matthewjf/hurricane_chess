class GameIndexBroadcastJob < ApplicationJob
  queue_as :default

  def perform(game)
    ActionCable.server.broadcast 'game_index_channel', game: game
  end
end
