Rails.application.routes.draw do
  mount ActionCable.server => '/cable'
  root 'games#index'
  resources :games, only: [:show, :index, :create]
end
