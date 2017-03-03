Rails.application.routes.draw do
  get 'hello_world', to: 'hello_world#index'
  root to: redirect('/videos')

  resources :videos, only: [:index, :show]
  resources :sessions, only: [:new, :create]

  resources :videos
  resources :sessions
end
