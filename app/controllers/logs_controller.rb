class LogsController < ApplicationController
  # skip_before_action :authenticate_user!, only: [ :today ]

  def daily_log
    @today = DateTime.now
    @todays_am_routines = Task.where(user: current_user, routine: :morning, start_date: @today.beginning_of_day..@today.end_of_day)
    @todays_tasks_and_day_routines = Task.where(user: current_user, routine: [:not_recuring, :day], start_date: @today.beginning_of_day..@today.end_of_day)
    @todays_pm_routines = Task.where(user: current_user, routine: :evening, start_date: @today.beginning_of_day..@today.end_of_day)
  end

  def weekly_log
  end

  def monthly_log
  end

  def future_log
  end
end
