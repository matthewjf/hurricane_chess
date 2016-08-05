class GamesIndexChannel < ApplicationCable::Channel
  def subscribed
    stream_from "game_index_channel"
  end

  def unsubscribed
  end
end
