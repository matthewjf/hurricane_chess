Rails.application.routes.draw do
  mount ActionCable.server => '/cable'
  root 'static_pages#root'

  namespace :api, defaults: {format: :json} do
    resources :games, only: [:show, :index, :create]
    resource :user, only: [:create]
    resource :session, only: [:show, :create, :destroy]
  end
end
