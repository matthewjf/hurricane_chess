class GamesController < ApplicationController
  def index
    @games = Game.index
    @game = Game.new
    render :index
  end

  def show
    @game = Game.find(params[:id])
    if @game.users.count < 2
      render :show
    else
      # give user message
    end
  end

  def create
    @game = Game.new(game_params)
    if @game.save
      redirect_to @game
    else
      # handle error
    end
  end

  def game_params
    # params.require(:game).permit(:name, :private)
    params.require(:game).permit!
  end
end
