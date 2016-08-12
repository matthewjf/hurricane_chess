# Be sure to restart your server when you modify this file. Action Cable runs in a loop that does not support auto reloading.
class GameChannel < ApplicationCable::Channel
  def subscribed
    @game = Game.find(params[:game_id])
    reject unless join(game)

    stream_for @game
  end

  def unsubscribed

  end

  protected
  def join(game)
    if @game.players.include?(current_user)
      # user already joined game
      true
    else
      @game.join(current_user)
      @game.save
    end
  end
end
