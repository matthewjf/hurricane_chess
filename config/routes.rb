Rails.application.routes.draw do
  mount ActionCable.server => '/cable'
  root 'games#index'
end
