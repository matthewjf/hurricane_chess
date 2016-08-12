Rails.application.routes.draw do
  mount ActionCable.server => '/cable'
  root 'static_pages#root'

  namespace :api, defaults: {format: :json} do
    resources :games, only: [:index, :create]
    resource :user, only: [:create]
    resource :session, only: [:show, :create, :destroy]
    post 'games/:id', to: 'games#join'
  end
end
