class GamesController < ApplicationController
  def index
    @games = Game.all
    @game = Game.new
    render :index
  end

  def show
    @game = Game.find(params[:id])
  end

  def create
    @game = Game.new(game_params)
    if @game.save
      redirect_to @game
    else
    end
  end

  def game_params
    # params.require(:game).permit(:name, :private)
    params.require(:game).permit!
  end
end
