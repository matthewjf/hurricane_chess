class Api::UsersController < ApplicationController
  def new
    @user = User.new
  end

  def create
    @user = User.new(user_params)

    if @user.save
      login(@user)
      render json: @user
    else
      @errors = @user.errors.full_messages
      render json: @errors, status: :unprocessable_entity
    end
  end

  private
  def user_params
    params.require(:user).permit(:password, :username)
  end
end
