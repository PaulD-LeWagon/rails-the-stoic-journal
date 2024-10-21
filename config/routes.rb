Rails.application.routes.draw do
  devise_for :users
  get "/todays-log", to: "logs#today"
  get "/users/profile", to: "pages#profile"
  get "/meet-the-team", to: "pages#meet_the_team"
  root to: "pages#home"
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html
  resources :tasks do
    resources :sub_tasks, path: "subtasks", only: [ :new, :create ]
  end
  resources :sub_tasks, path: "subtasks", only: [ :index, :show, :edit, :update, :destroy ]
  resources :journal_entries, path: "journal-entries"
end
