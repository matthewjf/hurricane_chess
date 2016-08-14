# Be sure to restart your server when you modify this file. Action Cable runs in a loop that does not support auto reloading.
class GameChannel < ApplicationCable::Channel
  def subscribed
    @game = Game.find(params[:game_id])
    reject unless join_current_user

    stream_for @game
  end

  def unsubscribed
    if @game.pending?
      @game.remove_player!(current_user)
    end
  end

  protected
  def join_current_user
    return false unless current_user
    @game.join!(current_user)
  end

end
