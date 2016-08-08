class Api::SessionsController < ApplicationController
  def create
    @user = User.find_by_credentials(
      params[:user][:username],
      params[:user][:password]
    )

    if @user
      login(@user)
      render json: @user
    else
      @errors = ['invalid credentials']
      render json: @errors, status: 401
    end
  end

  def destroy
    @user = current_user
    if @user
      logout
      render json: @user
    else
      @errors = ['no one logged in']
      render json: @errors, status: 404
    end
  end

  def show
    if current_user
      @user = current_user
      render json: {id: @user.id, username: @user.username}
    else
      @errors = nil
      render json: @errors, status: 404
    end
  end
end
