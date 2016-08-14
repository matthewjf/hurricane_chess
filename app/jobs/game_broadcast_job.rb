class GameBroadcastJob < ApplicationJob
  queue_as :default

  def perform(game, data)
    GameChannel.broadcast_to(game, data)
  end
end
