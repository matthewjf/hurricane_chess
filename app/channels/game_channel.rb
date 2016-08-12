# Be sure to restart your server when you modify this file. Action Cable runs in a loop that does not support auto reloading.
class GameChannel < ApplicationCable::Channel
  def subscribed
    @game = Game.find(params[:game_id])
    reject unless current_user.can_access_game?(@game)
    stream_for @game
  end

  def unsubscribed

  end

  protected
  def can_access_game?(game)
    
  end
end
