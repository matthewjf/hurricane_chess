# Be sure to restart your server when you modify this file. Action Cable runs in a loop that does not support auto reloading.
class GameChannel < ApplicationCable::Channel
  identified_by :user_id
  def subscribed
    @game = Game.find(params[:game_id])
    stream_for @game
  end

  def unsubscribed

  end
end
