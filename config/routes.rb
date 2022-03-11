Rails.application.routes.draw do
  resources :follows
  resources :user_items, only: [:create, :update, :show, :destroy]
  resources :items, only: [ :index, :show, :create, :update, :destroy ]
  resources :users, only: [ :index, :show, :create, :update, :destroy ] do
    resources :user_items, only: [ :index, :create, :show, :update, :destroy ]
  end

  resources :users do
    resources :follows, only: [:index, :destroy]
  end

  resources :follows, only: [:create]


  post '/login', to: 'sessions#create'
  delete '/logout', to: 'sessions#destroy'
  get '/me', to: 'users#show'
end