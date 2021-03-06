Rails.application.routes.draw do
  root to: redirect('/videos')

  resources :videos, only: [:index, :show]
  resources :sessions, only: [:new]

  resources :videos
  resources :sessions
end
