Rails.application.routes.draw do
  devise_for :users
  get "/daily-log", to: "logs#daily_log"
  get "/weekly-log", to: "logs#weekly_log"
  get "/monthly-log", to: "logs#monthly_log"
  get "/future-log", to: "logs#future_log"
  get "/users/profile", to: "pages#profile"
  get "/meet-the-team", to: "pages#meet_the_team"
  root to: "pages#home"
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html
  resources :tasks do
    resources :subtasks
  end
  resources :journal_entries, path: "journal-entries"
end
