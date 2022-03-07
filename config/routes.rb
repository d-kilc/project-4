Rails.application.routes.draw do
  # resources :user_items
  resources :items, only: [ :index, :show, :create, :update, :destroy ]
  resources :users, only: [ :index, :show, :create, :update, :destroy ] do
    resources :user_items, only: [ :index, :create, :show, :update, :destroy ]
  end

  post '/login', to: 'sessions#create'
  delete '/logout', to: 'sessions#destroy'
  get '/me', to: 'users#show'
end
