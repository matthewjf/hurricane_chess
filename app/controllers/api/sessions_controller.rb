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
      render json: @errors, status: :unauthorized
    end
  end

  def destroy
    @user = current_user
    if @user
      logout
      render json: @user
    else
      @errors = ['not logged in']
      render json: @errors, status: :not_found
    end
  end

  def show
    if current_user
      @user = current_user
      render json: @user
    else
      @errors = nil
      render json: @errors, status: :not_found
    end
  end
end
