Rails.application.routes.draw do
  mount ActionCable.server => '/cable'
  root 'static_pages#root'

  namespace :api, defaults: {format: :json} do
    resources :games, only: [:show, :index, :create]
    resources :users, only: [:new, :create]
    resource :session, only: [:new, :create, :destroy]
  end
end
