Rails.application.routes.draw do
  mount ActionCable.server => '/cable'
  root 'games#index'
  resources :games, only: [:show, :index, :create]
  resources :users, only: [:new, :create]
  resource :session, only: [:new, :create, :destroy]
end
