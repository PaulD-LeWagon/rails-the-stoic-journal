Rails.application.routes.draw do
  resources :restaurants
  devise_for :users
  get "/todays-log", to: "logs#today"
  get "/users/profile", to: "pages#profile"
  root to: "pages#home"
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html
  resources :tasks do
    resources :sub_tasks, path: "subtasks", only: [ :new, :create, :edit, :update ]
  end
  resources :sub_tasks, path: "subtasks", except: [ :new, :create, :edit, :update ]
end
