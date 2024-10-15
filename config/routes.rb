Rails.application.routes.draw do
  resources :restaurants
  devise_for :users
  get "/todays-log", to: "logs#today"
  root to: "pages#home"
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html
  resources :tasks
end
