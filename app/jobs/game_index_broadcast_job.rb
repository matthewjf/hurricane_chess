class GameIndexBroadcastJob < ApplicationJob
  queue_as :default

  def perform(data)
    ActionCable.server.broadcast('game_index_channel', data)
  end
end
