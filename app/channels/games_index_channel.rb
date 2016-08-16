class GamesIndexChannel < ApplicationCable::Channel
  def subscribed
    stop_all_streams
    stream_from "game_index_channel"
  end

  def unsubscribed
  end
end
