# Be sure to restart your server when you modify this file. Action Cable runs in a loop that does not support auto reloading.
class GameChannel < ApplicationCable::Channel
  def subscribed
    @game = Game.find(params[:game_id])
    reject unless join_current_user

    @game.update_state!
    stream_for @game
  end

  def unsubscribed
    if @game.pending?
      @game.remove_player(current_user)
    end

    @game.update_state!
  end

  protected
  def join_current_user
    return false unless current_user
    if @game.players.include?(current_user)
      # user already joined game
      true
    else
      @game.join(current_user)
      @game.save
    end
  end

end
