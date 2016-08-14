class GameBroadcastJob < ApplicationJob
  queue_as :default

  def perform(data)
    ActionCable.server.broadcast("game_channel_#{data[:game].id}", data)
  end
end
