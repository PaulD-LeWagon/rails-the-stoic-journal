class LogsController < ApplicationController
  # skip_before_action :authenticate_user!, only: [ :today ]
  before_action :set_time_zone #, if: :user_signed_in?

  def daily_log
    @today = DateTime.now
    @todays_am_routines = Task.where(user: current_user, routine: :morning, start_date: @today.beginning_of_day..@today.end_of_day)
    @todays_tasks_and_day_routines = Task.where(user: current_user, routine: [:not_recuring, :day], start_date: @today.beginning_of_day..@today.end_of_day)
    @todays_pm_routines = Task.where(user: current_user, routine: :evening, start_date: @today.beginning_of_day..@today.end_of_day)
  end

  def weekly_log
    @today = Time.now
    @the_weeks_tasks = Task.where(
      user: current_user,
      routine: :not_recuring,
      start_date: @today.beginning_of_month.beginning_of_week..@today.end_of_month.end_of_week,
    )
  end

  def monthly_log
  end

  def future_log
  end

  private

  def set_time_zone
    # Time.zone = current_user.time_zone
  end
end
