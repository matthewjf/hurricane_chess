class Api::GamesController < ApplicationController
  before_action :require_signed_in!, except: :index

  def index
    @games = Game.index
    @game = Game.new
    render json: @games
  end

  def create
    @game = Game.new(game_params)
    @game.join(current_user)
    
    if @game.save
      render json: @game
    else
      @errors = @game.errors.full_messages
      render json: @errors, status: :unprocessable_entity
    end
  end

  def game_params
    params.require(:game).permit(:name, :private)
  end
end
