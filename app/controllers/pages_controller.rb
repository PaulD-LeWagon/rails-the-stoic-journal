class PagesController < ApplicationController
  skip_before_action :authenticate_user! #, only: [ :home, :meet_the_team ]

  def home
  end

  def profile
    @morning_routines = Task.filter_by_user_routines(current_user, "morning")
    @day_routines = Task.filter_by_user_routines(current_user, "day")
    @evening_routines = Task.filter_by_user_routines(current_user, "evening")
  end

  def meet_the_team
  end
end
